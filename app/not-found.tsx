import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 - Página no encontrada</h2>
      <p>La página que buscas no existe.</p>
      <Link href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
        Volver al inicio
      </Link>
    </div>
  );
}
