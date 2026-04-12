'use client';
import Link from 'next/link';
import { useStore } from '@/lib/store';

export default function AccountPage() {
  const { state, dispatch } = useStore();
  if (!state.user) return (
    <div className="auth-page"><div className="auth-card" style={{ textAlign: 'center' }}>
      <h2>Please Sign In</h2><p className="subtitle">You need to login to view your account</p>
      <Link href="/login" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>Sign In</Link>
    </div></div>
  );

  const u = state.user;
  return (
    <div className="container">
      <div className="account-page">
        <div className="account-sidebar">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="review-avatar" style={{ width: 64, height: 64, fontSize: '1.5rem', margin: '0 auto 12px' }}>{u.avatar}</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{u.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>{u.email}</div>
          </div>
          <Link href="/account" className="account-menu-item active" style={{ display: 'block', textDecoration: 'none' }}>👤 My Profile</Link>
          <Link href="/orders" className="account-menu-item" style={{ display: 'block', textDecoration: 'none' }}>📦 My Orders</Link>
          <Link href="/wishlist" className="account-menu-item" style={{ display: 'block', textDecoration: 'none' }}>❤️ Wishlist</Link>
          <Link href="/cart" className="account-menu-item" style={{ display: 'block', textDecoration: 'none' }}>🛒 Cart</Link>
          <button className="account-menu-item" style={{ width: '100%', textAlign: 'left' }} onClick={() => { dispatch({ type: 'LOGOUT' }); window.location.href = '/'; }}>🚪 Logout</button>
        </div>
        <div>
          <div className="checkout-section">
            <h3>Profile Information</h3>
            <div className="form-row">
              <div className="form-group"><label>Full Name</label><input defaultValue={u.name} readOnly /></div>
              <div className="form-group"><label>Email</label><input defaultValue={u.email} readOnly /></div>
            </div>
            <div className="form-group"><label>Phone</label><input defaultValue={u.phone || ''} placeholder="+91 XXXXXXXXXX" readOnly /></div>
          </div>
          <div className="checkout-section">
            <h3>📍 Saved Addresses</h3>
            {state.addresses.length > 0 ? state.addresses.map(a => (
              <div key={a.id} style={{ padding: 12, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><strong>{a.name}</strong> • {a.phone}<br /><span style={{ color: 'var(--text-muted)' }}>{a.line1}, {a.city}, {a.state} - {a.pin}</span></div>
                <button className="btn btn-sm btn-secondary" style={{ color: 'var(--error)' }} onClick={() => dispatch({ type: 'REMOVE_ADDRESS', payload: a.id })}>Remove</button>
              </div>
            )) : <p style={{ color: 'var(--text-muted)' }}>No saved addresses</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
