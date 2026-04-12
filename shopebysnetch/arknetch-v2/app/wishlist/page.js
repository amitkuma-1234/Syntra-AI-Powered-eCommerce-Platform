'use client';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { getProduct } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { state } = useStore();
  const items = state.wishlist.map(id => getProduct(id)).filter(Boolean);

  if (items.length === 0) return (
    <div className="container"><div className="empty-state" style={{ padding: 80 }}>
      <div className="empty-state-icon">❤️</div><h3>Your wishlist is empty</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Save items you love for later</p>
      <Link href="/products" className="btn btn-primary">Explore Products</Link>
    </div></div>
  );

  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      <div className="section-header"><h2>❤️ My Wishlist ({items.length})</h2></div>
      <div className="grid grid-4">{items.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </div>
  );
}
