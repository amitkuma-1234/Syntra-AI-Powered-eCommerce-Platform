/* ============================================
   ARKNETCH — State Management Store
   Handles: Cart, Wishlist, Auth, Orders, Notifications
   ============================================ */

const Store = {
  // ---- INITIALIZATION ----
  init() {
    this.cart = JSON.parse(localStorage.getItem('ark_cart') || '[]');
    this.wishlist = JSON.parse(localStorage.getItem('ark_wishlist') || '[]');
    this.user = JSON.parse(localStorage.getItem('ark_user') || 'null');
    this.orders = JSON.parse(localStorage.getItem('ark_orders') || '[]');
    this.recentlyViewed = JSON.parse(localStorage.getItem('ark_recent') || '[]');
    this.searchHistory = JSON.parse(localStorage.getItem('ark_search') || '[]');
    this.notifications = JSON.parse(localStorage.getItem('ark_notifs') || '[]');
    this.addresses = JSON.parse(localStorage.getItem('ark_addresses') || '[]');
    this.appliedCoupon = null;
  },
  _save(key, data) { localStorage.setItem('ark_' + key, JSON.stringify(data)); },

  // ---- CART ----
  addToCart(productId, qty = 1, color = '', size = '') {
    const existing = this.cart.find(i => i.productId === productId && i.color === color && i.size === size);
    if (existing) { existing.qty += qty; }
    else { this.cart.push({ productId, qty, color, size, savedForLater: false, addedAt: Date.now() }); }
    this._save('cart', this.cart);
    this.addNotification('Added to cart', `Item added to your cart successfully!`, 'success');
    document.dispatchEvent(new CustomEvent('cartUpdated'));
  },
  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.productId !== productId);
    this._save('cart', this.cart);
    document.dispatchEvent(new CustomEvent('cartUpdated'));
  },
  updateCartQty(productId, qty) {
    const item = this.cart.find(i => i.productId === productId);
    if (item) { item.qty = Math.max(1, qty); this._save('cart', this.cart); document.dispatchEvent(new CustomEvent('cartUpdated')); }
  },
  saveForLater(productId) {
    const item = this.cart.find(i => i.productId === productId);
    if (item) { item.savedForLater = !item.savedForLater; this._save('cart', this.cart); }
  },
  getActiveCart() { return this.cart.filter(i => !i.savedForLater); },
  getSavedItems() { return this.cart.filter(i => i.savedForLater); },
  getCartTotal() {
    return this.getActiveCart().reduce((sum, item) => {
      const p = getProduct(item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  },
  getCartCount() { return this.getActiveCart().reduce((sum, i) => sum + i.qty, 0); },
  clearCart() { this.cart = []; this._save('cart', this.cart); document.dispatchEvent(new CustomEvent('cartUpdated')); },
  applyCoupon(code) {
    const coupon = COUPONS.find(c => c.code === code.toUpperCase());
    if (!coupon) return { success: false, message: 'Invalid coupon code' };
    const total = this.getCartTotal();
    if (total < coupon.minOrder) return { success: false, message: `Minimum order ₹${coupon.minOrder} required` };
    this.appliedCoupon = coupon;
    return { success: true, message: coupon.description, discount: this.getCouponDiscount() };
  },
  getCouponDiscount() {
    if (!this.appliedCoupon) return 0;
    const total = this.getCartTotal();
    if (this.appliedCoupon.type === 'percent') return Math.min(total * this.appliedCoupon.discount / 100, this.appliedCoupon.maxDiscount);
    if (this.appliedCoupon.type === 'flat') return this.appliedCoupon.discount;
    return 0;
  },

  // ---- WISHLIST ----
  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    if (idx > -1) { this.wishlist.splice(idx, 1); }
    else { this.wishlist.push(productId); this.addNotification('Added to Wishlist', 'Item saved to your wishlist', 'info'); }
    this._save('wishlist', this.wishlist);
    document.dispatchEvent(new CustomEvent('wishlistUpdated'));
    return idx === -1;
  },
  isInWishlist(productId) { return this.wishlist.includes(productId); },

  // ---- AUTH ----
  register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('ark_users') || '[]');
    if (users.find(u => u.email === email)) return { success: false, message: 'Email already registered' };
    const user = { id: Date.now(), name, email, password, phone: '', avatar: name.charAt(0).toUpperCase(), joinedAt: Date.now() };
    users.push(user);
    localStorage.setItem('ark_users', JSON.stringify(users));
    this.user = user;
    this._save('user', this.user);
    this.addNotification('Welcome!', `Account created successfully. Welcome ${name}!`, 'success');
    document.dispatchEvent(new CustomEvent('authChanged'));
    return { success: true };
  },
  login(email, password) {
    const users = JSON.parse(localStorage.getItem('ark_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password' };
    this.user = user;
    this._save('user', this.user);
    this.addNotification('Welcome back!', `Logged in as ${user.name}`, 'success');
    document.dispatchEvent(new CustomEvent('authChanged'));
    return { success: true };
  },
  logout() {
    this.user = null;
    this._save('user', null);
    document.dispatchEvent(new CustomEvent('authChanged'));
  },
  updateProfile(data) {
    if (this.user) { Object.assign(this.user, data); this._save('user', this.user); }
  },
  isLoggedIn() { return !!this.user; },

  // ---- ADDRESSES ----
  addAddress(addr) {
    addr.id = Date.now();
    this.addresses.push(addr);
    this._save('addresses', this.addresses);
    return addr;
  },
  removeAddress(id) {
    this.addresses = this.addresses.filter(a => a.id !== id);
    this._save('addresses', this.addresses);
  },

  // ---- ORDERS ----
  placeOrder(addressId, paymentMethod) {
    const items = this.getActiveCart().map(item => {
      const p = getProduct(item.productId);
      return { ...item, name: p.name, price: p.price, image: p.image };
    });
    const order = {
      id: 'ARK' + Date.now().toString(36).toUpperCase(),
      items,
      total: this.getCartTotal() - this.getCouponDiscount(),
      discount: this.getCouponDiscount(),
      coupon: this.appliedCoupon?.code || null,
      addressId,
      paymentMethod,
      status: 'confirmed',
      statusHistory: [
        { status: 'confirmed', date: Date.now(), label: 'Order Confirmed' }
      ],
      placedAt: Date.now(),
      estimatedDelivery: Date.now() + (3 * 24 * 60 * 60 * 1000)
    };
    this.orders.unshift(order);
    this._save('orders', this.orders);
    this.clearCart();
    this.appliedCoupon = null;
    this.addNotification('Order Placed!', `Order ${order.id} confirmed successfully!`, 'success');
    // Simulate order progression
    setTimeout(() => this._updateOrderStatus(order.id, 'shipped', 'Order Shipped'), 5000);
    setTimeout(() => this._updateOrderStatus(order.id, 'out_for_delivery', 'Out for Delivery'), 15000);
    setTimeout(() => this._updateOrderStatus(order.id, 'delivered', 'Delivered'), 30000);
    return order;
  },
  _updateOrderStatus(orderId, status, label) {
    const order = this.orders.find(o => o.id === orderId);
    if (order && order.status !== 'delivered') {
      order.status = status;
      order.statusHistory.push({ status, date: Date.now(), label });
      this._save('orders', this.orders);
      this.addNotification('Order Update', `Order ${orderId}: ${label}`, 'info');
      document.dispatchEvent(new CustomEvent('orderUpdated'));
    }
  },
  getOrder(id) { return this.orders.find(o => o.id === id); },
  requestReturn(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'return_requested';
      order.statusHistory.push({ status: 'return_requested', date: Date.now(), label: 'Return Requested' });
      this._save('orders', this.orders);
      this.addNotification('Return Requested', `Return initiated for order ${orderId}`, 'info');
    }
  },

  // ---- RECENTLY VIEWED ----
  addRecentlyViewed(productId) {
    this.recentlyViewed = [productId, ...this.recentlyViewed.filter(id => id !== productId)].slice(0, 20);
    this._save('recent', this.recentlyViewed);
  },
  getRecentlyViewed() { return this.recentlyViewed.map(id => getProduct(id)).filter(Boolean).slice(0, 10); },

  // ---- SEARCH HISTORY ----
  addSearchHistory(query) {
    if (!query.trim()) return;
    this.searchHistory = [query, ...this.searchHistory.filter(q => q !== query)].slice(0, 10);
    this._save('search', this.searchHistory);
  },

  // ---- NOTIFICATIONS ----
  addNotification(title, message, type = 'info') {
    const notif = { id: Date.now(), title, message, type, read: false, createdAt: Date.now() };
    this.notifications.unshift(notif);
    if (this.notifications.length > 50) this.notifications = this.notifications.slice(0, 50);
    this._save('notifs', this.notifications);
    document.dispatchEvent(new CustomEvent('notification', { detail: notif }));
    document.dispatchEvent(new CustomEvent('notifCountChanged'));
  },
  markNotifRead(id) {
    const n = this.notifications.find(n => n.id === id);
    if (n) { n.read = true; this._save('notifs', this.notifications); }
  },
  markAllRead() {
    this.notifications.forEach(n => n.read = true);
    this._save('notifs', this.notifications);
  },
  getUnreadCount() { return this.notifications.filter(n => !n.read).length; },

  // ---- RECOMMENDATIONS ----
  getRecommendations(count = 8) {
    const viewedCats = [...new Set(this.recentlyViewed.map(id => { const p = getProduct(id); return p?.category; }).filter(Boolean))];
    let recs = [];
    if (viewedCats.length > 0) {
      recs = PRODUCTS.filter(p => viewedCats.includes(p.category) && !this.recentlyViewed.includes(p.id));
    }
    if (recs.length < count) {
      const more = PRODUCTS.filter(p => !recs.find(r => r.id === p.id) && !this.recentlyViewed.includes(p.id));
      recs = [...recs, ...more];
    }
    return recs.sort(() => Math.random() - 0.5).slice(0, count);
  },
  getFrequentlyBoughtTogether(productId) {
    const bundle = BUNDLES.find(b => b.products.includes(productId));
    if (bundle) return bundle.products.filter(id => id !== productId).map(id => getProduct(id)).filter(Boolean);
    return getRandomProducts(2, productId);
  }
};
