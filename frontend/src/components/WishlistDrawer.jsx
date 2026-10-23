import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from './Icons';

export const WishlistDrawer = ({ isOpen, onClose }) => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleMoveToCart = (item) => {
    if (item.stock > 0) {
      addToCart(item, 1);
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Heart size={20} fill="#ef4444" color="#ef4444" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Your Wishlist ({wishlistItems.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="drawer-close-btn"
            aria-label="Close Wishlist"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {wishlistItems.length === 0 ? (
            <div className="drawer-empty">
              <Heart size={44} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.4 }} />
              <h4>Your Wishlist is Empty</h4>
              <p>Explore our catalogue and click the heart icon on products you love.</p>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-primary btn-sm"
                style={{ marginTop: '1rem' }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="wishlist-list">
              {wishlistItems.map((item) => {
                const isOutOfStock = item.stock <= 0;
                return (
                  <div key={item._id} className="wishlist-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="wishlist-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
                      }}
                    />

                    <div className="wishlist-info">
                      <span className="product-category" style={{ fontSize: '0.7rem' }}>
                        {item.category}
                      </span>
                      <Link
                        to={`/product/${item._id}`}
                        onClick={onClose}
                        className="wishlist-title"
                        title={item.name}
                      >
                        {item.name}
                      </Link>
                      <div className="wishlist-price-row">
                        <span className="wishlist-price">${Number(item.price).toFixed(2)}</span>
                        <span
                          className={`badge-stock ${
                            isOutOfStock ? 'badge-out-of-stock' : 'badge-in-stock'
                          }`}
                          style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}
                        >
                          {isOutOfStock ? 'Out of stock' : 'In stock'}
                        </span>
                      </div>

                      <div className="wishlist-actions">
                        <button
                          type="button"
                          onClick={() => handleMoveToCart(item)}
                          disabled={isOutOfStock}
                          className="btn btn-sm btn-primary"
                          style={{ flex: 1, padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                        >
                          <ShoppingBag size={14} />
                          <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item._id)}
                          className="btn btn-sm btn-secondary"
                          style={{ padding: '0.35rem 0.5rem', color: 'var(--danger)' }}
                          title="Remove from Wishlist"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="drawer-footer">
            <button
              type="button"
              onClick={clearWishlist}
              className="btn btn-sm btn-secondary"
              style={{ width: '100%', color: 'var(--danger)' }}
            >
              Clear Entire Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
