import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
} from '../components/Icons';

export const CartPage = () => {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    totalItemCount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="empty-state">
          <ShoppingBag className="empty-icon" />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '450px', margin: '0 auto 1.5rem' }}>
            Looks like you haven't added anything to your cart yet. Explore our catalog of products and discover great deals.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
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
          <ChevronLeft size={16} /> Continue Shopping
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Shopping Cart ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={clearCart}
          className="btn btn-sm btn-secondary"
          style={{ color: 'var(--danger)' }}
        >
          Clear All
        </button>
      </div>

      <div className="cart-layout">
        {/* Left: Cart Items List */}
        <div className="cart-items-card">
          <div className="cart-header">
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              PRODUCT DETAILS
            </span>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              SUBTOTAL
            </span>
          </div>

          <div>
            {cartItems.map((item) => {
              const lineTotal = (item.price * item.quantity).toFixed(2);
              const isMaxStock = item.quantity >= item.stock;

              return (
                <div key={item.product} className="cart-item-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-thumb"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
                    }}
                  />

                  <div className="cart-item-info">
                    <Link to={`/product/${item.product}`}>
                      <h4 className="cart-item-title">{item.name}</h4>
                    </Link>
                    <p className="cart-item-price">
                      ${Number(item.price).toFixed(2)} each
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
                      {/* Quantity Controls */}
                      <div className="qty-counter">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product, item.quantity - 1)}
                          className="qty-btn"
                          title="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product, item.quantity + 1)}
                          disabled={isMaxStock}
                          className="qty-btn"
                          title={isMaxStock ? 'Max stock reached' : 'Increase quantity'}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product)}
                        className="btn btn-sm btn-danger"
                        title="Remove product"
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>

                      {isMaxStock && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: 600 }}>
                          (Max stock {item.stock})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="cart-item-total">
                    ${lineTotal}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div>
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Items Subtotal</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                ${itemsPrice.toFixed(2)}
              </span>
            </div>

            <div className="summary-row">
              <span>Estimated Shipping</span>
              <span>
                {shippingPrice === 0 ? (
                  <strong style={{ color: 'var(--success)' }}>FREE</strong>
                ) : (
                  `$${shippingPrice.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Estimated Tax (5%)</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                ${taxPrice.toFixed(2)}
              </span>
            </div>

            {shippingPrice > 0 && (
              <div
                style={{
                  background: 'var(--primary-light)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  fontWeight: 600,
                }}
              >
                Add ${(50 - itemsPrice).toFixed(2)} more for FREE shipping!
              </div>
            )}

            <div className="summary-total">
              <span>Order Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--success)" />
              <span>Safe & Secure Mock Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
