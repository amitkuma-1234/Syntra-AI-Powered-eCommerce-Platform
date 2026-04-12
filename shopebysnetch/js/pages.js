/* ============================================
   ARKNETCH — Page Renderers
   All page views for the SPA
   ============================================ */

const Pages = {
  // ================ HOME PAGE ================
  home() {
    const banner = BANNERS[Math.floor(Math.random() * BANNERS.length)];
    const recs = Store.getRecommendations(8);
    const trending = [...PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
    const recent = Store.getRecentlyViewed();
    const dealProducts = DEALS.slice(0, 4);

    return `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="text-gradient">${banner.title}</h1>
          <p>${banner.subtitle}</p>
          <div class="flex" style="gap:16px">
            <button class="btn btn-primary btn-lg" onclick="App.navigate('/products?category=${banner.category}')">${banner.cta} →</button>
            <button class="btn btn-outline btn-lg" onclick="App.navigate('/deals')">View Deals 🔥</button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-cards">
            ${PRODUCTS.slice(0, 4).map(p => `
              <div class="hero-card" onclick="App.navigate('/product/${p.id}')">
                <div class="hero-card-icon"><img src="${p.image}" alt="" style="width:60px;height:60px;border-radius:8px;object-fit:cover;margin:0 auto"></div>
                <div class="hero-card-title">${p.name.split(' ').slice(0, 3).join(' ')}</div>
                <div class="hero-card-price">${formatPrice(p.price)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <!-- Categories -->
      <section class="section">
        <div class="section-header"><h2>🏷️ Shop by Category</h2><a href="#" onclick="App.navigate('/products');return false">View All →</a></div>
        <div class="grid grid-5">${CATEGORIES.map(c => UI.categoryCard(c)).join('')}</div>
      </section>

      <!-- Lightning Deals -->
      <section class="section">
        <div class="section-header"><h2>⚡ Lightning Deals</h2><a href="#" onclick="App.navigate('/deals');return false">View All Deals →</a></div>
        <div class="grid grid-4">${dealProducts.map(d => UI.dealCard(d)).join('')}</div>
      </section>

      <!-- Recommended -->
      <section class="section">
        <div class="section-header"><h2>⭐ Recommended for You</h2></div>
        ${UI.productGrid(recs, 4)}
      </section>

      <!-- Trending -->
      <section class="section">
        <div class="section-header"><h2>🔥 Trending Now</h2></div>
        ${UI.productGrid(trending, 4)}
      </section>

      ${recent.length > 0 ? `<section class="section">
        <div class="section-header"><h2>👀 Recently Viewed</h2></div>
        ${UI.productGrid(recent.slice(0, 4), 4)}
      </section>` : ''}

      <!-- Prime Banner -->
      <section class="section">
        <div class="deals-banner" style="background:var(--gradient-primary)">
          <h2 style="color:#fff;margin-bottom:8px">✨ Arknetch Prime</h2>
          <p style="color:rgba(255,255,255,0.9);margin-bottom:20px">Get FREE same-day delivery, exclusive deals, and more!</p>
          <button class="btn btn-lg" style="background:#fff;color:var(--primary);font-weight:700" onclick="UI.showToast('Coming Soon','Prime membership launching soon!','info')">Try Prime Free →</button>
        </div>
      </section>
    </div>`;
  },

  // ================ PRODUCTS PAGE ================
  products(params) {
    const category = params.get('category') || '';
    const query = params.get('q') || '';
    let filtered = [...PRODUCTS];

    if (category) filtered = filtered.filter(p => p.category === category);
    if (query) filtered = searchProducts(query);

    const catName = category ? CATEGORIES.find(c => c.id === category)?.name || 'Products' : (query ? `Search: "${query}"` : 'All Products');

    return `<div class="container">
      <div class="products-page">
        <aside class="filter-panel">
          <h3 style="margin-bottom:20px">Filters</h3>
          <div class="filter-group">
            <h4>Category</h4>
            ${CATEGORIES.map(c => `<label class="filter-option"><input type="checkbox" ${category === c.id ? 'checked' : ''} onchange="App.navigate('/products'+(this.checked?'?category=${c.id}':''))"> ${c.name} (${getProductsByCategory(c.id).length})</label>`).join('')}
          </div>
          <div class="filter-group">
            <h4>Price Range</h4>
            <div class="price-range">
              <input type="number" placeholder="Min" id="price-min" style="width:48%">
              <span>-</span>
              <input type="number" placeholder="Max" id="price-max" style="width:48%">
            </div>
            <button class="btn btn-sm btn-secondary" style="margin-top:8px;width:100%" onclick="Pages.applyPriceFilter()">Apply</button>
          </div>
          <div class="filter-group">
            <h4>Rating</h4>
            ${[4,3,2,1].map(r => `<label class="filter-option"><input type="checkbox" onchange="Pages.filterByRating(${r})"> <span class="stars">${getStarsHTML(r)}</span> & up</label>`).join('')}
          </div>
          <div class="filter-group">
            <h4>Brand</h4>
            ${BRANDS.map(b => `<label class="filter-option"><input type="checkbox"> ${b}</label>`).join('')}
          </div>
          <button class="btn btn-outline btn-sm" style="width:100%" onclick="App.navigate('/products')">Clear All Filters</button>
        </aside>
        <div>
          <div class="sort-bar">
            <div><h2 style="font-size:1.3rem">${catName}</h2><span style="color:var(--text-muted);font-size:.9rem">${filtered.length} products</span></div>
            <select id="sort-select" onchange="Pages.sortProducts(this.value)">
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
          <div id="products-grid">${UI.productGrid(filtered, 3)}</div>
        </div>
      </div>
    </div>`;
  },

  sortProducts(sortBy) {
    const category = new URLSearchParams(location.hash.split('?')[1] || '').get('category') || '';
    let filtered = category ? getProductsByCategory(category) : [...PRODUCTS];
    switch(sortBy) {
      case 'price-low': filtered.sort((a,b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a,b) => b.price - a.price); break;
      case 'rating': filtered.sort((a,b) => b.rating - a.rating); break;
      case 'discount': filtered.sort((a,b) => b.discount - a.discount); break;
      case 'newest': filtered.sort((a,b) => b.id - a.id); break;
      default: filtered.sort((a,b) => b.reviewCount - a.reviewCount);
    }
    document.getElementById('products-grid').innerHTML = UI.productGrid(filtered, 3);
  },

  applyPriceFilter() {
    const min = parseInt(document.getElementById('price-min')?.value) || 0;
    const max = parseInt(document.getElementById('price-max')?.value) || Infinity;
    const filtered = PRODUCTS.filter(p => p.price >= min && p.price <= max);
    document.getElementById('products-grid').innerHTML = UI.productGrid(filtered, 3);
  },

  filterByRating(minRating) {
    const filtered = PRODUCTS.filter(p => p.rating >= minRating);
    document.getElementById('products-grid').innerHTML = UI.productGrid(filtered, 3);
  },

  // ================ PRODUCT DETAIL ================
  productDetail(id) {
    const p = getProduct(parseInt(id));
    if (!p) return '<div class="container"><div class="empty-state"><div class="empty-state-icon">😕</div><h3>Product not found</h3><button class="btn btn-primary" onclick="App.navigate(\'/products\')">Browse Products</button></div></div>';

    Store.addRecentlyViewed(p.id);
    const related = getRelatedProducts(p);
    const fbt = Store.getFrequentlyBoughtTogether(p.id);
    const reviews = SAMPLE_REVIEWS.slice(0, 3);
    const inWishlist = Store.isInWishlist(p.id);

    return `<div class="container">
      <div style="padding:12px 0;font-size:.9rem;color:var(--text-muted)">
        <a href="#" onclick="App.navigate('/');return false">Home</a> › <a href="#" onclick="App.navigate('/products?category=${p.category}');return false">${CATEGORIES.find(c => c.id === p.category)?.name}</a> › ${p.name}
      </div>
      <div class="product-detail">
        <div class="pd-gallery">
          <div class="pd-main-img" id="pd-main-img"><img src="${p.images[0] || p.image}" alt="${p.name}" id="pd-img"></div>
          <div class="pd-thumbs">
            ${(p.images.length > 0 ? p.images : [p.image]).map((img, i) => `<div class="pd-thumb ${i === 0 ? 'active' : ''}" onclick="document.getElementById('pd-img').src='${img}';document.querySelectorAll('.pd-thumb').forEach(t=>t.classList.remove('active'));this.classList.add('active')"><img src="${img}" alt=""></div>`).join('')}
          </div>
        </div>
        <div class="pd-info">
          <div class="pd-brand">${p.brand}</div>
          <h1>${p.name}</h1>
          <div class="pd-rating">
            <span class="stars" style="font-size:1.1rem">${getStarsHTML(p.rating)}</span>
            <span style="font-weight:600">${p.rating}</span>
            <span style="color:var(--text-muted)">(${p.reviewCount.toLocaleString()} reviews)</span>
          </div>
          <div class="pd-price-box">
            <span class="pd-price">${formatPrice(p.price)}</span>
            ${p.originalPrice ? `<span class="pd-original-price">${formatPrice(p.originalPrice)}</span>` : ''}
            ${p.discount ? `<span class="pd-discount-badge">${p.discount}% OFF</span>` : ''}
            ${p.originalPrice ? `<div style="color:var(--success);font-size:.9rem;margin-top:8px">You save ${formatPrice(p.originalPrice - p.price)}</div>` : ''}
            <div class="pd-delivery">🚚 ${p.freeDelivery ? 'FREE Delivery' : 'Standard Delivery'} — Get it by <strong>${new Date(Date.now() + p.deliveryDays * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</strong></div>
          </div>

          ${p.colors && p.colors.length > 0 ? `<div class="pd-options"><div class="pd-option-label">Color</div><div class="pd-colors">${p.colors.map((c, i) => `<div class="pd-color ${i === 0 ? 'active' : ''}" style="background:${c}" onclick="document.querySelectorAll('.pd-color').forEach(e=>e.classList.remove('active'));this.classList.add('active')" title="${c}"></div>`).join('')}</div></div>` : ''}

          ${p.sizes ? `<div class="pd-options"><div class="pd-option-label">Size</div><div class="pd-sizes">${p.sizes.map((s, i) => `<div class="pd-size ${i === 0 ? 'active' : ''}" onclick="document.querySelectorAll('.pd-size').forEach(e=>e.classList.remove('active'));this.classList.add('active')">${s}</div>`).join('')}</div></div>` : ''}

          <div class="pd-actions">
            <button class="btn btn-cart btn-lg" onclick="Store.addToCart(${p.id});UI.showToast('Added to Cart','${p.name.replace(/'/g, "\\'")} added!','success')">🛒 Add to Cart</button>
            <button class="btn btn-primary btn-lg" onclick="Store.addToCart(${p.id});App.navigate('/checkout')">⚡ Buy Now</button>
            <button class="btn btn-icon btn-secondary" style="font-size:1.3rem" onclick="Store.toggleWishlist(${p.id});App.refreshPage()" title="Wishlist">${inWishlist ? '❤️' : '🤍'}</button>
          </div>

          <div class="pd-features"><h3 style="margin-bottom:12px">Key Features</h3><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul></div>

          <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:16px;margin-bottom:16px">
            <div style="font-size:.85rem;color:var(--text-muted)">Seller: <strong style="color:var(--text-primary)">${p.seller}</strong></div>
            <div style="font-size:.85rem;color:${p.inStock ? 'var(--success)' : 'var(--error)'};margin-top:4px">${p.inStock ? `✅ In Stock (${p.stockCount} available)` : '❌ Out of Stock'}</div>
          </div>
        </div>
      </div>

      <!-- Tabs: Description, Specs, Reviews -->
      <div class="pd-tabs">
        <div class="pd-tab-btns">
          <button class="pd-tab-btn active" onclick="Pages.switchTab(this,'tab-desc')">Description</button>
          <button class="pd-tab-btn" onclick="Pages.switchTab(this,'tab-specs')">Specifications</button>
          <button class="pd-tab-btn" onclick="Pages.switchTab(this,'tab-reviews')">Reviews (${p.reviewCount})</button>
        </div>
        <div id="tab-desc"><p style="color:var(--text-secondary);line-height:1.8">${p.description}</p></div>
        <div id="tab-specs" class="hidden">
          <table class="data-table">${Object.entries(p.specs).map(([k, v]) => `<tr><td style="font-weight:600;width:200px">${k}</td><td>${v}</td></tr>`).join('')}</table>
        </div>
        <div id="tab-reviews" class="hidden">${reviews.map(r => UI.reviewCard(r)).join('')}</div>
      </div>

      <!-- Frequently Bought Together -->
      ${fbt.length > 0 ? `<section class="section">
        <div class="section-header"><h2>🔗 Frequently Bought Together</h2></div>
        <div class="flex" style="gap:24px;flex-wrap:wrap;align-items:stretch">
          <div class="product-card" style="width:200px;flex-shrink:0" onclick="App.navigate('/product/${p.id}')">
            <div class="product-card-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
            <div class="product-card-body"><div class="product-card-title" style="font-size:.85rem">${p.name}</div><div class="price-current">${formatPrice(p.price)}</div></div>
          </div>
          ${fbt.map(fp => `<div style="display:flex;align-items:center;font-size:1.5rem;color:var(--text-muted)">+</div>
          <div class="product-card" style="width:200px;flex-shrink:0" onclick="App.navigate('/product/${fp.id}')">
            <div class="product-card-img"><img src="${fp.image}" alt="${fp.name}" loading="lazy"></div>
            <div class="product-card-body"><div class="product-card-title" style="font-size:.85rem">${fp.name}</div><div class="price-current">${formatPrice(fp.price)}</div></div>
          </div>`).join('')}
          <div style="display:flex;align-items:center">
            <button class="btn btn-primary" onclick="${[p.id, ...fbt.map(f => f.id)].map(id => `Store.addToCart(${id})`).join(';')};UI.showToast('Bundle Added','All items added to cart!','success')">Add All — ${formatPrice(p.price + fbt.reduce((s, f) => s + f.price, 0))}</button>
          </div>
        </div>
      </section>` : ''}

      <!-- Related Products -->
      ${related.length > 0 ? `<section class="section">
        <div class="section-header"><h2>🛍️ Related Products</h2></div>
        ${UI.productGrid(related, 4)}
      </section>` : ''}
    </div>`;
  },

  switchTab(btn, tabId) {
    document.querySelectorAll('.pd-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[id^="tab-"]').forEach(t => t.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
  },

  // ================ CART PAGE ================
  cart() {
    const items = Store.getActiveCart();
    const saved = Store.getSavedItems();
    if (items.length === 0 && saved.length === 0) {
      return `<div class="container"><div class="empty-state" style="padding:100px 24px"><div class="empty-state-icon">🛒</div><h2>Your cart is empty</h2><p>Add some items to get started!</p><button class="btn btn-primary btn-lg" onclick="App.navigate('/products')">Start Shopping</button></div></div>`;
    }
    const total = Store.getCartTotal();
    const discount = Store.getCouponDiscount();

    return `<div class="container">
      <h2 style="padding:24px 0">🛒 Shopping Cart (${Store.getCartCount()} items)</h2>
      <div class="cart-page">
        <div>
          ${items.map(item => {
            const p = getProduct(item.productId);
            if (!p) return '';
            return `<div class="cart-item">
              <div class="cart-item-img" onclick="App.navigate('/product/${p.id}')"><img src="${p.image}" alt="${p.name}"></div>
              <div class="cart-item-info">
                <div class="cart-item-title" onclick="App.navigate('/product/${p.id}')" style="cursor:pointer">${p.name}</div>
                <div class="cart-item-brand">${p.brand}${item.color ? ` • ${item.color}` : ''}${item.size ? ` • Size: ${item.size}` : ''}</div>
                <div class="product-card-price"><span class="price-current">${formatPrice(p.price)}</span>${p.originalPrice ? `<span class="price-original">${formatPrice(p.originalPrice)}</span><span class="price-discount">${p.discount}% off</span>` : ''}</div>
                <div class="cart-item-actions">
                  ${UI.qtySelector(p.id, item.qty)}
                  <button class="btn btn-sm btn-secondary" onclick="Store.saveForLater(${p.id});App.refreshPage()">Save for Later</button>
                  <button class="btn btn-sm btn-secondary" style="color:var(--error)" onclick="Store.removeFromCart(${p.id});App.refreshPage()">🗑️ Remove</button>
                </div>
              </div>
              <div style="font-weight:700;font-size:1.1rem;white-space:nowrap">${formatPrice(p.price * item.qty)}</div>
            </div>`;
          }).join('')}

          ${saved.length > 0 ? `<h3 style="margin:24px 0 16px">Saved for Later (${saved.length})</h3>
          ${saved.map(item => {
            const p = getProduct(item.productId);
            if (!p) return '';
            return `<div class="cart-item" style="opacity:.7">
              <div class="cart-item-img"><img src="${p.image}" alt="${p.name}"></div>
              <div class="cart-item-info">
                <div class="cart-item-title">${p.name}</div>
                <div class="price-current">${formatPrice(p.price)}</div>
                <div class="cart-item-actions" style="margin-top:8px">
                  <button class="btn btn-sm btn-primary" onclick="Store.saveForLater(${p.id});App.refreshPage()">Move to Cart</button>
                  <button class="btn btn-sm btn-secondary" style="color:var(--error)" onclick="Store.removeFromCart(${p.id});App.refreshPage()">Remove</button>
                </div>
              </div>
            </div>`;
          }).join('')}` : ''}
        </div>
        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="cart-summary-row"><span>Subtotal (${Store.getCartCount()} items)</span><span>${formatPrice(total)}</span></div>
          <div class="cart-summary-row"><span>Shipping</span><span style="color:var(--success)">FREE</span></div>
          ${discount > 0 ? `<div class="cart-summary-row"><span>Coupon Discount</span><span style="color:var(--success)">-${formatPrice(discount)}</span></div>` : ''}
          <div class="cart-summary-total"><span>Total</span><span>${formatPrice(total - discount)}</span></div>
          <div style="margin:16px 0">
            <div class="flex" style="gap:8px"><input type="text" id="coupon-input" placeholder="Coupon code" style="flex:1"><button class="btn btn-sm btn-secondary" onclick="Pages.applyCoupon()">Apply</button></div>
            <div id="coupon-msg" style="font-size:.85rem;margin-top:6px"></div>
          </div>
          <button class="btn btn-primary btn-lg" style="width:100%" onclick="App.navigate('/checkout')">Proceed to Checkout →</button>
          <div style="text-align:center;margin-top:12px;font-size:.85rem;color:var(--text-muted)">🔒 Secured by SSL encryption</div>
        </div>
      </div>
    </div>`;
  },

  applyCoupon() {
    const code = document.getElementById('coupon-input')?.value;
    if (!code) return;
    const result = Store.applyCoupon(code);
    const msg = document.getElementById('coupon-msg');
    if (msg) {
      msg.style.color = result.success ? 'var(--success)' : 'var(--error)';
      msg.textContent = result.message;
    }
    if (result.success) App.refreshPage();
  },

  // ================ CHECKOUT ================
  checkout() {
    const items = Store.getActiveCart();
    if (items.length === 0) return `<div class="container"><div class="empty-state"><div class="empty-state-icon">🛒</div><h3>Nothing to checkout</h3><button class="btn btn-primary" onclick="App.navigate('/products')">Shop Now</button></div></div>`;

    const total = Store.getCartTotal();
    const discount = Store.getCouponDiscount();

    return `<div class="container">
      <div class="checkout-steps">
        <div class="checkout-step active"><div class="step-num">1</div>Address</div>
        <div class="checkout-step"><div class="step-num">2</div>Payment</div>
        <div class="checkout-step"><div class="step-num">3</div>Confirm</div>
      </div>
      <div class="checkout-page">
        <div>
          <div class="checkout-section" id="checkout-address">
            <h3>📍 Delivery Address</h3>
            ${Store.addresses.length > 0 ? Store.addresses.map((a, i) => `
              <div class="payment-option ${i === 0 ? 'selected' : ''}" onclick="document.querySelectorAll('#checkout-address .payment-option').forEach(e=>e.classList.remove('selected'));this.classList.add('selected');this.querySelector('input').checked=true">
                <input type="radio" name="address" value="${a.id}" ${i === 0 ? 'checked' : ''}>
                <div><strong>${a.name}</strong><br><span style="color:var(--text-muted)">${a.line1}, ${a.city}, ${a.state} - ${a.pin}</span><br><span style="color:var(--text-muted)">📞 ${a.phone}</span></div>
              </div>
            `).join('') : ''}
            <button class="btn btn-outline btn-sm" style="margin-top:12px" onclick="Pages.showAddressForm()">+ Add New Address</button>
            <div id="address-form-area"></div>
          </div>
          <div class="checkout-section">
            <h3>💳 Payment Method</h3>
            ${['Credit/Debit Card 💳','UPI (GPay, PhonePe) 📱','Net Banking 🏦','Digital Wallet 👛','Cash on Delivery 💵'].map((method, i) => `
              <div class="payment-option ${i === 0 ? 'selected' : ''}" onclick="document.querySelectorAll('.checkout-section:nth-child(2) .payment-option').forEach(e=>e.classList.remove('selected'));this.classList.add('selected');this.querySelector('input').checked=true">
                <input type="radio" name="payment" value="${method.split(' ')[0].toLowerCase()}" ${i === 0 ? 'checked' : ''}>
                <span>${method}</span>
              </div>
            `).join('')}
          </div>
          <div class="checkout-section">
            <h3>📦 Order Items</h3>
            ${items.map(item => {
              const p = getProduct(item.productId);
              return p ? `<div class="order-item"><div class="order-item-img"><img src="${p.image}" alt=""></div><div style="flex:1"><div style="font-weight:500">${p.name}</div><div style="color:var(--text-muted);font-size:.85rem">Qty: ${item.qty}</div></div><div style="font-weight:600">${formatPrice(p.price * item.qty)}</div></div>` : '';
            }).join('')}
          </div>
        </div>
        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="cart-summary-row"><span>Subtotal</span><span>${formatPrice(total)}</span></div>
          <div class="cart-summary-row"><span>Shipping</span><span style="color:var(--success)">FREE</span></div>
          ${discount > 0 ? `<div class="cart-summary-row"><span>Discount</span><span style="color:var(--success)">-${formatPrice(discount)}</span></div>` : ''}
          <div class="cart-summary-total"><span>Total</span><span>${formatPrice(total - discount)}</span></div>
          <button class="btn btn-primary btn-lg" style="width:100%;margin-top:16px" onclick="Pages.placeOrder()">🔒 Place Order</button>
        </div>
      </div>
    </div>`;
  },

  showAddressForm() {
    const area = document.getElementById('address-form-area');
    if (!area) return;
    area.innerHTML = `<div style="margin-top:16px;padding:20px;border:1px solid var(--border-color);border-radius:var(--radius-md)">
      <div class="form-row"><div class="form-group"><label>Full Name</label><input type="text" id="addr-name" placeholder="Your name"></div><div class="form-group"><label>Phone</label><input type="text" id="addr-phone" placeholder="10-digit phone"></div></div>
      <div class="form-group"><label>Address Line</label><input type="text" id="addr-line" placeholder="House no., Street, Area"></div>
      <div class="form-row"><div class="form-group"><label>City</label><input type="text" id="addr-city" placeholder="City"></div><div class="form-group"><label>State</label><input type="text" id="addr-state" placeholder="State"></div></div>
      <div class="form-group" style="max-width:200px"><label>PIN Code</label><input type="text" id="addr-pin" placeholder="6-digit PIN"></div>
      <button class="btn btn-primary btn-sm" onclick="Pages.saveAddress()">Save Address</button>
    </div>`;
  },

  saveAddress() {
    const addr = {
      name: document.getElementById('addr-name')?.value || 'User',
      phone: document.getElementById('addr-phone')?.value || '',
      line1: document.getElementById('addr-line')?.value || '',
      city: document.getElementById('addr-city')?.value || '',
      state: document.getElementById('addr-state')?.value || '',
      pin: document.getElementById('addr-pin')?.value || ''
    };
    if (!addr.line1 || !addr.city) { UI.showToast('Error', 'Please fill in address details', 'error'); return; }
    Store.addAddress(addr);
    UI.showToast('Address Saved', 'Address added successfully', 'success');
    App.refreshPage();
  },

  placeOrder() {
    if (Store.addresses.length === 0) { UI.showToast('Add Address', 'Please add a delivery address first', 'warning'); return; }
    if (!Store.isLoggedIn()) { UI.showToast('Login Required', 'Please login to place an order', 'warning'); App.navigate('/login'); return; }
    const addressEl = document.querySelector('input[name="address"]:checked');
    const paymentEl = document.querySelector('input[name="payment"]:checked');
    const order = Store.placeOrder(addressEl?.value, paymentEl?.value || 'card');
    UI.showModal('🎉 Order Placed!', `
      <div style="text-align:center;padding:20px 0">
        <div style="font-size:4rem;margin-bottom:16px">✅</div>
        <h3>Thank you for your order!</h3>
        <p style="color:var(--text-muted);margin:12px 0">Order ID: <strong>${order.id}</strong></p>
        <p style="color:var(--text-muted)">Estimated delivery: <strong>${UI.formatDate(order.estimatedDelivery)}</strong></p>
        <div style="margin-top:24px;display:flex;gap:12px;justify-content:center">
          <button class="btn btn-primary" onclick="UI.closeModal();App.navigate('/orders')">View Orders</button>
          <button class="btn btn-secondary" onclick="UI.closeModal();App.navigate('/')">Continue Shopping</button>
        </div>
      </div>
    `);
  },

  // ================ AUTH ================
  login() {
    return `<div class="auth-page"><div class="auth-card">
      <h2>Welcome Back</h2>
      <p class="subtitle">Sign in to your Arknetch account</p>
      <div class="social-login">
        <button class="social-btn" onclick="UI.showToast('Demo','Social login is demo only','info')">🔵 Google</button>
        <button class="social-btn" onclick="UI.showToast('Demo','Social login is demo only','info')">⚫ Apple</button>
      </div>
      <div class="auth-divider">or sign in with email</div>
      <div class="form-group"><label>Email</label><input type="email" id="login-email" placeholder="your@email.com"></div>
      <div class="form-group"><label>Password</label><input type="password" id="login-password" placeholder="••••••••"></div>
      <button class="btn btn-primary btn-lg" style="width:100%" onclick="Pages.doLogin()">Sign In</button>
      <p style="text-align:center;margin-top:16px;color:var(--text-muted)">Don't have an account? <a href="#" onclick="App.navigate('/register');return false">Sign Up</a></p>
    </div></div>`;
  },

  register() {
    return `<div class="auth-page"><div class="auth-card">
      <h2>Create Account</h2>
      <p class="subtitle">Join Arknetch for the best shopping experience</p>
      <div class="form-group"><label>Full Name</label><input type="text" id="reg-name" placeholder="Your full name"></div>
      <div class="form-group"><label>Email</label><input type="email" id="reg-email" placeholder="your@email.com"></div>
      <div class="form-group"><label>Password</label><input type="password" id="reg-password" placeholder="Min 6 characters"></div>
      <div class="form-group"><label>Confirm Password</label><input type="password" id="reg-confirm" placeholder="Repeat password"></div>
      <button class="btn btn-primary btn-lg" style="width:100%" onclick="Pages.doRegister()">Create Account</button>
      <p style="text-align:center;margin-top:16px;color:var(--text-muted)">Already have an account? <a href="#" onclick="App.navigate('/login');return false">Sign In</a></p>
    </div></div>`;
  },

  doLogin() {
    const email = document.getElementById('login-email')?.value;
    const pw = document.getElementById('login-password')?.value;
    if (!email || !pw) { UI.showToast('Error', 'Please fill all fields', 'error'); return; }
    const result = Store.login(email, pw);
    if (result.success) App.navigate('/account');
    else UI.showToast('Login Failed', result.message, 'error');
  },

  doRegister() {
    const name = document.getElementById('reg-name')?.value;
    const email = document.getElementById('reg-email')?.value;
    const pw = document.getElementById('reg-password')?.value;
    const confirm = document.getElementById('reg-confirm')?.value;
    if (!name || !email || !pw) { UI.showToast('Error', 'Please fill all fields', 'error'); return; }
    if (pw !== confirm) { UI.showToast('Error', 'Passwords do not match', 'error'); return; }
    if (pw.length < 6) { UI.showToast('Error', 'Password must be at least 6 characters', 'error'); return; }
    const result = Store.register(name, email, pw);
    if (result.success) App.navigate('/account');
    else UI.showToast('Error', result.message, 'error');
  },

  // ================ ACCOUNT ================
  account() {
    if (!Store.isLoggedIn()) return Pages.login();
    const u = Store.user;
    return `<div class="container">
      <div class="account-page">
        <div class="account-sidebar">
          <div style="text-align:center;margin-bottom:24px">
            <div class="review-avatar" style="width:64px;height:64px;font-size:1.5rem;margin:0 auto 12px">${u.avatar}</div>
            <div style="font-weight:600;font-size:1.1rem">${u.name}</div>
            <div style="color:var(--text-muted);font-size:.85rem">${u.email}</div>
          </div>
          <div class="account-menu-item active" onclick="App.navigate('/account')">👤 My Profile</div>
          <div class="account-menu-item" onclick="App.navigate('/orders')">📦 My Orders</div>
          <div class="account-menu-item" onclick="App.navigate('/wishlist')">❤️ Wishlist</div>
          <div class="account-menu-item" onclick="App.navigate('/cart')">🛒 Cart</div>
          <div class="account-menu-item" onclick="Store.logout();App.navigate('/');UI.showToast('Logged Out','See you soon!','info')">🚪 Logout</div>
        </div>
        <div>
          <div class="checkout-section">
            <h3>Profile Information</h3>
            <div class="form-row"><div class="form-group"><label>Full Name</label><input type="text" value="${u.name}" id="profile-name"></div><div class="form-group"><label>Email</label><input type="email" value="${u.email}" disabled></div></div>
            <div class="form-group"><label>Phone</label><input type="text" value="${u.phone || ''}" id="profile-phone" placeholder="+91 XXXXXXXXXX"></div>
            <button class="btn btn-primary btn-sm" onclick="Store.updateProfile({name:document.getElementById('profile-name').value,phone:document.getElementById('profile-phone').value});UI.showToast('Updated','Profile updated successfully','success')">Save Changes</button>
          </div>
          <div class="checkout-section">
            <h3>📍 Saved Addresses</h3>
            ${Store.addresses.length > 0 ? Store.addresses.map(a => `<div style="padding:12px;border:1px solid var(--border-color);border-radius:var(--radius-sm);margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
              <div><strong>${a.name}</strong> • ${a.phone}<br><span style="color:var(--text-muted)">${a.line1}, ${a.city}, ${a.state} - ${a.pin}</span></div>
              <button class="btn btn-sm btn-secondary" style="color:var(--error)" onclick="Store.removeAddress(${a.id});App.refreshPage()">Remove</button>
            </div>`).join('') : '<p style="color:var(--text-muted)">No saved addresses</p>'}
            <button class="btn btn-outline btn-sm" onclick="Pages.showAddressForm()">+ Add Address</button>
            <div id="address-form-area"></div>
          </div>
        </div>
      </div>
    </div>`;
  },

  // ================ ORDERS ================
  orders() {
    if (!Store.isLoggedIn()) return Pages.login();
    const orders = Store.orders;

    if (orders.length === 0) return `<div class="container"><div class="empty-state" style="padding:80px"><div class="empty-state-icon">📦</div><h3>No orders yet</h3><p>Start shopping to see your orders here</p><button class="btn btn-primary" onclick="App.navigate('/products')">Shop Now</button></div></div>`;

    const statusSteps = ['confirmed', 'shipped', 'out_for_delivery', 'delivered'];
    const statusLabels = { confirmed: 'Confirmed', shipped: 'Shipped', out_for_delivery: 'Out for Delivery', delivered: 'Delivered', return_requested: 'Return Requested' };

    return `<div class="container" style="padding:32px 24px">
      <h2 style="margin-bottom:24px">📦 My Orders</h2>
      ${orders.map(order => `
        <div class="order-card">
          <div class="order-card-header">
            <div><span style="font-weight:600">Order #${order.id}</span> <span style="color:var(--text-muted);margin-left:12px">${UI.formatDate(order.placedAt)}</span></div>
            <div><span class="status-badge ${order.status}">${statusLabels[order.status] || order.status}</span></div>
            <div style="font-weight:600">${formatPrice(order.total)}</div>
          </div>
          <div class="order-card-body">
            ${order.items.map(item => `<div class="order-item"><div class="order-item-img"><img src="${item.image}" alt=""></div><div><div style="font-weight:500">${item.name}</div><div style="color:var(--text-muted);font-size:.85rem">Qty: ${item.qty} • ${formatPrice(item.price)}</div></div></div>`).join('')}
            <div class="order-track">
              <div style="font-weight:600;margin-bottom:4px">Track Order</div>
              <div class="track-steps">
                ${statusSteps.map((step, i) => {
                  const stepIdx = statusSteps.indexOf(order.status);
                  const isCompleted = i < stepIdx || (i <= stepIdx && order.status !== 'return_requested');
                  const isActive = i === stepIdx;
                  return `<div class="track-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}"><div class="track-dot">${isCompleted ? '✓' : i + 1}</div><div class="track-label">${statusLabels[step]}</div></div>`;
                }).join('')}
              </div>
            </div>
            <div style="margin-top:16px;display:flex;gap:8px">
              <button class="btn btn-sm btn-secondary" onclick="Store.orders.find(o=>o.id==='${order.id}').items.forEach(i=>Store.addToCart(i.productId,i.qty));UI.showToast('Reordered','Items added to cart','success')">🔄 Reorder</button>
              ${order.status === 'delivered' ? `<button class="btn btn-sm btn-outline" onclick="Store.requestReturn('${order.id}');App.refreshPage()">🔁 Request Return</button>` : ''}
            </div>
          </div>
        </div>
      `).join('')}
    </div>`;
  },

  // ================ WISHLIST ================
  wishlist() {
    const items = Store.wishlist.map(id => getProduct(id)).filter(Boolean);
    if (items.length === 0) return `<div class="container"><div class="empty-state" style="padding:80px"><div class="empty-state-icon">❤️</div><h3>Your wishlist is empty</h3><p>Save items you love for later</p><button class="btn btn-primary" onclick="App.navigate('/products')">Explore Products</button></div></div>`;
    return `<div class="container" style="padding:32px 24px">
      <div class="section-header"><h2>❤️ My Wishlist (${items.length})</h2></div>
      ${UI.productGrid(items, 4)}
    </div>`;
  },

  // ================ DEALS ================
  deals() {
    return `<div class="container" style="padding:32px 24px">
      <div class="deals-banner">
        <h1>🔥 Arknetch Deals Festival</h1>
        <p>Massive discounts on thousands of products. Limited time only!</p>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap">
        <button class="btn btn-sm btn-primary">All Deals</button>
        <button class="btn btn-sm btn-secondary" onclick="document.getElementById('deals-grid').innerHTML=UI.productGrid(PRODUCTS.filter(p=>p.category==='electronics'&&p.discount>20),4)">Electronics</button>
        <button class="btn btn-sm btn-secondary" onclick="document.getElementById('deals-grid').innerHTML=UI.productGrid(PRODUCTS.filter(p=>p.category==='fashion'&&p.discount>20),4)">Fashion</button>
        <button class="btn btn-sm btn-secondary" onclick="document.getElementById('deals-grid').innerHTML=UI.productGrid(PRODUCTS.filter(p=>p.category==='home'&&p.discount>20),4)">Home</button>
      </div>
      <section class="section"><div class="section-header"><h2>⚡ Lightning Deals</h2></div>
        <div class="grid grid-4">${DEALS.map(d => UI.dealCard(d)).join('')}</div>
      </section>
      <section class="section"><div class="section-header"><h2>💰 Best Discounts</h2></div>
        <div id="deals-grid">${UI.productGrid([...PRODUCTS].sort((a, b) => b.discount - a.discount).slice(0, 8), 4)}</div>
      </section>
      <section class="section" style="text-align:center;padding:40px;background:var(--bg-card);border-radius:var(--radius-xl);border:1px solid var(--border-color)">
        <h3 style="margin-bottom:8px">🎟️ Have a Coupon Code?</h3>
        <p style="color:var(--text-muted);margin-bottom:16px">Apply it at checkout to save more!</p>
        <div style="display:flex;gap:12px;max-width:400px;margin:0 auto">
          ${COUPONS.map(c => `<div style="background:var(--bg-tertiary);border:1px dashed var(--primary);border-radius:var(--radius-sm);padding:12px;flex:1;text-align:center">
            <div style="font-weight:700;color:var(--primary-light);font-size:1.1rem">${c.code}</div>
            <div style="font-size:.8rem;color:var(--text-muted);margin-top:4px">${c.description}</div>
          </div>`).join('')}
        </div>
      </section>
    </div>`;
  },

  // ================ SELLER DASHBOARD ================
  seller() {
    return `<div class="container" style="padding:32px 24px">
      <h2 style="margin-bottom:24px">🏪 Seller Dashboard</h2>
      <div class="seller-stats">
        <div class="stat-card"><div class="stat-value" style="color:var(--primary-light)">₹4,52,780</div><div class="stat-label">Total Revenue</div><div class="stat-change up">↑ 12.5% vs last month</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--accent)">1,247</div><div class="stat-label">Total Orders</div><div class="stat-change up">↑ 8.3% vs last month</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--success)">98.2%</div><div class="stat-label">Fulfillment Rate</div><div class="stat-change up">↑ 2.1%</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--warning)">4.7★</div><div class="stat-label">Seller Rating</div><div class="stat-change up">↑ 0.2</div></div>
      </div>
      <div class="checkout-section">
        <div class="flex-between" style="margin-bottom:16px"><h3>Recent Orders</h3><button class="btn btn-sm btn-outline">Export CSV</button></div>
        <div style="overflow-x:auto"><table class="data-table">
          <thead><tr><th>Order ID</th><th>Product</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            <tr><td>#ARK7842</td><td>Arknetch Pro Max</td><td>Rahul S.</td><td>₹69,999</td><td><span class="status-badge delivered">Delivered</span></td><td>Apr 3, 2026</td></tr>
            <tr><td>#ARK7841</td><td>AirPods Ultra</td><td>Priya M.</td><td>₹24,999</td><td><span class="status-badge shipped">Shipped</span></td><td>Apr 2, 2026</td></tr>
            <tr><td>#ARK7840</td><td>Smart Watch Ultra</td><td>Amit K.</td><td>₹34,999</td><td><span class="status-badge processing">Processing</span></td><td>Apr 1, 2026</td></tr>
            <tr><td>#ARK7839</td><td>Running Shoes X1</td><td>Sneha R.</td><td>₹6,999</td><td><span class="status-badge delivered">Delivered</span></td><td>Mar 31, 2026</td></tr>
            <tr><td>#ARK7838</td><td>Espresso Machine</td><td>Vikram P.</td><td>₹24,999</td><td><span class="status-badge shipped">Shipped</span></td><td>Mar 30, 2026</td></tr>
          </tbody>
        </table></div>
      </div>
      <div class="grid grid-2" style="margin-top:24px">
        <div class="checkout-section"><h3>📊 Inventory Alerts</h3>
          ${[{name:'Smart Watch Ultra',stock:5,status:'Low'},{name:'Leather Jacket',stock:12,status:'OK'},{name:'Robot Kit',stock:3,status:'Critical'}].map(item => `
            <div class="flex-between" style="padding:12px 0;border-bottom:1px solid var(--border-color)">
              <span>${item.name}</span>
              <span class="status-badge ${item.status === 'Critical' ? 'cancelled' : item.status === 'Low' ? 'processing' : 'delivered'}">${item.stock} left — ${item.status}</span>
            </div>`).join('')}
        </div>
        <div class="checkout-section"><h3>⭐ Recent Reviews</h3>
          ${SAMPLE_REVIEWS.slice(0, 3).map(r => `<div style="padding:8px 0;border-bottom:1px solid var(--border-color)"><div class="flex"><span class="stars" style="font-size:.8rem">${getStarsHTML(r.rating)}</span><strong style="font-size:.85rem">${r.userName}</strong></div><p style="font-size:.85rem;color:var(--text-muted);margin-top:4px">${r.comment.slice(0, 80)}...</p></div>`).join('')}
        </div>
      </div>
    </div>`;
  }
};
