import mongoose, { Schema, Document } from 'mongoose';

export interface Proyecto extends Document {
  nombre: string;
  descripcion: string;
  propietario: mongoose.Types.ObjectId;
  miembros: mongoose.Types.ObjectId[];
  estado: 'activo' | 'pausado' | 'completado';
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const ProyectoSchema = new Schema<Proyecto>({
  nombre: { type: String, required: true },
  descripcion: { type: String, default: '' },
  propietario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  miembros: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
  estado: { type: String, enum: ['activo', 'pausado', 'completado'], default: 'activo' },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
});

export default mongoose.models.Proyecto || mongoose.model('Proyecto', ProyectoSchema);
