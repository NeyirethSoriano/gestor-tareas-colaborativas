'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Tarea {
  _id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fechaLimite?: string;
}

export default function ProyectoPage() {
  const params = useParams();
  const router = useRouter();
  const proyectoId = params.id as string;

  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    cargarTareas(token);
  }, [router, proyectoId]);

  const cargarTareas = async (token: string) => {
    try {
      const response = await fetch(`/api/tareas?proyectoId=${proyectoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setTareas(data);
      }
    } catch (error) {
      console.error('Error cargando tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearTarea = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          proyecto: proyectoId,
          prioridad
        })
      });

      if (response.ok) {
        setTitulo('');
        setDescripcion('');
        setPrioridad('media');
        cargarTareas(token!);
      }
    } catch (error) {
      console.error('Error creando tarea:', error);
    }
  };

  const handleEliminarTarea = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/tareas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        cargarTareas(token!);
      }
    } catch (error) {
      console.error('Error eliminando tarea:', error);
    }
  };

  return (
    <main style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px' }}>
        <Link href="/dashboard">← Volver al Dashboard</Link>
        <h1>Tareas del Proyecto</h1>
      </header>

      <section style={{ marginBottom: '40px' }}>
        <h2>Crear Nueva Tarea</h2>
        <form onSubmit={handleCrearTarea} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{ padding: '8px', marginBottom: '10px' }}
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{ padding: '8px', marginBottom: '10px', minHeight: '100px' }}
          />
          <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} style={{ padding: '8px', marginBottom: '10px' }}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
          <button type="submit">Crear Tarea</button>
        </form>
      </section>

      <section>
        <h2>Mis Tareas</h2>
        {loading ? (
          <p>Cargando tareas...</p>
        ) : tareas.length === 0 ? (
          <p>No hay tareas. Crea una para comenzar.</p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {tareas.map((tarea) => (
              <div key={tarea._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <h3>{tarea.titulo}</h3>
                <p>{tarea.descripcion}</p>
                <p>
                  <strong>Prioridad:</strong> {tarea.prioridad} | <strong>Estado:</strong> {tarea.estado}
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => handleEliminarTarea(tarea._id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
