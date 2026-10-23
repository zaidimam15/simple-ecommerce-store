import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { orderAPI } from '../api/client';
import {
  ChevronLeft,
  Truck,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Lock,
  RefreshCw,
  Zap,
} from '../components/Icons';

export const CheckoutPage = () => {
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'Cash on Delivery',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="empty-state">
          <AlertCircle className="empty-icon" style={{ color: 'var(--warning)' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Please select items from the catalogue before checking out.
          </p>
          <Link to="/" className="btn btn-primary">
            Explore Curated Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fillDemoAddress = () => {
    setFormData((prev) => ({
      ...prev,
      fullName: user?.name || 'Eleanor Vance',
      phone: '+1 (555) 019-2834',
      address: '742 Evergreen Terrace, Suite 4B',
      city: 'Springfield',
      postalCode: '97477',
      country: 'United States',
    }));
    setError(null);
  };

  const validateShipping = () => {
    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.postalCode.trim() ||
      !formData.country.trim()
    ) {
      const msg = 'Please fill in all mandatory shipping address fields marked with *.';
      setError(msg);
      showToast(msg, 'error');
      return false;
    }
    return true;
  };

  const handleCashOnDelivery = async () => {
    const orderPayload = {
      orderItems: cartItems.map((item) => ({
        product: item.product,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      shippingAddress: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        postalCode: formData.postalCode.trim(),
        country: formData.country.trim(),
      },
      paymentMethod: 'Cash on Delivery',
    };

    const res = await orderAPI.createOrder(orderPayload);

    if (res.success && res.order) {
      showToast('Order confirmed with Cash on Delivery!', 'success');
      clearCart();
      navigate(`/order-success/${res.order._id}`, { state: { order: res.order } });
    } else {
      throw new Error(res.message || 'Failed to place order.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateShipping()) return;

    try {
      setSubmitting(true);
      await handleCashOnDelivery();
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Unable to process checkout. Please try again.');
      showToast(err.message || 'Checkout failed.', 'error');
      setSubmitting(false);
    }
  };

  return (
    <div className="container checkout-page-container">
      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/cart"
          className="back-link"
        >
          <ChevronLeft size={16} /> Return to Shopping Bag
        </Link>
      </div>

      <div className="checkout-header">
        <h1 className="checkout-title">Checkout & Payment</h1>
        <p className="checkout-subtitle">
          Review your items, enter shipping credentials, and confirm your Cash on Delivery order.
        </p>
      </div>

      {error && (
        <div className="checkout-alert-error">
          <AlertCircle size={20} />
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="checkout-grid">
          {/* Left Column: Form Details */}
          <div className="checkout-form-col">
            {/* 1. Shipping Address Section */}
            <div className="checkout-card">
              <div className="checkout-card-header">
                <div className="step-badge">1</div>
                <div>
                  <h3 className="card-section-title">Shipping Address</h3>
                  <p className="card-section-desc">Where should we deliver your curated parcel?</p>
                </div>
                <button
                  type="button"
                  onClick={fillDemoAddress}
                  className="btn-demo-fill"
                  title="Auto-fill with sample address for quick evaluation"
                >
                  <Zap size={13} />
                  <span>Fill Demo Address</span>
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group span-2">
                  <label htmlFor="fullName" className="form-label">
                    Recipient Full Name <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group span-2">
                  <label htmlFor="phone" className="form-label">
                    Mobile Phone Number <span className="req-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="form-input"
                    required
                  />
                  <span className="field-hint">Required for courier delivery updates and dispatch call.</span>
                </div>

                <div className="form-group span-2">
                  <label htmlFor="address" className="form-label">
                    Street Address & Apartment / Suite <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 742 Evergreen Terrace, Suite 4B"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    City <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Springfield"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode" className="form-label">
                    Postal / ZIP Code <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="e.g. 97477"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group span-2">
                  <label htmlFor="country" className="form-label">
                    Country <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selection */}
            <div className="checkout-card">
              <div className="checkout-card-header">
                <div className="step-badge">2</div>
                <div>
                  <h3 className="card-section-title">Payment Method</h3>
                  <p className="card-section-desc">Dedicated Cash on Delivery payment for maximum buyer security</p>
                </div>
              </div>

              <div className="payment-options-grid">
                {/* Cash on Delivery Only */}
                <label className="payment-option-card selected">
                  <div className="payment-option-top">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={true}
                      readOnly
                      className="payment-radio"
                    />
                    <div style={{ flex: 1 }}>
                      <div className="payment-option-title-row">
                        <span className="payment-title">Cash on Delivery (COD)</span>
                        <span
                          className="payment-tag-standard"
                          style={{
                            background: 'var(--primary-light)',
                            color: 'var(--primary)',
                            fontWeight: 800,
                          }}
                        >
                          Verified & Active
                        </span>
                      </div>
                      <p className="payment-desc">
                        Pay with cash or digital payment directly to the courier upon doorstep delivery. Zero online payment risk, zero transaction fees.
                      </p>
                    </div>
                  </div>

                  <div className="payment-badges-row">
                    <span className="method-pill">Doorstep Payment</span>
                    <span className="method-pill">Cash / Card to Courier</span>
                    <span className="method-pill">Full Package Inspection</span>
                  </div>
                </label>
              </div>

              {/* Security Note */}
              <div className="payment-security-note">
                <Lock size={15} color="var(--accent)" />
                <span>
                  Orders are created with atomic stock reservation and verified server-side. Pay with peace of mind upon parcel arrival.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="checkout-summary-col">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>

              <div className="summary-items-scroll">
                {cartItems.map((item) => (
                  <div key={item.product} className="summary-item-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="summary-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="summary-item-details">
                      <h4 className="summary-item-name">{item.name}</h4>
                      <span className="summary-item-meta">
                        Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                      </span>
                    </div>
                    <span className="summary-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-calculations">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
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
                  <span>${taxPrice.toFixed(2)}</span>
                </div>
                <div className="summary-total">
                  <span>Total Due</span>
                  <span className="total-highlight">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg btn-checkout-submit"
              >
                {submitting ? (
                  <>
                    <RefreshCw size={18} className="spinner-icon" />
                    <span>Placing Your COD Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order (Cash on Delivery)</span>
                    <CheckCircle size={18} />
                  </>
                )}
              </button>

              <div className="checkout-trust-footer">
                <div className="trust-badge-item">
                  <ShieldCheck size={16} color="var(--success)" />
                  <span>Verified 100% Secure Checkout</span>
                </div>
                <div className="trust-badge-item">
                  <Truck size={16} color="var(--primary)" />
                  <span>Free shipping over $50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
