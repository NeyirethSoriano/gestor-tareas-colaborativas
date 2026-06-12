import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comentario from '@/models/Comentario';
import { verifyAuth } from '@/lib/auth';

// GET - Obtener comentarios de una tarea
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

    const { searchParams } = new URL(request.url);
    const tareaId = searchParams.get('tareaId');

    if (!tareaId) {
      return NextResponse.json(
        { mensaje: 'tareaId es requerido' },
        { status: 400 }
      );
    }

    const comentarios = await Comentario.find({ tarea: tareaId })
      .populate('autor', 'nombre email')
      .sort({ fechaCreacion: -1 });

    return NextResponse.json(comentarios, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo comentarios:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo comentario
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

    const { contenido, tarea } = await request.json();

    if (!contenido || !tarea) {
      return NextResponse.json(
        { mensaje: 'El contenido y la tarea son requeridos' },
        { status: 400 }
      );
    }

    const nuevoComentario = new Comentario({
      contenido,
      tarea,
      autor: auth.usuarioId
    });

    await nuevoComentario.save();
    await nuevoComentario.populate('autor', 'nombre email');

    return NextResponse.json(nuevoComentario, { status: 201 });
  } catch (error) {
    console.error('Error creando comentario:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
