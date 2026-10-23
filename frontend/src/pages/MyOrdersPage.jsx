
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../api/client';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Package,
  Calendar,
  MapPin,
  ShoppingBag,
  AlertCircle,
} from '../components/Icons';

export const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelError, setCancelError] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await orderAPI.getMyOrders();

      if (res.success) {
        setOrders(res.orders || []);
      } else {
        throw new Error(res.message || 'Failed to retrieve your orders.');
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
      setError(err.message || 'Error fetching orders from server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this order?'
    );

    if (!confirmed) return;

    try {
      setCancellingOrderId(orderId);
      setCancelError('');
      setCancelMessage('');

      // Uses the authenticated API client.
      const res = await orderAPI.cancelOrder(orderId);

      if (!res.success) {
        throw new Error(res.message || 'Unable to cancel this order.');
      }

      setCancelMessage('Order cancelled successfully. Stock has been restored.');
      await fetchOrders();
    } catch (err) {
      console.error('Cancel order error:', err);
      setCancelError(
        err.message || 'Unable to cancel the order. Please try again.'
      );
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Fetching your order history from MongoDB..." />;
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '0.25rem',
            }}
          >
            My Orders
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Review past purchases, shipment statuses, and order summaries.
          </p>
        </div>

        <Link to="/" className="btn btn-outline">
          Continue Shopping
        </Link>
      </div>

      {error && (
        <div className="empty-state">
          <AlertCircle
            className="empty-icon"
            style={{ color: 'var(--danger)' }}
          />
          <h3>Error Loading Orders</h3>
          <p style={{ color: 'var(--text-muted)' }}>{error}</p>
          <button className="btn btn-outline" onClick={fetchOrders}>
            Try Again
          </button>
        </div>
      )}

      {cancelMessage && (
        <div
          role="status"
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-alt)',
          }}
        >
          {cancelMessage}
        </div>
      )}

      {cancelError && (
        <div
          role="alert"
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            color: 'var(--danger)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-alt)',
          }}
        >
          {cancelError}
        </div>
      )}

      {!error && orders.length === 0 && (
        <div className="empty-state">
          <Package className="empty-icon" />
          <h2
            style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            No Orders Placed Yet
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              maxWidth: '420px',
              margin: '0 auto 1.5rem',
            }}
          >
            You haven't placed any orders yet. Discover our latest items and
            place your first order today!
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            <ShoppingBag size={18} /> Start Shopping
          </Link>
        </div>
      )}

      {!error && orders.length > 0 && (
        <div>
          {orders.map((order) => {
            const status = String(order.status || '').toLowerCase();
            const canCancel =
              ['processing', 'pending'].includes(status) &&
              order.isPaid !== true;

            return (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Order ID
                    </span>
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: 'var(--primary)',
                      }}
                    >
                      #{order._id}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <Calendar size={15} />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`badge-status ${status === 'delivered'
                        ? 'status-delivered'
                        : status === 'shipped'
                          ? 'status-shipped'
                          : status === 'cancelled'
                            ? 'status-cancelled'
                            : 'status-processing'
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Total Amount
                    </span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                      ${Number(order.totalPrice).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {order.orderItems?.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        background: 'var(--bg-alt)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '48px',
                            height: '48px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-sm)',
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
                          }}
                        />
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                            {item.name}
                          </h4>
                          <span
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--text-muted)',
                            }}
                          >
                            Qty: {item.quantity} × $
                            {Number(item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        ${(Number(item.quantity) * Number(item.price)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address and Payment */}
                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <MapPin size={15} color="var(--primary)" />
                    <span>
                      Shipped to <strong>{order.shippingAddress?.fullName}</strong>{' '}
                      — {order.shippingAddress?.city},{' '}
                      {order.shippingAddress?.country}
                    </span>
                  </div>
                  <div>
                    Payment: <strong>{order.paymentMethod}</strong>
                  </div>
                </div>

                {/* Cancel Order */}
                {canCancel && (
                  <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn btn-outline"
                      disabled={cancellingOrderId === order._id}
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      {cancellingOrderId === order._id
                        ? 'Cancelling...'
                        : 'Cancel Order'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
