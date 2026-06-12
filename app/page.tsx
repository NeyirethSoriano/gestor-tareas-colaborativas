'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestor de Tareas Colaborativas</h1>
      <p>Aplicación web para gestión de proyectos y tareas en equipos de trabajo</p>

      {token ? (
        <div>
          <h2>Bienvenido</h2>
          <p>
            <Link href="/dashboard">Ir al Dashboard</Link>
          </p>
        </div>
      ) : (
        <div>
          <h2>Acceso</h2>
          <p>
            <Link href="/login">Iniciar Sesión</Link> | <Link href="/register">Registrarse</Link>
          </p>
        </div>
      )}

      <section style={{ marginTop: '40px' }}>
        <h2>Características Principales</h2>
        <ul>
          <li>✓ Gestión de Proyectos</li>
          <li>✓ Administración de Tareas</li>
          <li>✓ Asignación de Usuarios</li>
          <li>✓ Prioridades y Estados</li>
          <li>✓ Comentarios en Tareas</li>
          <li>✓ Dashboard con Estadísticas</li>
        </ul>
      </section>
    </main>
  );
}
