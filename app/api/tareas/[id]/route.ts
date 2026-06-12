import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tarea from '@/models/Tarea';
import { verifyAuth } from '@/lib/auth';

// GET - Obtener una tarea específica
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const auth = verifyAuth(request);
    if (!auth) {
      return NextResponse.json(
        { mensaje: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const tarea = await Tarea.findById(id).populate('asignadoA', 'nombre email');

    if (!tarea) {
      return NextResponse.json(
        { mensaje: 'Tarea no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(tarea, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo tarea:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar tarea
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const auth = verifyAuth(request);
    if (!auth) {
      return NextResponse.json(
        { mensaje: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { titulo, descripcion, asignadoA, prioridad, estado, fechaLimite } = await request.json();

    const tarea = await Tarea.findByIdAndUpdate(
      id,
      {
        titulo,
        descripcion,
        asignadoA,
        prioridad,
        estado,
        fechaLimite,
        fechaActualizacion: new Date()
      },
      { new: true }
    ).populate('asignadoA', 'nombre email');

    if (!tarea) {
      return NextResponse.json(
        { mensaje: 'Tarea no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(tarea, { status: 200 });
  } catch (error) {
    console.error('Error actualizando tarea:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar tarea
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const auth = verifyAuth(request);
    if (!auth) {
      return NextResponse.json(
        { mensaje: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const tarea = await Tarea.findByIdAndDelete(id);

    if (!tarea) {
      return NextResponse.json(
        { mensaje: 'Tarea no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { mensaje: 'Tarea eliminada exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error eliminando tarea:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
