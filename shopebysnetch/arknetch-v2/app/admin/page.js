'use client';
import { useState, useRef } from 'react';
import { SEED_PRODUCTS, CATEGORIES, COUPONS, formatPrice, SAMPLE_REVIEWS } from '@/lib/data';

export default function AdminPage() {
  const [tab, setTab] = useState('dashboard');
  const [products, setProducts] = useState([...SEED_PRODUCTS]);
  const [coupons, setCoupons] = useState([...COUPONS]);
  const [editProduct, setEditProduct] = useState(null);
  const [editCoupon, setEditCoupon] = useState(null);
  const fileRef = useRef(null);

  // --- Dashboard ---
  const Dashboard = () => (
    <div>
      <div className="admin-header"><h2>📊 Dashboard Overview</h2></div>
      <div className="seller-stats">
        <div className="stat-card"><div className="stat-value" style={{ color: 'var(--primary-light)' }}>₹12,47,890</div><div className="stat-label">Total Revenue</div><div className="stat-change up">↑ 15.2% vs last month</div></div>
        <div className="stat-card"><div className="stat-value" style={{ color: 'var(--accent)' }}>3,456</div><div className="stat-label">Total Orders</div><div className="stat-change up">↑ 12.1%</div></div>
        <div className="stat-card"><div className="stat-value" style={{ color: 'var(--success)' }}>{products.length}</div><div className="stat-label">Products</div><div className="stat-change up">Active catalog</div></div>
        <div className="stat-card"><div className="stat-value" style={{ color: 'var(--warning)' }}>{coupons.filter(c => c.active).length}</div><div className="stat-label">Active Coupons</div><div className="stat-change up">{coupons.length} total</div></div>
      </div>
      <div className="grid grid-2" style={{ gap: 16 }}>
        <div className="checkout-section">
          <h3>📈 Recent Analytics</h3>
          {[{ label: 'Page Views', val: '45,231', change: '+8.2%' }, { label: 'Conversion Rate', val: '3.4%', change: '+0.5%' }, { label: 'Avg Order Value', val: '₹3,610', change: '+12%' }, { label: 'Active Users', val: '1,234', change: '+18%' }].map(m => (
            <div key={m.label} className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{m.label}</span>
              <div><strong>{m.val}</strong> <span style={{ color: 'var(--success)', fontSize: '.8rem', marginLeft: 8 }}>{m.change}</span></div>
            </div>
          ))}
        </div>
        <div className="checkout-section">
          <h3>⭐ Recent Reviews</h3>
          {SAMPLE_REVIEWS.slice(0, 4).map((r, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex" style={{ gap: 8 }}><span className="stars" style={{ fontSize: '.8rem' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span><strong style={{ fontSize: '.85rem' }}>{r.userName}</strong></div>
              <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginTop: 2 }}>{r.comment.slice(0, 60)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- Products CRUD ---
  const ProductsPanel = () => (
    <div>
      <div className="admin-header">
        <h2>📦 Products ({products.length})</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-sm btn-secondary" onClick={() => fileRef.current?.click()}>📤 Bulk CSV Upload</button>
          <input type="file" ref={fileRef} accept=".csv" style={{ display: 'none' }} onChange={handleCSV} />
          <button className="btn btn-sm btn-primary" onClick={() => setEditProduct({ id: Date.now(), name: '', category: 'electronics', brand: 'Arknetch', price: 0, originalPrice: 0, discount: 0, rating: 4.0, reviewCount: 0, image: '', description: '', features: [], inStock: true, stockCount: 100, seller: 'Arknetch Official', deliveryDays: 2, freeDelivery: true, tags: [] })}>+ Add Product</button>
        </div>
      </div>
      {editProduct && <ProductForm product={editProduct} onSave={(p) => { setProducts(prev => prev.find(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [...prev, p]); setEditProduct(null); }} onCancel={() => setEditProduct(null)} />}
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr></thead>
          <tbody>
            {products.slice(0, 20).map(p => (
              <tr key={p.id}>
                <td><img src={p.image} alt="" style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} /></td>
                <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</td>
                <td>{p.category}</td>
                <td>{formatPrice(p.price)}</td>
                <td><span className={`status-badge ${p.stockCount < 10 ? 'cancelled' : p.stockCount < 50 ? 'processing' : 'delivered'}`}>{p.stockCount}</span></td>
                <td>{p.rating}★</td>
                <td>
                  <button className="btn btn-sm btn-secondary" style={{ marginRight: 4 }} onClick={() => setEditProduct({ ...p })}>✏️</button>
                  <button className="btn btn-sm btn-secondary" style={{ color: 'var(--error)' }} onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- Product Form ---
  const ProductForm = ({ product, onSave, onCancel }) => {
    const [p, setP] = useState(product);
    return (
      <div className="checkout-section" style={{ marginBottom: 20 }}>
        <h3>{p.id > 39 ? 'Add Product' : 'Edit Product'}</h3>
        <div className="form-row">
          <div className="form-group"><label>Name</label><input value={p.name} onChange={e => setP({ ...p, name: e.target.value })} /></div>
          <div className="form-group"><label>Brand</label><input value={p.brand} onChange={e => setP({ ...p, brand: e.target.value })} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Category</label>
            <select value={p.category} onChange={e => setP({ ...p, category: e.target.value })}>{CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          </div>
          <div className="form-group"><label>Price (₹)</label><input type="number" value={p.price} onChange={e => setP({ ...p, price: parseInt(e.target.value) || 0 })} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Original Price</label><input type="number" value={p.originalPrice} onChange={e => setP({ ...p, originalPrice: parseInt(e.target.value) || 0 })} /></div>
          <div className="form-group"><label>Stock</label><input type="number" value={p.stockCount} onChange={e => setP({ ...p, stockCount: parseInt(e.target.value) || 0 })} /></div>
        </div>
        <div className="form-group"><label>Image URL</label><input value={p.image} onChange={e => setP({ ...p, image: e.target.value })} /></div>
        <div className="form-group"><label>Description</label><textarea value={p.description} onChange={e => setP({ ...p, description: e.target.value })} rows={3} style={{ width: '100%', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontFamily: 'inherit' }} /></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={() => onSave({ ...p, discount: p.originalPrice > 0 ? Math.round((1 - p.price / p.originalPrice) * 100) : 0 })}>Save</button>
          <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  };

  // --- CSV Upload ---
  const handleCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const lines = ev.target.result.split('\n').slice(1);
      const newProducts = lines.filter(l => l.trim()).map((line, i) => {
        const cols = line.split(',');
        return { id: Date.now() + i, name: cols[0]?.trim() || 'Product', category: cols[1]?.trim() || 'electronics', brand: cols[2]?.trim() || 'Arknetch', price: parseInt(cols[3]) || 999, originalPrice: parseInt(cols[4]) || 1999, discount: 0, rating: 4.0, reviewCount: 0, image: cols[5]?.trim() || SEED_PRODUCTS[0].image, description: cols[6]?.trim() || '', features: [], inStock: true, stockCount: 100, seller: 'Arknetch Official', deliveryDays: 2, freeDelivery: true, tags: [] };
      });
      setProducts(prev => [...prev, ...newProducts]);
      alert(`${newProducts.length} products imported!`);
    };
    reader.readAsText(file);
  };

  // --- Coupons CRUD ---
  const CouponsPanel = () => (
    <div>
      <div className="admin-header">
        <h2>🎟️ Coupons ({coupons.length})</h2>
        <button className="btn btn-sm btn-primary" onClick={() => setEditCoupon({ code: '', discount: 10, type: 'percent', minOrder: 500, maxDiscount: 1000, description: '', active: true, expiresAt: '2026-12-31' })}>+ Create Coupon</button>
      </div>
      {editCoupon && (
        <div className="checkout-section" style={{ marginBottom: 20 }}>
          <h3>Coupon Details</h3>
          <div className="form-row">
            <div className="form-group"><label>Code</label><input value={editCoupon.code} onChange={e => setEditCoupon({ ...editCoupon, code: e.target.value.toUpperCase() })} /></div>
            <div className="form-group"><label>Type</label>
              <select value={editCoupon.type} onChange={e => setEditCoupon({ ...editCoupon, type: e.target.value })}><option value="percent">Percentage</option><option value="flat">Flat Amount</option><option value="shipping">Free Shipping</option></select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Discount</label><input type="number" value={editCoupon.discount} onChange={e => setEditCoupon({ ...editCoupon, discount: parseInt(e.target.value) || 0 })} /></div>
            <div className="form-group"><label>Min Order (₹)</label><input type="number" value={editCoupon.minOrder} onChange={e => setEditCoupon({ ...editCoupon, minOrder: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Max Discount (₹)</label><input type="number" value={editCoupon.maxDiscount} onChange={e => setEditCoupon({ ...editCoupon, maxDiscount: parseInt(e.target.value) || 0 })} /></div>
            <div className="form-group"><label>Expires</label><input type="date" value={editCoupon.expiresAt} onChange={e => setEditCoupon({ ...editCoupon, expiresAt: e.target.value })} /></div>
          </div>
          <div className="form-group"><label>Description</label><input value={editCoupon.description} onChange={e => setEditCoupon({ ...editCoupon, description: e.target.value })} /></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={() => { setCoupons(prev => [...prev.filter(c => c.code !== editCoupon.code), editCoupon]); setEditCoupon(null); }}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditCoupon(null)}>Cancel</button>
          </div>
        </div>
      )}
      <table className="data-table">
        <thead><tr><th>Code</th><th>Type</th><th>Discount</th><th>Min Order</th><th>Expires</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {coupons.map(c => (
            <tr key={c.code}>
              <td><strong style={{ color: 'var(--primary-light)' }}>{c.code}</strong></td>
              <td>{c.type}</td>
              <td>{c.type === 'percent' ? `${c.discount}%` : c.type === 'flat' ? `₹${c.discount}` : 'Free'}</td>
              <td>₹{c.minOrder}</td>
              <td>{c.expiresAt}</td>
              <td><span className={`status-badge ${c.active ? 'delivered' : 'cancelled'}`}>{c.active ? 'Active' : 'Inactive'}</span></td>
              <td>
                <button className="btn btn-sm btn-secondary" style={{ marginRight: 4 }} onClick={() => setEditCoupon({ ...c })}>✏️</button>
                <button className="btn btn-sm btn-secondary" style={{ color: 'var(--error)' }} onClick={() => setCoupons(prev => prev.filter(x => x.code !== c.code))}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // --- Orders Tracking ---
  const OrdersPanel = () => (
    <div>
      <div className="admin-header"><h2>📦 Order Tracking</h2><button className="btn btn-sm btn-secondary">📤 Export CSV</button></div>
      <table className="data-table">
        <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          {[
            { id: '#ARK7842', customer: 'Rahul S.', product: 'Arknetch Pro Max', amount: '₹69,999', status: 'delivered', date: 'Apr 3, 2026' },
            { id: '#ARK7841', customer: 'Priya M.', product: 'AirPods Ultra', amount: '₹24,999', status: 'shipped', date: 'Apr 2, 2026' },
            { id: '#ARK7840', customer: 'Amit K.', product: 'Smart Watch Ultra', amount: '₹34,999', status: 'processing', date: 'Apr 1, 2026' },
            { id: '#ARK7839', customer: 'Sneha R.', product: 'Running Shoes X1', amount: '₹6,999', status: 'delivered', date: 'Mar 31, 2026' },
            { id: '#ARK7838', customer: 'Vikram P.', product: 'Espresso Machine', amount: '₹24,999', status: 'shipped', date: 'Mar 30, 2026' },
            { id: '#ARK7837', customer: 'Neha G.', product: 'Skincare Set', amount: '₹3,999', status: 'confirmed', date: 'Mar 29, 2026' },
          ].map(o => (
            <tr key={o.id}>
              <td>{o.id}</td><td>{o.customer}</td><td>{o.product}</td><td>{o.amount}</td>
              <td><span className={`status-badge ${o.status}`}>{o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td><td>{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '📦', label: 'Products' },
    { id: 'orders', icon: '🚚', label: 'Orders' },
    { id: 'coupons', icon: '🎟️', label: 'Coupons' },
  ];

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div style={{ padding: '0 24px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: 8 }}>
          <h3 style={{ fontSize: '1rem' }}>🛡️ Admin Panel</h3>
          <div style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>Arknetch Management</div>
        </div>
        {navItems.map(item => (
          <div key={item.id} className={`admin-nav-item ${tab === item.id ? 'active' : ''}`} onClick={() => setTab(item.id)}>
            {item.icon} {item.label}
          </div>
        ))}
      </div>
      <div className="admin-content">
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'products' && <ProductsPanel />}
        {tab === 'orders' && <OrdersPanel />}
        {tab === 'coupons' && <CouponsPanel />}
      </div>
    </div>
  );
}
