import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Eye, Heart } from './Icons';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
            }}
            loading="lazy"
          />
        </Link>

        {/* Stock Badge */}
        <span
          className={`badge-stock ${
            isOutOfStock
              ? 'badge-out-of-stock'
              : isLowStock
              ? 'badge-low-stock'
              : 'badge-in-stock'
          }`}
        >
          {isOutOfStock ? 'Sold Out' : isLowStock ? `Only ${product.stock} left` : 'In Stock'}
        </span>

        {/* Wishlist Button Overlay */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`card-wishlist-btn ${inWishlist ? 'active' : ''}`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart
            size={16}
            fill={inWishlist ? '#ef4444' : 'none'}
            color={inWishlist ? '#ef4444' : 'currentColor'}
          />
        </button>

        {/* Quick View Button Overlay */}
        {onQuickView && (
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="card-quickview-btn"
            title="Quick View Details"
            aria-label="Quick View"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
        )}
      </div>

      <div className="product-info">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span className="product-category">{product.category}</span>
          <div className="product-rating-compact">
            <Star size={13} fill="#f59e0b" stroke="#f59e0b" />
            <span>{product.rating ? product.rating.toFixed(1) : '4.5'}</span>
          </div>
        </div>

        <Link to={`/product/${product._id}`} className="product-title-link">
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        <div className="product-footer">
          <div className="product-price-col">
            <span className="product-price-label">Price</span>
            <span className="product-price">${Number(product.price).toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <Link
              to={`/product/${product._id}`}
              className="btn btn-sm btn-secondary"
              title="View Product Page"
              aria-label="View Details"
            >
              <Eye size={15} />
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn btn-sm btn-primary"
              title={isOutOfStock ? 'Out of Stock' : 'Add to Shopping Cart'}
              aria-label="Add to Cart"
            >
              <ShoppingBag size={15} />
              <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
