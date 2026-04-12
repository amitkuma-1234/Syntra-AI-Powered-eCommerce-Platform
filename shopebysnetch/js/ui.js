/* ============================================
   ARKNETCH — UI Utilities
   Modals, Toasts, Components, Helpers
   ============================================ */

const UI = {
  // ---- TOAST NOTIFICATIONS ----
  showToast(title, message, type = 'info', duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) { container = document.createElement('div'); container.id = 'toast-container'; container.className = 'toast-container'; document.body.appendChild(container); }
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><div class="toast-body"><div class="toast-title">${title}</div><div class="toast-text">${message}</div></div><span class="toast-close" onclick="this.parentElement.classList.add('toast-exit');setTimeout(()=>this.parentElement.remove(),300)">✕</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('toast-exit'); setTimeout(() => toast.remove(), 300); }, duration);
  },

  // ---- MODAL ----
  showModal(title, content, actions = '') {
    let backdrop = document.getElementById('modal-backdrop');
    if (backdrop) backdrop.remove();
    backdrop = document.createElement('div');
    backdrop.id = 'modal-backdrop';
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `<div class="modal"><div class="modal-header"><h3>${title}</h3><button class="modal-close" onclick="UI.closeModal()">✕</button></div><div class="modal-body">${content}</div>${actions ? `<div class="modal-actions" style="margin-top:20px;display:flex;gap:12px;justify-content:flex-end">${actions}</div>` : ''}</div>`;
    document.body.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.classList.add('open'));
    backdrop.addEventListener('click', e => { if (e.target === backdrop) UI.closeModal(); });
  },
  closeModal() {
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) { backdrop.classList.remove('open'); setTimeout(() => backdrop.remove(), 300); }
  },

  // ---- PRODUCT CARD HTML ----
  productCard(product) {
    const inWishlist = Store.isInWishlist(product.id);
    return `<div class="product-card" onclick="App.navigate('/product/${product.id}')" data-product-id="${product.id}">
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
        ${product.discount ? `<span class="product-card-badge">${product.discount}% OFF</span>` : ''}
        <button class="product-card-wish ${inWishlist ? 'active' : ''}" onclick="event.stopPropagation();Store.toggleWishlist(${product.id});App.refreshPage();" title="Add to Wishlist">${inWishlist ? '❤️' : '🤍'}</button>
      </div>
      <div class="product-card-body">
        <div class="product-card-brand">${product.brand}</div>
        <div class="product-card-title">${product.name}</div>
        <div class="product-card-rating"><span class="stars">${getStarsHTML(product.rating)}</span><span class="rating-count">(${product.reviewCount.toLocaleString()})</span></div>
        <div class="product-card-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
          ${product.discount ? `<span class="price-discount">${product.discount}% off</span>` : ''}
        </div>
        ${product.freeDelivery ? '<div class="product-card-delivery">🚚 FREE Delivery</div>' : ''}
      </div>
    </div>`;
  },

  // ---- PRODUCT GRID ----
  productGrid(products, columns = 4) {
    if (!products.length) return `<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>No products found</h3><p>Try adjusting your search or filters</p></div>`;
    return `<div class="grid grid-${columns}">${products.map(p => UI.productCard(p)).join('')}</div>`;
  },

  // ---- CATEGORY CARD ----
  categoryCard(cat) {
    return `<div class="cat-card" onclick="App.navigate('/products?category=${cat.id}')">
      <div class="cat-card-icon">${cat.icon}</div>
      <div class="cat-card-name">${cat.name}</div>
      <div class="cat-card-count">${getProductsByCategory(cat.id).length} items</div>
    </div>`;
  },

  // ---- DEAL CARD ----
  dealCard(deal) {
    const product = getProduct(deal.productId);
    if (!product) return '';
    const pct = Math.round(deal.claimed / deal.total * 100);
    return `<div class="product-card" onclick="App.navigate('/product/${product.id}')">
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
        <span class="product-card-badge">${deal.label}</span>
      </div>
      <div class="product-card-body">
        <div class="product-card-title">${product.name}</div>
        <div class="product-card-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          <span class="price-original">${formatPrice(product.originalPrice)}</span>
          <span class="price-discount">${product.discount}% off</span>
        </div>
        <div class="deal-progress"><div class="deal-progress-bar" style="width:${pct}%"></div></div>
        <div style="font-size:.8rem;color:var(--text-muted);margin-top:4px">${pct}% claimed</div>
        <div class="deal-timer" data-ends="${deal.endsIn}" id="deal-timer-${deal.id}"></div>
      </div>
    </div>`;
  },

  // ---- REVIEW CARD ----
  reviewCard(review) {
    return `<div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${review.userName.charAt(0)}</div>
        <div><div class="review-name">${review.userName}</div><div class="review-date">${review.date}</div></div>
        <div class="stars" style="margin-left:auto">${getStarsHTML(review.rating)}</div>
      </div>
      <div class="review-title">${review.title}</div>
      <div class="review-text">${review.comment}</div>
      <div class="review-helpful">👍 ${review.helpful} people found this helpful
        <button class="btn btn-sm btn-secondary" style="margin-left:12px" onclick="this.textContent='Helpful +1';this.disabled=true">Helpful</button>
      </div>
    </div>`;
  },

  // ---- DEAL TIMERS ----
  startDealTimers() {
    DEALS.forEach(deal => {
      const el = document.getElementById(`deal-timer-${deal.id}`);
      if (!el) return;
      let remaining = deal.endsIn;
      const update = () => {
        if (remaining <= 0) { el.innerHTML = '<span style="color:var(--error)">Expired</span>'; return; }
        const h = Math.floor(remaining / 3600), m = Math.floor((remaining % 3600) / 60), s = remaining % 60;
        el.innerHTML = `<div class="deal-timer-unit"><div class="deal-timer-num">${String(h).padStart(2,'0')}</div><div class="deal-timer-label">HRS</div></div>
          <div class="deal-timer-unit"><div class="deal-timer-num">${String(m).padStart(2,'0')}</div><div class="deal-timer-label">MIN</div></div>
          <div class="deal-timer-unit"><div class="deal-timer-num">${String(s).padStart(2,'0')}</div><div class="deal-timer-label">SEC</div></div>`;
        remaining--;
      };
      update();
      setInterval(update, 1000);
    });
  },

  // ---- SCROLL ANIMATIONS ----
  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('animate-in'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section').forEach(el => observer.observe(el));
  },

  // ---- SCROLL TO TOP ----
  initScrollToTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  // ---- SKELETON LOADING ----
  skeleton(count = 4) {
    let html = '<div class="grid grid-4">';
    for (let i = 0; i < count; i++) {
      html += `<div class="product-card"><div class="skeleton skeleton-img"></div><div style="padding:16px"><div class="skeleton skeleton-text"></div><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-text" style="width:50%"></div></div></div>`;
    }
    return html + '</div>';
  },

  // ---- QUANTITY SELECTOR ----
  qtySelector(productId, currentQty) {
    return `<div class="pd-qty">
      <button onclick="event.stopPropagation();Store.updateCartQty(${productId},${currentQty - 1});App.refreshPage()">−</button>
      <span>${currentQty}</span>
      <button onclick="event.stopPropagation();Store.updateCartQty(${productId},${currentQty + 1});App.refreshPage()">+</button>
    </div>`;
  },

  // ---- FORMAT DATE ----
  formatDate(ts) {
    return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },
  formatRelativeTime(ts) {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    return Math.floor(diff / 86400000) + 'd ago';
  }
};
