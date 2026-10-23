import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, LogOut, Package, Search, Sparkles, Heart } from './Icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import WishlistDrawer from './WishlistDrawer';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand">
            <div className="brand-logo-wrap">
              <span className="brand-icon">
                <Sparkles size={20} />
              </span>
              <span className="brand-text">ATELIER</span>
              <span className="brand-badge">EDITION</span>
            </div>
          </Link>

          {/* Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="nav-search">
            <Search size={18} className="nav-search-icon" />
            <input
              type="text"
              placeholder="Search 120+ curated goods (press Enter)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </form>

          {/* Nav Actions */}
          <div className="nav-actions">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Catalogue
            </Link>

            {isAuthenticated && (
              <Link
                to="/orders"
                className={`nav-link ${location.pathname === '/orders' ? 'active' : ''}`}
              >
                <Package size={17} />
                <span>Orders</span>
              </Link>
            )}

            {/* Wishlist Trigger */}
            <button
              type="button"
              onClick={() => setIsWishlistOpen(true)}
              className="nav-icon-btn"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={20} fill={wishlistCount > 0 ? 'var(--accent)' : 'none'} color={wishlistCount > 0 ? 'var(--accent)' : 'currentColor'} />
              {wishlistCount > 0 && <span className="nav-badge-count">{wishlistCount}</span>}
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="cart-button" title="View Shopping Cart" aria-label="Cart">
              <ShoppingCart size={20} />
              {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
            </Link>

            {/* Authentication State */}
            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-avatar" title={user.name}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.1 }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="logout-link"
                    title="Logout"
                  >
                    <LogOut size={12} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-sm btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-sm btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Persistent Wishlist Drawer */}
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
};

export default Navbar;
