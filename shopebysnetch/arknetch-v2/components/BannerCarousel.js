'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { BANNERS } from '@/lib/data';

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % BANNERS.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + BANNERS.length) % BANNERS.length), []);
  const goTo = useCallback((i) => setCurrent(i), []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  return (
    <div
      className="banner-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="banner-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {BANNERS.map((b) => (
          <div
            key={b.id}
            className="banner-slide"
            style={{ background: b.gradient, backgroundImage: `url(${b.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="banner-content">
              <h2>{b.title}</h2>
              <p>{b.subtitle}</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link href={`/products?category=${b.category}`} className="btn btn-primary btn-lg">{b.cta} →</Link>
                <Link href="/deals" className="btn btn-outline btn-lg">View Deals 🔥</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="banner-arrow left" onClick={prev} aria-label="Previous">‹</button>
      <button className="banner-arrow right" onClick={next} aria-label="Next">›</button>
      <div className="banner-dots">
        {BANNERS.map((_, i) => (
          <button key={i} className={`banner-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
