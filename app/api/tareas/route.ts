import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tarea from '@/models/Tarea';
import { verifyAuth } from '@/lib/auth';

// GET - Obtener todas las tareas de un proyecto
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
    const proyectoId = searchParams.get('proyectoId');

    if (!proyectoId) {
      return NextResponse.json(
        { mensaje: 'proyectoId es requerido' },
        { status: 400 }
      );
    }

    const tareas = await Tarea.find({ proyecto: proyectoId })
      .populate('asignadoA', 'nombre email')
      .sort({ fechaCreacion: -1 });

    return NextResponse.json(tareas, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo tareas:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva tarea
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

    const { titulo, descripcion, proyecto, asignadoA, prioridad, fechaLimite } = await request.json();

    if (!titulo || !proyecto) {
      return NextResponse.json(
        { mensaje: 'El título y proyecto son requeridos' },
        { status: 400 }
      );
    }

    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      proyecto,
      asignadoA,
      prioridad,
      fechaLimite
    });

    await nuevaTarea.save();
    await nuevaTarea.populate('asignadoA', 'nombre email');

    return NextResponse.json(nuevaTarea, { status: 201 });
  } catch (error) {
    console.error('Error creando tarea:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
