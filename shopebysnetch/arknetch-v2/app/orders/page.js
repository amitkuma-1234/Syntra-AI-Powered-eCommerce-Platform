'use client';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';

export default function OrdersPage() {
  const { state } = useStore();
  if (!state.user) return <div className="auth-page"><div className="auth-card" style={{ textAlign: 'center' }}><h2>Please Sign In</h2><Link href="/login" className="btn btn-primary">Sign In</Link></div></div>;

  const orders = state.orders;
  const statusLabels = { confirmed: 'Confirmed', shipped: 'Shipped', out_for_delivery: 'Out for Delivery', delivered: 'Delivered', return_requested: 'Return Requested' };
  const statusSteps = ['confirmed', 'shipped', 'out_for_delivery', 'delivered'];

  if (orders.length === 0) return (
    <div className="container"><div className="empty-state" style={{ padding: 80 }}><div className="empty-state-icon">📦</div><h3>No orders yet</h3><p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Start shopping to see your orders here</p><Link href="/products" className="btn btn-primary">Shop Now</Link></div></div>
  );

  const fmtDate = (ts) => new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      <h2 style={{ marginBottom: 24 }}>📦 My Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-card-header">
            <div><span style={{ fontWeight: 600 }}>Order #{order.id}</span> <span style={{ color: 'var(--text-muted)', marginLeft: 12 }}>{fmtDate(order.placedAt)}</span></div>
            <span className={`status-badge ${order.status}`}>{statusLabels[order.status] || order.status}</span>
            <div style={{ fontWeight: 600 }}>{formatPrice(order.total)}</div>
          </div>
          <div className="order-card-body">
            {order.items.map((item, i) => (
              <div key={i} className="order-item">
                <div className="order-item-img"><img src={item.image} alt="" /></div>
                <div><div style={{ fontWeight: 500 }}>{item.name}</div><div style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>Qty: {item.qty} • {formatPrice(item.price)}</div></div>
              </div>
            ))}
            <div className="track-steps" style={{ marginTop: 16 }}>
              {statusSteps.map((step, i) => {
                const stepIdx = statusSteps.indexOf(order.status);
                const isCompleted = i <= stepIdx;
                const isActive = i === stepIdx;
                return (
                  <div key={step} className={`track-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                    <div className="track-dot">{isCompleted ? '✓' : i + 1}</div>
                    <div className="track-label">{statusLabels[step]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
