import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Proyecto from '@/models/Proyecto';
import { verifyAuth } from '@/lib/auth';

// GET - Obtener todos los proyectos del usuario
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const auth = verifyAuth(request);
    if (!auth) {
      return NextResponse.json(
        { mensaje: 'No autorizado' },
        { status: 401 }
      );
    }

    const proyectos = await Proyecto.find({
      $or: [
        { propietario: auth.usuarioId },
        { miembros: auth.usuarioId }
      ]
    }).populate('propietario', 'nombre email');

    return NextResponse.json(proyectos, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo proyecto
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const auth = verifyAuth(request);
    if (!auth) {
      return NextResponse.json(
        { mensaje: 'No autorizado' },
        { status: 401 }
      );
    }

    const { nombre, descripcion } = await request.json();

    if (!nombre) {
      return NextResponse.json(
        { mensaje: 'El nombre del proyecto es requerido' },
        { status: 400 }
      );
    }

    const nuevoProyecto = new Proyecto({
      nombre,
      descripcion,
      propietario: auth.usuarioId,
      miembros: [auth.usuarioId]
    });

    await nuevoProyecto.save();
    await nuevoProyecto.populate('propietario', 'nombre email');

    return NextResponse.json(nuevoProyecto, { status: 201 });
  } catch (error) {
    console.error('Error creando proyecto:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
