'use client';
import Link from 'next/link';
import { useStore, getActiveCart, getCartTotal, getCartCount, getCouponDiscount } from '@/lib/store';
import { getProduct, formatPrice, COUPONS } from '@/lib/data';
import { useState } from 'react';

export default function CartPage() {
  const { state, dispatch } = useStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const items = getActiveCart(state.cart);
  const saved = state.cart.filter(i => i.savedForLater);
  const total = getCartTotal(state.cart);
  const discount = getCouponDiscount(state.appliedCoupon, total);

  if (items.length === 0 && saved.length === 0) {
    return <div className="container"><div className="empty-state" style={{ padding: '100px 24px' }}><div className="empty-state-icon">🛒</div><h2>Your cart is empty</h2><p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Add some items to get started!</p><Link href="/products" className="btn btn-primary btn-lg">Start Shopping</Link></div></div>;
  }

  const applyCoupon = () => {
    const coupon = COUPONS.find(c => c.code === couponInput.toUpperCase() && c.active);
    if (!coupon) { setCouponMsg('Invalid coupon code'); return; }
    if (total < coupon.minOrder) { setCouponMsg(`Min order ₹${coupon.minOrder} required`); return; }
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
    setCouponMsg(`✅ ${coupon.description}`);
  };

  return (
    <div className="container">
      <h2 style={{ padding: '24px 0' }}>🛒 Shopping Cart ({getCartCount(state.cart)} items)</h2>
      <div className="cart-page">
        <div>
          {items.map(item => {
            const p = getProduct(item.productId);
            if (!p) return null;
            return (
              <div key={item.productId} className="cart-item">
                <Link href={`/product/${p.id}`} className="cart-item-img"><img src={p.image} alt={p.name} /></Link>
                <div className="cart-item-info">
                  <Link href={`/product/${p.id}`} className="cart-item-title" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>{p.name}</Link>
                  <div className="cart-item-brand">{p.brand}</div>
                  <div className="product-card-price" style={{ marginTop: 6 }}>
                    <span className="price-current">{formatPrice(p.price)}</span>
                    {p.originalPrice && <span className="price-original">{formatPrice(p.originalPrice)}</span>}
                    {p.discount > 0 && <span className="price-discount">{p.discount}% off</span>}
                  </div>
                  <div className="cart-item-actions">
                    <div className="pd-qty">
                      <button onClick={() => dispatch({ type: 'UPDATE_CART_QTY', payload: { productId: p.id, qty: item.qty - 1 } })}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => dispatch({ type: 'UPDATE_CART_QTY', payload: { productId: p.id, qty: item.qty + 1 } })}>+</button>
                    </div>
                    <button className="btn btn-sm btn-secondary" onClick={() => dispatch({ type: 'SAVE_FOR_LATER', payload: p.id })}>Save for Later</button>
                    <button className="btn btn-sm btn-secondary" style={{ color: 'var(--error)' }} onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: p.id })}>🗑️ Remove</button>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>{formatPrice(p.price * item.qty)}</div>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary-row"><span>Subtotal ({getCartCount(state.cart)} items)</span><span>{formatPrice(total)}</span></div>
          <div className="cart-summary-row"><span>Shipping</span><span style={{ color: 'var(--success)' }}>FREE</span></div>
          {discount > 0 && <div className="cart-summary-row"><span>Coupon Discount</span><span style={{ color: 'var(--success)' }}>-{formatPrice(discount)}</span></div>}
          <div className="cart-summary-total"><span>Total</span><span>{formatPrice(total - discount)}</span></div>
          <div style={{ margin: '16px 0' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={couponInput} onChange={e => setCouponInput(e.target.value)} placeholder="Coupon code" style={{ flex: 1 }} />
              <button className="btn btn-sm btn-secondary" onClick={applyCoupon}>Apply</button>
            </div>
            {couponMsg && <div style={{ fontSize: '.85rem', marginTop: 6, color: couponMsg.startsWith('✅') ? 'var(--success)' : 'var(--error)' }}>{couponMsg}</div>}
          </div>
          <Link href="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', textDecoration: 'none', textAlign: 'center' }}>Proceed to Checkout →</Link>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: '.85rem', color: 'var(--text-muted)' }}>🔒 Secured by SSL encryption</div>
        </div>
      </div>
    </div>
  );
}
