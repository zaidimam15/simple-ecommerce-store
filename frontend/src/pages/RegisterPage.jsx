import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserPlus, AlertCircle } from '../components/Icons';

export const RegisterPage = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Frontend validation
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please recheck.');
      return;
    }

    try {
      setLoading(true);
      await register(name.trim(), email.trim(), password);
      showToast('Account created successfully! Welcome to CodeAlpha Store.', 'success');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed.');
      showToast(err.message || 'Registration failed.', 'error');
    } finally {
      setLoading(false);
    }
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
            <UserPlus size={28} />
          </div>
          <h1>Create an Account</h1>
          <p>Join CodeAlpha Store to purchase products, save your orders, and manage checkout.</p>
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
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              required
              className="form-input"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alex@example.com"
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
              placeholder="At least 6 characters"
              required
              className="form-input"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              required
              className="form-input"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '0.75rem' }}
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
