import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from '../components/Icons';

export const NotFoundPage = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '4.5rem 1rem' }}>
      <div style={{ fontSize: '3.75rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
        404
      </div>
      <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.85rem', marginBottom: '0.4rem' }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.6rem', fontSize: '0.925rem' }}>
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        <Home size={18} /> Return to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
