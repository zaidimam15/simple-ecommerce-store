import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../api/client';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ChevronLeft,
  Star,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  Minus,
  Plus,
  AlertTriangle,
} from '../components/Icons';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await productAPI.getProductById(id);
        if (res.success && res.product) {
          setProduct(res.product);
          setQuantity(1);
        } else {
          throw new Error(res.message || 'Product not found');
        }
      } catch (err) {
        console.error('Fetch product detail error:', err);
        setError(err.message || 'Unable to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner text="Loading product details from MongoDB..." />;
  }

  if (error || !product) {
    return (
      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="empty-state">
          <AlertTriangle className="empty-icon" style={{ color: 'var(--danger)' }} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Product Unavailable
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {error || "The product you requested does not exist or may have been removed."}
          </p>
          <Link to="/" className="btn btn-primary">
            <ChevronLeft size={16} /> Back to Products Catalog
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  const handleDecreaseQty = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQty = () => {
    setQuantity((prev) => Math.min(product.stock, prev + 1));
  };

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  return (
    <div className="container" style={{ marginTop: '1.5rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          <ChevronLeft size={16} /> Back to all products
        </Link>
      </div>

      <div className="product-detail-layout">
        {/* Left: Product Image */}
        <div className="detail-gallery">
          <img
            src={product.image}
            alt={product.name}
            className="detail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="detail-info">
          <span className="product-category" style={{ fontSize: '0.85rem' }}>
            {product.category}
          </span>
          <h1 className="detail-title">{product.name}</h1>

          {/* Rating */}
          <div className="product-rating" style={{ marginBottom: '1.25rem' }}>
            <div className="stars">
              <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
            </div>
            <span style={{ fontWeight: 700 }}>
              {product.rating ? product.rating.toFixed(1) : '4.5'}
            </span>
            <span>({product.numReviews || 0} customer reviews)</span>
            <span style={{ color: 'var(--border-color)' }}>•</span>
            <span
              style={{
                color: isOutOfStock
                  ? 'var(--danger)'
                  : product.stock < 5
                  ? 'var(--warning)'
                  : 'var(--success)',
                fontWeight: 700,
              }}
            >
              {isOutOfStock
                ? 'Out of Stock'
                : product.stock < 5
                ? `Only ${product.stock} items remaining!`
                : `${product.stock} available in stock`}
            </span>
          </div>

          {/* Price */}
          <div className="detail-price-row">
            <span className="detail-price">${Number(product.price).toFixed(2)}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Taxes calculated at checkout
            </span>
          </div>

          {/* Description */}
          <p className="detail-description">{product.description}</p>

          {/* Quantity and Actions */}
          {!isOutOfStock ? (
            <div className="detail-actions">
              <div className="qty-counter">
                <button
                  type="button"
                  onClick={handleDecreaseQty}
                  disabled={quantity <= 1}
                  className="qty-btn"
                  title="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  type="button"
                  onClick={handleIncreaseQty}
                  disabled={quantity >= product.stock}
                  className="qty-btn"
                  title="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-lg btn-primary"
                style={{ flex: 1 }}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="btn btn-lg btn-secondary"
                style={{
                  background: 'var(--text-main)',
                  color: 'white',
                  borderColor: 'var(--text-main)',
                }}
              >
                <Zap size={18} /> Buy Now
              </button>
            </div>
          ) : (
            <div
              style={{
                padding: '1rem',
                background: 'var(--danger-bg)',
                color: 'var(--danger)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem',
                fontWeight: 600,
              }}
            >
              Currently sold out. Check back soon for restocks!
            </div>
          )}

          {/* Feature Highlights */}
          <div className="detail-perks">
            <div className="perk-item">
              <Truck size={18} className="perk-icon" />
              <span>Free delivery on orders over $50</span>
            </div>
            <div className="perk-item">
              <ShieldCheck size={18} className="perk-icon" />
              <span>1-Year official brand warranty</span>
            </div>
            <div className="perk-item">
              <RefreshCw size={18} className="perk-icon" />
              <span>30-Day hassle-free return window</span>
            </div>
            <div className="perk-item">
              <Zap size={18} className="perk-icon" />
              <span>Fast same-day dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
