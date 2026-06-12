import mongoose, { Schema, Document } from 'mongoose';

export interface Comentario extends Document {
  contenido: string;
  tarea: mongoose.Types.ObjectId;
  autor: mongoose.Types.ObjectId;
  fechaCreacion: Date;
}

const ComentarioSchema = new Schema<Comentario>({
  contenido: { type: String, required: true },
  tarea: { type: Schema.Types.ObjectId, ref: 'Tarea', required: true },
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.models.Comentario || mongoose.model('Comentario', ComentarioSchema);
