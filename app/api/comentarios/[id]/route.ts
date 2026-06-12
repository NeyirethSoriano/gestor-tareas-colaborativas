import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comentario from '@/models/Comentario';
import { verifyAuth } from '@/lib/auth';

// DELETE - Eliminar comentario
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
    const comentario = await Comentario.findByIdAndDelete(id);

    if (!comentario) {
      return NextResponse.json(
        { mensaje: 'Comentario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { mensaje: 'Comentario eliminado exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error eliminando comentario:', error);
    return NextResponse.json(
      { mensaje: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
