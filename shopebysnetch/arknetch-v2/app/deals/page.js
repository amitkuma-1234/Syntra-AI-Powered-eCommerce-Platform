'use client';
import { DealsList } from '@/components/DealCard';
import ProductCard from '@/components/ProductCard';
import { SEED_PRODUCTS, COUPONS } from '@/lib/data';

export default function DealsPage() {
  const bestDiscounts = [...SEED_PRODUCTS].sort((a, b) => b.discount - a.discount).slice(0, 8);
  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      <div className="deals-banner">
        <h1>🔥 Arknetch Deals Festival</h1>
        <p>Massive discounts on thousands of products. Limited time only!</p>
      </div>
      <section className="section">
        <div className="section-header"><h2>⚡ Lightning Deals</h2></div>
        <DealsList />
      </section>
      <section className="section">
        <div className="section-header"><h2>💰 Best Discounts</h2></div>
        <div className="grid grid-4">{bestDiscounts.map(p => <ProductCard key={p.id} product={p} />)}</div>
      </section>
      <section className="section" style={{ textAlign: 'center', padding: 40, background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginBottom: 8 }}>🎟️ Coupon Codes</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Apply at checkout to save more!</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {COUPONS.filter(c => c.active).map(c => (
            <div key={c.code} style={{ background: 'var(--bg-tertiary)', border: '1px dashed var(--primary)', borderRadius: 'var(--radius-sm)', padding: 16, minWidth: 180, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary-light)', fontSize: '1.1rem' }}>{c.code}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{c.description}</div>
              <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginTop: 4 }}>Expires: {c.expiresAt}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
