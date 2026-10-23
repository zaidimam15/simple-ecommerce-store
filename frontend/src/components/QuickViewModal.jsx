import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Eye,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RefreshCw,
} from './Icons';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Product Image */}
          <div className="quickview-image-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="quickview-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
              }}
            />
            <span
              className={`badge-stock ${
                isOutOfStock
                  ? 'badge-out-of-stock'
                  : isLowStock
                  ? 'badge-low-stock'
                  : 'badge-in-stock'
              }`}
            >
              {isOutOfStock
                ? 'Out of Stock'
                : isLowStock
                ? `Only ${product.stock} left`
                : 'In Stock'}
            </span>
          </div>

          {/* Product Info */}
          <div className="quickview-info">
            <div className="quickview-header">
              <span className="product-category">{product.category}</span>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`quickview-wishlist-btn ${inWishlist ? 'active' : ''}`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Toggle Wishlist"
              >
                <Heart size={18} fill={inWishlist ? '#ef4444' : 'none'} color={inWishlist ? '#ef4444' : 'currentColor'} />
              </button>
            </div>

            <h2 className="quickview-title">{product.name}</h2>

            <div className="product-rating" style={{ marginBottom: '1rem' }}>
              <div className="stars">
                <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
              </div>
              <span style={{ fontWeight: 700 }}>
                {product.rating ? product.rating.toFixed(1) : '4.5'}
              </span>
              <span>({product.numReviews || 0} reviews)</span>
            </div>

            <div className="quickview-price-row">
              <span className="quickview-price">${Number(product.price).toFixed(2)}</span>
              <span className="quickview-stock-text">
                {isOutOfStock
                  ? 'Currently Unavailable'
                  : `${product.stock} units available in warehouse`}
              </span>
            </div>

            <p className="quickview-description">{product.description}</p>

            {/* Actions */}
            {!isOutOfStock ? (
              <div className="quickview-actions">
                <div className="qty-counter">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="qty-btn"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-number">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <ShoppingBag size={17} /> Add to Cart
                </button>
              </div>
            ) : (
              <div className="out-of-stock-alert">
                Item currently sold out. Restocks arriving shortly.
              </div>
            )}

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link
                to={`/product/${product._id}`}
                onClick={onClose}
                className="btn btn-sm btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Eye size={15} /> View Full Product Details
              </Link>
            </div>

            {/* Trust Mini Strip */}
            <div className="quickview-perks">
              <div className="perk-mini">
                <Truck size={14} /> Free delivery over $50
              </div>
              <div className="perk-mini">
                <ShieldCheck size={14} /> Verified Guarantee
              </div>
              <div className="perk-mini">
                <RefreshCw size={14} /> 30-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
