import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LogIn, Sparkles, AlertCircle } from '../components/Icons';

export const LoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      showToast('Logged in successfully! Welcome back.', 'success');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
      showToast(err.message || 'Login failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('demo@example.com');
    setPassword('password123');
    setError(null);
  };

  return (
    <div className="container">
      <div className="form-card">
        <div className="form-header">
          <div
            style={{
              display: 'inline-flex',
              padding: '0.75rem',
              background: 'var(--primary-light)',
              borderRadius: '50%',
              marginBottom: '1rem',
              color: 'var(--primary)',
            }}
          >
            <LogIn size={28} />
          </div>
          <h1>Welcome Back</h1>
          <p>Log in to access your cart, place orders, and track deliveries.</p>
        </div>

        {/* Demo Credentials Box */}
        <div className="demo-credentials-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <strong style={{ color: 'var(--primary)' }}>Quick Demo Credentials:</strong>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="btn btn-sm btn-outline"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
            >
              <Sparkles size={12} /> Auto-fill
            </button>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            Email: <code>demo@example.com</code><br />
            Password: <code>password123</code>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: 'var(--danger-bg)',
              color: 'var(--danger)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@example.com"
              required
              className="form-input"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="form-input"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '0.75rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
