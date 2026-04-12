import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ cursor: 'default' }}>SYNTRA<span>.in</span></div>
            <p className="footer-desc">India&apos;s most innovative shopping destination. Discover millions of products with fast delivery and unbeatable prices.</p>
            <div className="footer-social">
              <a href="#" title="Facebook">📘</a>
              <a href="#" title="Twitter">🐦</a>
              <a href="#" title="Instagram">📸</a>
              <a href="#" title="YouTube">🎬</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <Link href="/products">All Products</Link>
            <Link href="/deals">Deals &amp; Offers</Link>
            <Link href="/products?category=electronics">Electronics</Link>
            <Link href="/products?category=fashion">Fashion</Link>
            <Link href="/products?category=home">Home &amp; Kitchen</Link>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link href="/account">My Account</Link>
            <Link href="/orders">My Orders</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/cart">Shopping Cart</Link>
            <Link href="/admin">Admin Panel</Link>
          </div>
          <div className="footer-col">
            <h4>Help &amp; Support</h4>
            <a href="#">Shipping Information</a>
            <a href="#">Return Policy</a>
            <a href="#">FAQ</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Syntra. Built with ❤️ and AI. All rights reserved.</span>
          <div className="footer-payments">💳 Visa • Mastercard • RuPay • UPI • Net Banking • COD</div>
        </div>
      </div>
    </footer>
  );
}
