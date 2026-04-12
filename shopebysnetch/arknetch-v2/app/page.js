'use client';
import Link from 'next/link';
import BannerCarousel from '@/components/BannerCarousel';
import ProductCard from '@/components/ProductCard';
import { DealsList } from '@/components/DealCard';
import { CATEGORIES, SEED_PRODUCTS, getProductsByCategory } from '@/lib/data';

export default function HomePage() {
  const trending = [...SEED_PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
  const recommended = [...SEED_PRODUCTS].sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <>
      <div className="container">
        <BannerCarousel />
      </div>
      <div className="container">
        {/* Categories */}
        <section className="section">
          <div className="section-header"><h2>🏷️ Shop by Category</h2><Link href="/products">View All →</Link></div>
          <div className="grid grid-5">
            {CATEGORIES.map(c => (
              <Link key={c.id} href={`/products?category=${c.id}`} className="cat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="cat-card-icon">{c.icon}</div>
                <div className="cat-card-name">{c.name}</div>
                <div className="cat-card-count">{SEED_PRODUCTS.filter(p => p.category === c.id).length}+ items</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Lightning Deals */}
        <section className="section">
          <div className="section-header"><h2>⚡ Lightning Deals</h2><Link href="/deals">View All Deals →</Link></div>
          <DealsList count={4} />
        </section>

        {/* Recommended */}
        <section className="section">
          <div className="section-header"><h2>⭐ Recommended for You</h2></div>
          <div className="grid grid-4">
            {recommended.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Trending */}
        <section className="section">
          <div className="section-header"><h2>🔥 Trending Now</h2></div>
          <div className="grid grid-4">
            {trending.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Prime Banner */}
        <section className="section">
          <div className="deals-banner" style={{ background: 'var(--gradient-primary)' }}>
            <h2 style={{ color: '#fff', marginBottom: 8 }}>✨ Syntra Prime</h2>
            <p>Get FREE same-day delivery, exclusive deals, and more!</p>
            <button className="btn btn-lg" style={{ background: '#fff', color: 'var(--primary)', fontWeight: 700, marginTop: 16 }}>Try Prime Free →</button>
          </div>
        </section>
      </div>
    </>
  );
}
