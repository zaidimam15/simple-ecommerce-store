import React from 'react';

export const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div style={{ padding: '2.75rem 1rem', textAlign: 'center' }}>
      <div className="spinner"></div>
      <p style={{ marginTop: '0.85rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
