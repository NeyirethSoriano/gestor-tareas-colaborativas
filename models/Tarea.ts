import mongoose, { Schema, Document } from 'mongoose';

export interface Tarea extends Document {
  titulo: string;
  descripcion: string;
  proyecto: mongoose.Types.ObjectId;
  asignadoA: mongoose.Types.ObjectId;
  prioridad: 'baja' | 'media' | 'alta';
  estado: 'pendiente' | 'en-progreso' | 'completada';
  fechaLimite: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const TareaSchema = new Schema<Tarea>({
  titulo: { type: String, required: true },
  descripcion: { type: String, default: '' },
  proyecto: { type: Schema.Types.ObjectId, ref: 'Proyecto', required: true },
  asignadoA: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  prioridad: { type: String, enum: ['baja', 'media', 'alta'], default: 'media' },
  estado: { type: String, enum: ['pendiente', 'en-progreso', 'completada'], default: 'pendiente' },
  fechaLimite: { type: Date },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
});

export default mongoose.models.Tarea || mongoose.model('Tarea', TareaSchema);
