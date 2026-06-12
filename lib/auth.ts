import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const SECRET = process.env.JWT_SECRET || 'secret_key';

export function generateToken(usuarioId: string) {
  return jwt.sign({ usuarioId }, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET) as { usuarioId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  
  const token = authHeader.replace('Bearer ', '');
  return token;
}

export function verifyAuth(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return null;
  }
  
  const decoded = verifyToken(token);
  return decoded;
}
