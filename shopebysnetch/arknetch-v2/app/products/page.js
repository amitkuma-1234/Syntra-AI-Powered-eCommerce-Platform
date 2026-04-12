'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, SEED_PRODUCTS, searchProducts, getProductsByCategory, BRANDS } from '@/lib/data';

function ProductsContent() {
  const params = useSearchParams();
  const category = params.get('category') || '';
  const query = params.get('q') || '';
  const [sort, setSort] = useState('popular');

  const filtered = useMemo(() => {
    let result = [];
    if (category) result = SEED_PRODUCTS.filter(p => p.category === category);
    else if (query) result = searchProducts(query, 40);
    else result = [...SEED_PRODUCTS];

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [category, query, sort]);

  const title = category ? CATEGORIES.find(c => c.id === category)?.name || 'Products' : query ? `Search: "${query}"` : 'All Products';

  return (
    <div className="container">
      <div className="products-page">
        <aside className="filter-panel">
          <h3 style={{ marginBottom: 20 }}>Filters</h3>
          <div className="filter-group">
            <h4>Category</h4>
            {CATEGORIES.map(c => (
              <a key={c.id} href={`/products?category=${c.id}`} className="filter-option" style={{ display: 'flex', gap: 8, textDecoration: 'none', color: category === c.id ? 'var(--primary-light)' : 'var(--text-secondary)' }}>
                {c.icon} {c.name}
              </a>
            ))}
          </div>
          <div className="filter-group">
            <h4>Brand</h4>
            {BRANDS.map(b => <div key={b} className="filter-option" style={{ fontSize: '.85rem', color: 'var(--text-secondary)' }}>{b}</div>)}
          </div>
          <a href="/products" className="btn btn-outline btn-sm" style={{ width: '100%', textDecoration: 'none', textAlign: 'center' }}>Clear Filters</a>
        </aside>
        <div>
          <div className="sort-bar">
            <div>
              <h2 style={{ fontSize: '1.3rem' }}>{title}</h2>
              <span style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{filtered.length} products</span>
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ width: 'auto', maxWidth: 200 }}>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">🔍</div><h3>No products found</h3><p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters</p></div>
          ) : (
            <div className="grid grid-3">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense fallback={<div className="container" style={{padding:60,textAlign:'center'}}><h2>Loading products...</h2></div>}><ProductsContent /></Suspense>;
}
