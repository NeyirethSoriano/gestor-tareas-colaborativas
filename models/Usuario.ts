import mongoose, { Schema, Document } from 'mongoose';

export interface Usuario extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: 'usuario' | 'admin';
  fechaRegistro: Date;
  activo: boolean;
}

const UsuarioSchema = new Schema<Usuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' },
  fechaRegistro: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true }
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);
