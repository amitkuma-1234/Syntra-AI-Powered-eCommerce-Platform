'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProduct, formatPrice, DEALS } from '@/lib/data';

function DealTimer({ endsIn }) {
  const [remaining, setRemaining] = useState(endsIn);
  useEffect(() => {
    const t = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  if (remaining <= 0) return <span style={{ color: 'var(--error)', fontSize: '.8rem' }}>Expired</span>;
  return (
    <div className="deal-timer">
      <div className="deal-timer-unit"><div className="deal-timer-num">{String(h).padStart(2,'0')}</div><div className="deal-timer-label">HRS</div></div>
      <div className="deal-timer-unit"><div className="deal-timer-num">{String(m).padStart(2,'0')}</div><div className="deal-timer-label">MIN</div></div>
      <div className="deal-timer-unit"><div className="deal-timer-num">{String(s).padStart(2,'0')}</div><div className="deal-timer-label">SEC</div></div>
    </div>
  );
}

export default function DealCard({ deal }) {
  const product = getProduct(deal.productId);
  if (!product) return null;
  const pct = Math.round(deal.claimed / deal.total * 100);
  return (
    <Link href={`/product/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card-img">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card-badge">{deal.label}</span>
      </div>
      <div className="product-card-body">
        <div className="product-card-title">{product.name}</div>
        <div className="product-card-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          <span className="price-original">{formatPrice(product.originalPrice)}</span>
          <span className="price-discount">{product.discount}% off</span>
        </div>
        <div className="deal-progress"><div className="deal-progress-bar" style={{ width: `${pct}%` }} /></div>
        <div style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{pct}% claimed</div>
        <DealTimer endsIn={deal.endsIn} />
      </div>
    </Link>
  );
}

export function DealsList({ count }) {
  const deals = DEALS.slice(0, count || DEALS.length);
  return (
    <div className="grid grid-4">
      {deals.map(d => <DealCard key={d.id} deal={d} />)}
    </div>
  );
}
