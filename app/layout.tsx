import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gestor de Tareas Colaborativas',
  description: 'Aplicación web para gestión de proyectos y tareas colaborativas'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
