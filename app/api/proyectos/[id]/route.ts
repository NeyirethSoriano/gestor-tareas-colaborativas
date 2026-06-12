import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Proyecto from '@/models/Proyecto';
import { verifyAuth } from '@/lib/auth';

// GET - Obtener un proyecto específico
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
    const proyecto = await Proyecto.findById(id).populate('propietario miembros', 'nombre email');

    if (!proyecto) {
      return NextResponse.json(
        { mensaje: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(proyecto, { status: 200 });
  } catch (error) {
    console.error('Error obteniendo proyecto:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar proyecto
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
    const { nombre, descripcion, estado } = await request.json();

    const proyecto = await Proyecto.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcion,
        estado,
        fechaActualizacion: new Date()
      },
      { new: true }
    );

    if (!proyecto) {
      return NextResponse.json(
        { mensaje: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(proyecto, { status: 200 });
  } catch (error) {
    console.error('Error actualizando proyecto:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar proyecto
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
    const proyecto = await Proyecto.findByIdAndDelete(id);

    if (!proyecto) {
      return NextResponse.json(
        { mensaje: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { mensaje: 'Proyecto eliminado exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error eliminando proyecto:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
