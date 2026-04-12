'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useStore, getCartCount } from '@/lib/store';
import { CATEGORIES, searchProducts } from '@/lib/data';

export default function Header() {
  const { state, dispatch } = useStore();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const searchRef = useRef(null);
  const cartCount = getCartCount(state.cart);
  const unreadNotifs = state.notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false);
      if (!e.target.closest('#notif-area')) setShowNotifs(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleSearch = useCallback((val) => {
    setQuery(val);
    if (val.length >= 2) {
      const results = searchProducts(val, 5);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, []);

  const doSearch = () => {
    if (!query.trim()) return;
    dispatch({ type: 'ADD_SEARCH_HISTORY', payload: query.trim() });
    setShowSuggestions(false);
    window.location.href = `/products?q=${encodeURIComponent(query.trim())}`;
  };

  return (
    <>
      <div className="promo-bar">
        <span>🎉 Welcome to Syntra — Use code <strong>WELCOME10</strong> for 10% off! Free delivery on orders above ₹499 🚚</span>
      </div>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo">SYNTRA<span>.in</span></Link>
          <div className="search-bar" ref={searchRef}>
            <input
              type="text" value={query} placeholder="Search for products, brands, and more..."
              onChange={e => handleSearch(e.target.value)}
              onFocus={() => query.length >= 2 && setShowSuggestions(true)}
              onKeyDown={e => e.key === 'Enter' && doSearch()}
            />
            <button onClick={doSearch}>🔍</button>
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map(p => (
                  <Link key={p.id} href={`/product/${p.id}`} className="search-suggestion-item" onClick={() => setShowSuggestions(false)}>
                    <img src={p.image} alt="" style={{ width: 36, height: 36, borderRadius: 4, objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '.9rem' }}>{p.name}</div>
                      <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>₹{p.price.toLocaleString('en-IN')}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="header-actions">
            <div id="notif-area" style={{ position: 'relative' }}>
              <button className="header-btn" onClick={() => setShowNotifs(!showNotifs)}>
                🔔{unreadNotifs > 0 && <span className="badge">{unreadNotifs}</span>}
              </button>
              {showNotifs && (
                <div className="notification-panel open">
                  <div className="notification-panel-header">
                    <strong>Notifications</strong>
                    <button style={{ color: 'var(--primary-light)', fontSize: '.85rem' }} onClick={() => dispatch({ type: 'MARK_ALL_READ' })}>Mark all read</button>
                  </div>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {state.notifications.length === 0 ? (
                      <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No notifications</div>
                    ) : state.notifications.slice(0, 8).map(n => (
                      <div key={n.id} className={`notification-item ${n.read ? '' : 'unread'}`}>
                        <div style={{ fontSize: '1.2rem' }}>{n.type === 'success' ? '✅' : 'ℹ️'}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: n.read ? 400 : 600, fontSize: '.9rem' }}>{n.title}</div>
                          <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{n.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/wishlist" className="header-btn">❤️{state.wishlist.length > 0 && <span className="badge">{state.wishlist.length}</span>}</Link>
            <Link href="/cart" className="header-btn">🛒{cartCount > 0 && <span className="badge">{cartCount}</span>}</Link>
            {state.user ? (
              <Link href="/account" className="user-btn"><div className="avatar">{state.user.name?.charAt(0)}</div><span style={{ fontSize: '.85rem' }}>{state.user.name?.split(' ')[0]}</span></Link>
            ) : (
              <Link href="/login" className="btn btn-sm btn-primary">Sign In</Link>
            )}
          </div>
        </div>
      </header>
      <nav className="cat-nav">
        <div className="cat-nav-inner">
          <Link href="/">Home</Link>
          <Link href="/deals" style={{ color: 'var(--secondary)' }}>🔥 Deals</Link>
          {CATEGORIES.slice(0, 8).map(c => (
            <Link key={c.id} href={`/products?category=${c.id}`}>{c.icon} {c.name}</Link>
          ))}
          <Link href="/admin">🛡️ Admin</Link>
        </div>
      </nav>
    </>
  );
}
