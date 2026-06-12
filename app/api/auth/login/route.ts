import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Usuario from '@/models/Usuario';
import { comparePasswords } from '@/lib/password';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { mensaje: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return NextResponse.json(
        { mensaje: 'Email o contraseña inválidos' },
        { status: 401 }
      );
    }

    const passwordValido = await comparePasswords(password, usuario.password);
    if (!passwordValido) {
      return NextResponse.json(
        { mensaje: 'Email o contraseña inválidos' },
        { status: 401 }
      );
    }

    const token = generateToken(usuario._id.toString());

    return NextResponse.json(
      {
        mensaje: 'Login exitoso',
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        },
        token
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
