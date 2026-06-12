import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Usuario from '@/models/Usuario';
import { hashPassword } from '@/lib/password';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password, nombre } = await request.json();

    if (!email || !password || !nombre) {
      return NextResponse.json(
        { mensaje: 'Email, contraseña y nombre son requeridos' },
        { status: 400 }
      );
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return NextResponse.json(
        { mensaje: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword
    });

    await nuevoUsuario.save();

    const token = generateToken(nuevoUsuario._id.toString());

    return NextResponse.json(
      {
        mensaje: 'Usuario registrado exitosamente',
        usuario: {
          id: nuevoUsuario._id,
          nombre: nuevoUsuario.nombre,
          email: nuevoUsuario.email,
          rol: nuevoUsuario.rol
        },
        token
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
