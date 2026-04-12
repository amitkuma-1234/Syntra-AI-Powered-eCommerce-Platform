'use client';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { getStars, formatPrice } from '@/lib/data';

export default function ProductCard({ product }) {
  const { state, dispatch } = useStore();
  const inWishlist = state.wishlist.includes(product.id);

  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`}>
        <div className="product-card-img">
          <img src={product.image} alt={product.name} loading="lazy" />
          {product.discount > 0 && <span className="product-card-badge">{product.discount}% OFF</span>}
        </div>
      </Link>
      <button
        className={`product-card-wish ${inWishlist ? 'active' : ''}`}
        onClick={(e) => { e.stopPropagation(); dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id }); }}
      >
        {inWishlist ? '❤️' : '🤍'}
      </button>
      <Link href={`/product/${product.id}`}>
        <div className="product-card-body">
          <div className="product-card-brand">{product.brand}</div>
          <div className="product-card-title">{product.name}</div>
          <div className="product-card-rating">
            <span className="stars">{getStars(product.rating)}</span>
            <span className="rating-count">({product.reviewCount?.toLocaleString()})</span>
          </div>
          <div className="product-card-price">
            <span className="price-current">{formatPrice(product.price)}</span>
            {product.originalPrice && <span className="price-original">{formatPrice(product.originalPrice)}</span>}
            {product.discount > 0 && <span className="price-discount">{product.discount}% off</span>}
          </div>
          {product.freeDelivery && <div className="product-card-delivery">🚚 FREE Delivery</div>}
        </div>
      </Link>
    </div>
  );
}
