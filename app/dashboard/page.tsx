'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Proyecto {
  _id: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

export default function DashboardPage() {
  const [usuario, setUsuario] = useState<any>(null);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [descripcionProyecto, setDescripcionProyecto] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioData = localStorage.getItem('usuario');

    if (!token || !usuarioData) {
      router.push('/login');
      return;
    }

    setUsuario(JSON.parse(usuarioData));
    cargarProyectos(token);
  }, [router]);

  const cargarProyectos = async (token: string) => {
    try {
      const response = await fetch('/api/proyectos', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setProyectos(data);
      }
    } catch (error) {
      console.error('Error cargando proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearProyecto = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: nombreProyecto,
          descripcion: descripcionProyecto
        })
      });

      if (response.ok) {
        setNombreProyecto('');
        setDescripcionProyecto('');
        cargarProyectos(token!);
      }
    } catch (error) {
      console.error('Error creando proyecto:', error);
    }
  };

  const handleEliminarProyecto = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/proyectos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        cargarProyectos(token!);
      }
    } catch (error) {
      console.error('Error eliminando proyecto:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    router.push('/');
  };

  if (!usuario) return <div>Cargando...</div>;

  return (
    <main style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Dashboard - Bienvenido, {usuario.nombre}</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
          Cerrar Sesión
        </button>
      </header>

      <section style={{ marginBottom: '40px' }}>
        <h2>Crear Nuevo Proyecto</h2>
        <form onSubmit={handleCrearProyecto} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
            required
            style={{ padding: '8px', marginBottom: '10px' }}
          />
          <textarea
            placeholder="Descripción del proyecto"
            value={descripcionProyecto}
            onChange={(e) => setDescripcionProyecto(e.target.value)}
            style={{ padding: '8px', marginBottom: '10px', minHeight: '100px' }}
          />
          <button type="submit">Crear Proyecto</button>
        </form>
      </section>

      <section>
        <h2>Mis Proyectos</h2>
        {loading ? (
          <p>Cargando proyectos...</p>
        ) : proyectos.length === 0 ? (
          <p>No hay proyectos. Crea uno para comenzar.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {proyectos.map((proyecto) => (
              <div key={proyecto._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <h3>{proyecto.nombre}</h3>
                <p>{proyecto.descripcion}</p>
                <p>
                  <strong>Estado:</strong> {proyecto.estado}
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <Link href={`/proyectos/${proyecto._id}`}>
                    <button>Ver Tareas</button>
                  </Link>
                  <button onClick={() => handleEliminarProyecto(proyecto._id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
