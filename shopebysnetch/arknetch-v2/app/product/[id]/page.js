'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { getProduct, formatPrice, getStars, CATEGORIES, SAMPLE_REVIEWS, SEED_PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const { dispatch } = useStore();
  const product = getProduct(parseInt(id));
  const [mainImg, setMainImg] = useState(0);
  const [activeTab, setActiveTab] = useState('desc');
  const [selColor, setSelColor] = useState(0);
  const [selSize, setSelSize] = useState(0);

  if (!product) return <div className="container"><div className="empty-state" style={{padding:100}}><div className="empty-state-icon">😕</div><h3>Product not found</h3><Link href="/products" className="btn btn-primary">Browse Products</Link></div></div>;

  const related = SEED_PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const images = product.images?.length > 0 ? product.images : [product.image];

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId: product.id, color: product.colors?.[selColor] || '', size: product.sizes?.[selSize] || '' } });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { title: 'Added to Cart', message: `${product.name} added!`, type: 'success' } });
  };

  return (
    <div className="container">
      <div style={{ padding: '12px 0', fontSize: '.9rem', color: 'var(--text-muted)' }}>
        <Link href="/">Home</Link> › <Link href={`/products?category=${product.category}`}>{CATEGORIES.find(c => c.id === product.category)?.name}</Link> › {product.name}
      </div>
      <div className="product-detail">
        <div className="pd-gallery">
          <div className="pd-main-img"><img src={images[mainImg]} alt={product.name} /></div>
          <div className="pd-thumbs">
            {images.map((img, i) => (
              <div key={i} className={`pd-thumb ${i === mainImg ? 'active' : ''}`} onClick={() => setMainImg(i)}><img src={img} alt="" /></div>
            ))}
          </div>
        </div>
        <div className="pd-info">
          <div className="pd-brand">{product.brand}</div>
          <h1>{product.name}</h1>
          <div className="pd-rating">
            <span className="stars" style={{ fontSize: '1.1rem' }}>{getStars(product.rating)}</span>
            <span style={{ fontWeight: 600 }}>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount?.toLocaleString()} reviews)</span>
          </div>
          <div className="pd-price-box">
            <span className="pd-price">{formatPrice(product.price)}</span>
            {product.originalPrice && <span className="pd-original-price">{formatPrice(product.originalPrice)}</span>}
            {product.discount > 0 && <span className="pd-discount-badge">{product.discount}% OFF</span>}
            {product.originalPrice && <div style={{ color: 'var(--success)', fontSize: '.9rem', marginTop: 8 }}>You save {formatPrice(product.originalPrice - product.price)}</div>}
            <div className="pd-delivery">🚚 {product.freeDelivery ? 'FREE Delivery' : 'Standard Delivery'} — Get it by <strong>{new Date(Date.now() + product.deliveryDays * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</strong></div>
          </div>
          {product.colors?.length > 0 && (
            <div className="pd-options"><div className="pd-option-label">Color</div><div className="pd-colors">{product.colors.map((c, i) => <div key={i} className={`pd-color ${i === selColor ? 'active' : ''}`} style={{ background: c }} onClick={() => setSelColor(i)} />)}</div></div>
          )}
          {product.sizes && (
            <div className="pd-options"><div className="pd-option-label">Size</div><div className="pd-sizes">{product.sizes.map((s, i) => <div key={i} className={`pd-size ${i === selSize ? 'active' : ''}`} onClick={() => setSelSize(i)}>{s}</div>)}</div></div>
          )}
          <div className="pd-actions">
            <button className="btn btn-cart btn-lg" onClick={addToCart}>🛒 Add to Cart</button>
            <button className="btn btn-primary btn-lg" onClick={() => { addToCart(); window.location.href = '/checkout'; }}>⚡ Buy Now</button>
          </div>
          <div className="pd-features"><h3 style={{ marginBottom: 12 }}>Key Features</h3><ul>{product.features?.map((f, i) => <li key={i}>{f}</li>)}</ul></div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 16 }}>
            <div style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Seller: <strong style={{ color: 'var(--text-primary)' }}>{product.seller}</strong></div>
            <div style={{ fontSize: '.85rem', color: product.inStock ? 'var(--success)' : 'var(--error)', marginTop: 4 }}>{product.inStock ? `✅ In Stock (${product.stockCount} available)` : '❌ Out of Stock'}</div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="pd-tabs">
        <div className="pd-tab-btns">
          {[['desc','Description'],['specs','Specifications'],['reviews',`Reviews (${product.reviewCount})`]].map(([k,l]) => (
            <button key={k} className={`pd-tab-btn ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>{l}</button>
          ))}
        </div>
        {activeTab === 'desc' && <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{product.description}</p>}
        {activeTab === 'specs' && product.specs && (
          <table className="data-table"><tbody>{Object.entries(product.specs).map(([k, v]) => <tr key={k}><td style={{ fontWeight: 600, width: 200 }}>{k}</td><td>{v}</td></tr>)}</tbody></table>
        )}
        {activeTab === 'reviews' && SAMPLE_REVIEWS.slice(0, 3).map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header"><div className="review-avatar">{r.userName.charAt(0)}</div><div><div className="review-name">{r.userName}</div><div className="review-date">{r.date}</div></div><div className="stars" style={{ marginLeft: 'auto' }}>{getStars(r.rating)}</div></div>
            <div className="review-title">{r.title}</div>
            <div className="review-text">{r.comment}</div>
            <div className="review-helpful">👍 {r.helpful} people found this helpful</div>
          </div>
        ))}
      </div>
      {/* Related */}
      {related.length > 0 && (
        <section className="section"><div className="section-header"><h2>🛍️ Related Products</h2></div><div className="grid grid-4">{related.map(p => <ProductCard key={p.id} product={p} />)}</div></section>
      )}
    </div>
  );
}
