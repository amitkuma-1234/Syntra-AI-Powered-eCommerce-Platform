'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useStore, getActiveCart, getCartTotal, getCouponDiscount } from '@/lib/store';
import { getProduct, formatPrice } from '@/lib/data';

export default function CheckoutPage() {
  const { state, dispatch } = useStore();
  const items = getActiveCart(state.cart);
  const total = getCartTotal(state.cart);
  const discount = getCouponDiscount(state.appliedCoupon, total);
  const [addr, setAddr] = useState({ name: '', phone: '', line1: '', city: '', state: '', pin: '' });
  const [payment, setPayment] = useState('card');

  if (items.length === 0) return (
    <div className="container"><div className="empty-state" style={{ padding: 100 }}>
      <div className="empty-state-icon">🛒</div><h3>Nothing to checkout</h3>
      <Link href="/products" className="btn btn-primary">Shop Now</Link>
    </div></div>
  );

  const placeOrder = () => {
    if (!state.user) { window.location.href = '/login'; return; }
    if (!addr.line1 || !addr.city) {
      // Save address first
      if (state.addresses.length === 0) { alert('Please add a delivery address'); return; }
    } else {
      dispatch({ type: 'ADD_ADDRESS', payload: addr });
    }
    dispatch({ type: 'PLACE_ORDER', payload: { paymentMethod: payment } });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { title: '🎉 Order Placed!', message: 'Your order has been confirmed!', type: 'success' } });
    window.location.href = '/orders';
  };

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card 💳' },
    { id: 'upi', label: 'UPI (GPay, PhonePe) 📱' },
    { id: 'netbanking', label: 'Net Banking 🏦' },
    { id: 'cod', label: 'Cash on Delivery 💵' },
  ];

  return (
    <div className="container">
      <div className="checkout-steps">
        <div className="checkout-step active"><div className="step-num">1</div>Address</div>
        <div className="checkout-step"><div className="step-num">2</div>Payment</div>
        <div className="checkout-step"><div className="step-num">3</div>Confirm</div>
      </div>
      <div className="checkout-page">
        <div>
          <div className="checkout-section">
            <h3>📍 Delivery Address</h3>
            {state.addresses.map((a, i) => (
              <div key={a.id} className="payment-option" style={{ cursor: 'default' }}>
                <div><strong>{a.name}</strong><br /><span style={{ color: 'var(--text-muted)' }}>{a.line1}, {a.city}, {a.state} - {a.pin}</span><br /><span style={{ color: 'var(--text-muted)' }}>📞 {a.phone}</span></div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 20, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ marginBottom: 12, fontSize: '.9rem' }}>Add New Address</h4>
              <div className="form-row">
                <div className="form-group"><label>Full Name</label><input value={addr.name} onChange={e => setAddr({ ...addr, name: e.target.value })} placeholder="Name" /></div>
                <div className="form-group"><label>Phone</label><input value={addr.phone} onChange={e => setAddr({ ...addr, phone: e.target.value })} placeholder="Phone" /></div>
              </div>
              <div className="form-group"><label>Address</label><input value={addr.line1} onChange={e => setAddr({ ...addr, line1: e.target.value })} placeholder="House no., Street, Area" /></div>
              <div className="form-row">
                <div className="form-group"><label>City</label><input value={addr.city} onChange={e => setAddr({ ...addr, city: e.target.value })} placeholder="City" /></div>
                <div className="form-group"><label>State</label><input value={addr.state} onChange={e => setAddr({ ...addr, state: e.target.value })} placeholder="State" /></div>
              </div>
              <div className="form-group" style={{ maxWidth: 200 }}><label>PIN Code</label><input value={addr.pin} onChange={e => setAddr({ ...addr, pin: e.target.value })} placeholder="6-digit PIN" /></div>
            </div>
          </div>
          <div className="checkout-section">
            <h3>💳 Payment Method</h3>
            {paymentMethods.map(m => (
              <div key={m.id} className={`payment-option ${payment === m.id ? 'selected' : ''}`} onClick={() => setPayment(m.id)}>
                <input type="radio" name="payment" checked={payment === m.id} onChange={() => setPayment(m.id)} />
                <span>{m.label}</span>
              </div>
            ))}
          </div>
          <div className="checkout-section">
            <h3>📦 Order Items</h3>
            {items.map(item => {
              const p = getProduct(item.productId);
              if (!p) return null;
              return (
                <div key={item.productId} className="order-item">
                  <div className="order-item-img"><img src={p.image} alt="" /></div>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 500 }}>{p.name}</div><div style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>Qty: {item.qty}</div></div>
                  <div style={{ fontWeight: 600 }}>{formatPrice(p.price * item.qty)}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary-row"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
          <div className="cart-summary-row"><span>Shipping</span><span style={{ color: 'var(--success)' }}>FREE</span></div>
          {discount > 0 && <div className="cart-summary-row"><span>Discount</span><span style={{ color: 'var(--success)' }}>-{formatPrice(discount)}</span></div>}
          <div className="cart-summary-total"><span>Total</span><span>{formatPrice(total - discount)}</span></div>
          <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 16 }} onClick={placeOrder}>🔒 Place Order</button>
        </div>
      </div>
    </div>
  );
}
