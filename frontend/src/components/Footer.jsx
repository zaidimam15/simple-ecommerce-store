import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Sparkles } from './Icons';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} color="#6366f1" />
              <span>CodeAlpha Store</span>
            </div>
            <p style={{ maxWidth: '380px', lineHeight: '1.6', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              A full-stack, enterprise-grade e-commerce application built with MongoDB, Express.js, React, and Node.js for the CodeAlpha Full Stack Development Internship.
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Truck size={16} color="#818cf8" /> Free Shipping $50+
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={16} color="#818cf8" /> Secure JWT Auth
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <RefreshCw size={16} color="#818cf8" /> 30-Day Returns
              </span>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/" style={{ color: '#94a3b8' }}>Products Catalog</Link>
              </li>
              <li>
                <Link to="/cart" style={{ color: '#94a3b8' }}>Shopping Cart</Link>
              </li>
              <li>
                <Link to="/orders" style={{ color: '#94a3b8' }}>My Placed Orders</Link>
              </li>
              <li>
                <Link to="/login" style={{ color: '#94a3b8' }}>Account Login</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
              Internship Tech Stack
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: '#94a3b8' }}>
              <li>Frontend: React 18, Vite, React Router</li>
              <li>Backend: Node.js, Express REST API</li>
              <li>Database: MongoDB & Mongoose</li>
              <li>Auth: JWT Token & bcrypt Security</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CodeAlpha Full Stack Development Internship. All rights reserved.</p>
          <p>Built with ❤️ by CodeAlpha Intern</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
