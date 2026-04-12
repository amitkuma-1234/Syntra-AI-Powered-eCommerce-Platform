/* ============================================
   SYNTRA — App Router & Initialization
   ============================================ */

const App = {
  currentPage: '',

  init() {
    Store.init();
    this.renderHeader();
    this.bindEvents();
    this.handleRoute();
    Chatbot.init();
    UI.initScrollToTop();

    // Listen for custom events
    document.addEventListener('cartUpdated', () => this.updateCartBadge());
    document.addEventListener('notification', (e) => UI.showToast(e.detail.title, e.detail.message, e.detail.type));
    document.addEventListener('authChanged', () => { this.renderHeader(); this.updateCartBadge(); });
    document.addEventListener('notifCountChanged', () => this.updateNotifBadge());
    document.addEventListener('orderUpdated', () => { if (this.currentPage === 'orders') this.refreshPage(); });

    // Route changes
    window.addEventListener('hashchange', () => this.handleRoute());
  },

  renderHeader() {
    const user = Store.user;
    const notifCount = Store.getUnreadCount();

    document.getElementById('header-area').innerHTML = `
      <div class="promo-bar"><span>🎉 Welcome to Syntra — Use code <strong>WELCOME10</strong> for 10% off your first order! Free delivery on orders above ₹499 🚚</span></div>
      <header class="header">
        <div class="header-inner">
          <div class="logo" onclick="App.navigate('/')">SYNTRA<span>.in</span></div>
          <div class="search-bar">
            <input type="text" id="search-input" placeholder="Search for products, brands, and more..." autocomplete="off">
            <button class="voice-btn" id="voice-search-btn" title="Voice Search" onclick="App.startVoiceSearch()">🎤</button>
            <button onclick="App.doSearch()">🔍</button>
          </div>
          <div class="header-actions">
            <div style="position:relative">
              <button class="header-btn" id="notif-bell" onclick="App.toggleNotifications()">
                🔔${notifCount > 0 ? `<span class="badge" id="notif-badge">${notifCount}</span>` : ''}
              </button>
              <div class="notification-panel" id="notif-panel">
                <div class="notification-panel-header"><strong>Notifications</strong><button style="color:var(--primary-light);font-size:.85rem" onclick="Store.markAllRead();App.updateNotifBadge();App.toggleNotifications()">Mark all read</button></div>
                <div class="notification-list" id="notif-list"></div>
              </div>
            </div>
            <button class="header-btn" onclick="App.navigate('/wishlist')">❤️${Store.wishlist.length > 0 ? `<span class="badge">${Store.wishlist.length}</span>` : ''}</button>
            <button class="header-btn" onclick="App.navigate('/cart')">🛒<span class="badge" id="cart-badge" style="${Store.getCartCount() === 0 ? 'display:none' : ''}">${Store.getCartCount()}</span></button>
            ${user
              ? `<button class="user-menu-btn" onclick="App.navigate('/account')"><div class="avatar">${user.avatar}</div><span>${user.name.split(' ')[0]}</span></button>`
              : `<button class="btn btn-sm btn-primary" onclick="App.navigate('/login')">Sign In</button>`
            }
          </div>
        </div>
      </header>
      <nav class="cat-nav">
        <div class="cat-nav-inner">
          <a href="#" onclick="App.navigate('/');return false" class="${this.currentPage === '' ? 'active' : ''}">Home</a>
          <a href="#" onclick="App.navigate('/deals');return false" class="${this.currentPage === 'deals' ? 'active' : ''}" style="color:var(--secondary)">🔥 Deals</a>
          ${CATEGORIES.slice(0, 8).map(c => `<a href="#" onclick="App.navigate('/products?category=${c.id}');return false">${c.icon} ${c.name}</a>`).join('')}
          <a href="#" onclick="App.navigate('/seller');return false">🏪 Sell</a>
        </div>
      </nav>`;

    // Bind search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') App.doSearch(); });
      // Show search suggestions
      searchInput.addEventListener('input', () => this.showSearchSuggestions(searchInput.value));
      searchInput.addEventListener('focus', () => {
        if (searchInput.value) this.showSearchSuggestions(searchInput.value);
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
          const s = document.getElementById('search-suggestions');
          if (s) s.remove();
        }
      });
    }
  },

  showSearchSuggestions(query) {
    let el = document.getElementById('search-suggestions');
    if (!query || query.length < 2) { if (el) el.remove(); return; }
    const results = searchProducts(query).slice(0, 5);
    const history = Store.searchHistory.filter(h => h.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
    if (results.length === 0 && history.length === 0) { if (el) el.remove(); return; }

    if (!el) {
      el = document.createElement('div');
      el.id = 'search-suggestions';
      el.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:0 0 var(--radius-md) var(--radius-md);z-index:100;max-height:400px;overflow-y:auto;box-shadow:var(--shadow-lg)';
      document.querySelector('.search-bar').appendChild(el);
    }

    el.innerHTML = `
      ${history.length > 0 ? `<div style="padding:8px 16px;font-size:.75rem;color:var(--text-muted);text-transform:uppercase">Recent Searches</div>
      ${history.map(h => `<div style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:8px;transition:background .15s" onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background=''" onclick="document.getElementById('search-input').value='${h}';App.doSearch()">🕐 ${h}</div>`).join('')}` : ''}
      ${results.length > 0 ? `<div style="padding:8px 16px;font-size:.75rem;color:var(--text-muted);text-transform:uppercase;border-top:1px solid var(--border-color)">Products</div>
      ${results.map(p => `<div style="padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:background .15s" onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background=''" onclick="App.navigate('/product/${p.id}')">
        <img src="${p.image}" alt="" style="width:36px;height:36px;border-radius:4px;object-fit:cover">
        <div style="flex:1"><div style="font-size:.9rem">${p.name}</div><div style="font-size:.8rem;color:var(--text-muted)">${formatPrice(p.price)}</div></div>
      </div>`).join('')}` : ''}
    `;
  },

  doSearch() {
    const input = document.getElementById('search-input');
    const query = input?.value?.trim();
    if (!query) return;
    Store.addSearchHistory(query);
    const el = document.getElementById('search-suggestions');
    if (el) el.remove();
    this.navigate('/products?q=' + encodeURIComponent(query));
  },

  startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      UI.showToast('Not Supported', 'Voice search is not supported in this browser', 'warning');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;

    const btn = document.getElementById('voice-search-btn');
    btn.classList.add('listening');
    UI.showToast('Listening...', 'Speak now to search', 'info', 3000);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      document.getElementById('search-input').value = text;
      btn.classList.remove('listening');
      this.doSearch();
    };
    recognition.onerror = () => { btn.classList.remove('listening'); };
    recognition.onend = () => { btn.classList.remove('listening'); };
    recognition.start();
  },

  toggleNotifications() {
    const panel = document.getElementById('notif-panel');
    if (!panel) return;
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      const list = document.getElementById('notif-list');
      if (list) {
        list.innerHTML = Store.notifications.length === 0
          ? '<div style="padding:40px;text-align:center;color:var(--text-muted)">No notifications</div>'
          : Store.notifications.slice(0, 10).map(n => `
            <div class="notification-item ${n.read ? '' : 'unread'}" onclick="Store.markNotifRead(${n.id});this.classList.remove('unread')">
              <div style="font-size:1.2rem">${n.type === 'success' ? '✅' : n.type === 'error' ? '❌' : n.type === 'warning' ? '⚠️' : 'ℹ️'}</div>
              <div style="flex:1"><div style="font-weight:${n.read ? '400' : '600'};font-size:.9rem">${n.title}</div><div style="font-size:.8rem;color:var(--text-muted)">${n.message}</div><div style="font-size:.75rem;color:var(--text-muted);margin-top:4px">${UI.formatRelativeTime(n.createdAt)}</div></div>
            </div>
          `).join('');
      }
    }
  },

  updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = Store.getCartCount();
      badge.textContent = count;
      badge.style.display = count === 0 ? 'none' : 'flex';
      badge.style.animation = 'none';
      badge.offsetHeight; // trigger reflow
      badge.style.animation = 'badge-pop .3s ease';
    }
  },

  updateNotifBadge() {
    const badge = document.getElementById('notif-badge');
    const count = Store.getUnreadCount();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count === 0 ? 'none' : 'flex';
    }
  },

  navigate(path) {
    window.location.hash = '#' + path;
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString || '');
    const app = document.getElementById('app');

    // Close notifications panel
    const notifPanel = document.getElementById('notif-panel');
    if (notifPanel) notifPanel.classList.remove('open');

    // Route mapping
    let html = '';
    if (path === '/' || path === '') { this.currentPage = ''; html = Pages.home(); }
    else if (path === '/products') { this.currentPage = 'products'; html = Pages.products(params); }
    else if (path.startsWith('/product/')) { this.currentPage = 'product'; html = Pages.productDetail(path.split('/')[2]); }
    else if (path === '/cart') { this.currentPage = 'cart'; html = Pages.cart(); }
    else if (path === '/checkout') { this.currentPage = 'checkout'; html = Pages.checkout(); }
    else if (path === '/login') { this.currentPage = 'login'; html = Pages.login(); }
    else if (path === '/register') { this.currentPage = 'register'; html = Pages.register(); }
    else if (path === '/account') { this.currentPage = 'account'; html = Pages.account(); }
    else if (path === '/orders') { this.currentPage = 'orders'; html = Pages.orders(); }
    else if (path === '/wishlist') { this.currentPage = 'wishlist'; html = Pages.wishlist(); }
    else if (path === '/deals') { this.currentPage = 'deals'; html = Pages.deals(); }
    else if (path === '/seller') { this.currentPage = 'seller'; html = Pages.seller(); }
    else { html = `<div class="container"><div class="empty-state" style="padding:100px"><div class="empty-state-icon">🔍</div><h3>Page not found</h3><button class="btn btn-primary" onclick="App.navigate('/')">Go Home</button></div></div>`; }

    app.innerHTML = html;

    // Post-render
    this.renderHeader();
    UI.startDealTimers();
    UI.initScrollAnimations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  refreshPage() {
    this.handleRoute();
  },

  bindEvents() {
    // Close notifications on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#notif-bell') && !e.target.closest('#notif-panel')) {
        const panel = document.getElementById('notif-panel');
        if (panel) panel.classList.remove('open');
      }
    });
  }
};

