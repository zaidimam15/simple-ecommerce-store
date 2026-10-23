import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { orderAPI } from '../api/client';
import LoadingSpinner from '../components/LoadingSpinner';
import { CheckCircle2, Package, ArrowRight, Home, Calendar, MapPin, Truck } from '../components/Icons';

export const OrderSuccessPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!order && id) {
      const fetchOrder = async () => {
        try {
          setLoading(true);
          const res = await orderAPI.getOrderById(id);
          if (res.success && res.order) {
            setOrder(res.order);
          } else {
            throw new Error(res.message || 'Unable to retrieve order details.');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchOrder();
    }
  }, [id, order]);

  if (loading) {
    return <LoadingSpinner text="Retrieving confirmed order from MongoDB..." />;
  }

  if (error || !order) {
    return (
      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="empty-state">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Order Confirmation
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {error || 'Your order was successfully recorded. View your order list below.'}
          </p>
          <Link to="/orders" className="btn btn-primary">
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '680px', marginTop: '2rem' }}>
      {/* Confirmation Header */}
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '1.85rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'inline-flex', padding: '0.65rem', background: 'var(--success-bg)', borderRadius: '50%', marginBottom: '1rem' }}>
          <CheckCircle2 size={40} color="var(--success)" />
        </div>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
          Thank You! Your Order is Confirmed
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
          We received your order and are preparing it for shipment. A record has been securely stored in the MongoDB database.
        </p>

        <div
          style={{
            display: 'inline-block',
            background: 'var(--bg-alt)',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: 'var(--primary)',
          }}
        >
          Order Reference ID: {order._id}
        </div>
      </div>

      {/* Order Details Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Calendar size={14} /> Placed on {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
              <Truck size={14} /> Status: <span className="badge-status status-processing">{order.status}</span>
              <span>•</span>
              <span>Payment: <strong>{order.paymentMethod || 'Cash on Delivery'}</strong></span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: order.isPaid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: order.isPaid ? 'var(--success)' : 'var(--warning)',
                  border: `1px solid ${order.isPaid ? 'var(--success)' : 'var(--warning)'}`,
                }}
              >
                {order.isPaid ? 'PAID' : 'PENDING ON DELIVERY'}
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Amount</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              ${Number(order.totalPrice).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={16} color="var(--primary)" /> Delivery Address
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            <strong>{order.shippingAddress.fullName}</strong> ({order.shippingAddress.phone})<br />
            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
        </div>

        {/* Items List */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Package size={16} color="var(--primary)" /> Purchased Items ({order.orderItems?.length || 0})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {order.orderItems?.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  background: 'var(--bg-alt)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.name}</h5>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Quantity: {item.quantity} × ${Number(item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <Link to="/orders" className="btn btn-secondary btn-lg">
          <Package size={18} /> View All My Orders
        </Link>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} /> Back to Store
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