// ---- FOOTER RENDERER ----
function renderFooter() {
  return `<footer class="footer"><div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo">SYNTRA<span>.in</span></div>
        <p class="footer-desc">India's most innovative shopping destination. Discover millions of products with fast delivery and unbeatable prices.</p>
        <div class="footer-social"><a href="#" title="Facebook">📘</a><a href="#" title="Twitter">🐦</a><a href="#" title="Instagram">📸</a><a href="#" title="YouTube">🎬</a></div>
      </div>
      <div class="footer-col"><h4>Shop</h4><a href="#" onclick="App.navigate('/products');return false">All Products</a><a href="#" onclick="App.navigate('/deals');return false">Deals</a><a href="#" onclick="App.navigate('/products?category=electronics');return false">Electronics</a><a href="#" onclick="App.navigate('/products?category=fashion');return false">Fashion</a><a href="#" onclick="App.navigate('/products?category=home');return false">Home</a></div>
      <div class="footer-col"><h4>Account</h4><a href="#" onclick="App.navigate('/account');return false">My Account</a><a href="#" onclick="App.navigate('/orders');return false">Orders</a><a href="#" onclick="App.navigate('/wishlist');return false">Wishlist</a><a href="#" onclick="App.navigate('/cart');return false">Cart</a></div>
      <div class="footer-col"><h4>Help</h4><a href="#">Customer Service</a><a href="#">Shipping Info</a><a href="#">Returns</a><a href="#">FAQ</a><a href="#" onclick="App.navigate('/seller');return false">Sell on Syntra</a></div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Syntra. All rights reserved.</span>
      <div class="footer-payments">💳 Visa • Mastercard • UPI • Net Banking • COD</div>
    </div>
  </div></footer>`;
}

// ---- START APP ----
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
