/* ============================================
   SYNTRA v2 — In-Memory Data Layer
   12M+ products via procedural generation
   ============================================ */

export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: '📱', color: '#7c3aed' },
  { id: 'fashion', name: 'Fashion', icon: '👗', color: '#ec4899' },
  { id: 'home', name: 'Home & Kitchen', icon: '🏠', color: '#10b981' },
  { id: 'books', name: 'Books', icon: '📚', color: '#f59e0b' },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽', color: '#06b6d4' },
  { id: 'beauty', name: 'Beauty', icon: '💄', color: '#f43f5e' },
  { id: 'toys', name: 'Toys & Games', icon: '🎮', color: '#8b5cf6' },
  { id: 'grocery', name: 'Groceries', icon: '🛒', color: '#22c55e' },
  { id: 'health', name: 'Health', icon: '💊', color: '#14b8a6' },
  { id: 'automotive', name: 'Automotive', icon: '🚗', color: '#ef4444' },
];

export const BRANDS = [
  'Syntra','TechVista','StyleCraft','HomeLux','FitPro',
  'GreenLeaf','BookWorm','PlayZone','AutoPrime','BeautyGlow'
];

// ---- Core seed products (39) ----
export const SEED_PRODUCTS = [
  {id:1,name:'Syntra Pro Max Smartphone',slug:'syntra-pro-max',category:'electronics',brand:'Syntra',price:69999,originalPrice:89999,discount:22,rating:4.6,reviewCount:12453,image:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop','https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop'],description:'Experience the future with the Syntra Pro Max. Featuring a stunning 6.8" AMOLED display, 200MP camera system, and the most powerful AI chip ever made.',features:['6.8" Super AMOLED 120Hz Display','200MP Triple Camera System','Snapdragon 8 Gen 4 Processor','5500mAh Battery with 120W Fast Charging','12GB RAM + 256GB Storage','IP68 Water & Dust Resistant'],specs:{'Display':'6.8" AMOLED','Processor':'Snapdragon 8 Gen 4','RAM':'12GB','Storage':'256GB','Battery':'5500mAh','Camera':'200MP + 50MP + 12MP'},colors:['#1a1a2e','#c0c0c0','#7c3aed','#10b981'],inStock:true,stockCount:145,seller:'Syntra Official',deliveryDays:1,freeDelivery:true,tags:['smartphone','5g','flagship','camera']},
  {id:2,name:'Syntra UltraBook Pro 16"',slug:'syntra-ultrabook',category:'electronics',brand:'Syntra',price:94999,originalPrice:119999,discount:21,rating:4.8,reviewCount:6721,image:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop'],description:'The ultimate creative powerhouse. 16" 4K Retina display, M4 Pro chip, 32GB unified memory.',features:['16" 4K Retina Display','M4 Pro Chip','32GB Unified Memory','1TB SSD Storage','20-Hour Battery Life','Thunderbolt 5 Ports'],specs:{'Display':'16" 4K Retina','Processor':'M4 Pro','RAM':'32GB','Storage':'1TB SSD','Battery':'20 hours','Weight':'1.8kg'},colors:['#1a1a2e','#c0c0c0'],inStock:true,stockCount:89,seller:'Syntra Official',deliveryDays:2,freeDelivery:true,tags:['laptop','ultrabook','professional']},
  {id:3,name:'Syntra AirPods Ultra',slug:'syntra-airpods',category:'electronics',brand:'Syntra',price:24999,originalPrice:29999,discount:17,rating:4.5,reviewCount:8932,image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'],description:'Supreme noise cancellation meets perfect sound. 40-hour battery, spatial audio.',features:['Active Noise Cancellation','Spatial Audio with Head Tracking','40-Hour Battery Life','IPX5 Water Resistant','Wireless Charging Case','Multi-Device Connectivity'],specs:{'Type':'Over-ear','Driver':'50mm','ANC':'Hybrid Active','Battery':'40 hours','Connectivity':'Bluetooth 5.3'},colors:['#1a1a2e','#f8fafc','#7c3aed'],inStock:true,stockCount:234,seller:'Syntra Official',deliveryDays:1,freeDelivery:true,tags:['headphones','audio','anc','wireless']},
  {id:4,name:'TechVista 4K Smart TV 55"',slug:'techvista-smarttv',category:'electronics',brand:'TechVista',price:44999,originalPrice:64999,discount:31,rating:4.4,reviewCount:3421,image:'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop'],description:'Immerse yourself in cinematic brilliance with QLED 4K display, Dolby Vision.',features:['55" QLED 4K Display','Dolby Vision & Atmos','120Hz Refresh Rate','Built-in Smart OS','Voice Control','4 HDMI 2.1 Ports'],specs:{'Display':'55" QLED 4K','HDR':'Dolby Vision','Refresh Rate':'120Hz','Speakers':'40W Dolby Atmos','Ports':'4x HDMI 2.1','Smart OS':'SyntraOS'},colors:[],inStock:true,stockCount:67,seller:'TechVista Store',deliveryDays:3,freeDelivery:true,tags:['tv','4k','smart','entertainment']},
  {id:5,name:'Syntra Smart Watch Ultra',slug:'syntra-watch',category:'electronics',brand:'Syntra',price:34999,originalPrice:44999,discount:22,rating:4.7,reviewCount:5643,image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'],description:'Your ultimate health companion. Advanced sensors, GPS, 72-hour battery.',features:['1.9" Always-On AMOLED','Blood Oxygen & ECG','Built-in GPS & Compass','72-Hour Battery Life','100m Water Resistant','500+ Workout Modes'],specs:{'Display':'1.9" AMOLED','Sensors':'SpO2, ECG, Temp','GPS':'Dual-band','Battery':'72 hours'},colors:['#1a1a2e','#c0c0c0','#f59e0b'],inStock:true,stockCount:178,seller:'Syntra Official',deliveryDays:1,freeDelivery:true,tags:['smartwatch','fitness','health']},
  {id:6,name:'TechVista DSLR Pro Camera',slug:'techvista-dslr',category:'electronics',brand:'TechVista',price:59999,originalPrice:74999,discount:20,rating:4.6,reviewCount:2187,image:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop'],description:'Professional-grade 45MP full-frame mirrorless camera with 8K video.',features:['45MP Full-Frame Sensor','8K Video Recording','5-Axis IBIS','693 AF Points'],specs:{'Sensor':'45MP Full-Frame','Video':'8K 30fps'},colors:['#1a1a2e'],inStock:true,stockCount:45,seller:'TechVista Store',deliveryDays:2,freeDelivery:true,tags:['camera','photography','professional']},
  {id:7,name:'Premium Italian Leather Jacket',slug:'leather-jacket',category:'fashion',brand:'StyleCraft',price:4999,originalPrice:8999,discount:44,rating:4.3,reviewCount:1876,image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop'],description:'Handcrafted genuine Italian leather jacket with premium YKK zippers.',features:['100% Genuine Italian Leather','Premium YKK Zippers','Quilted Satin Lining','Multiple Pockets'],specs:{'Material':'Italian Leather','Lining':'Quilted Satin'},colors:['#1a1a2e','#8B4513','#800020'],sizes:['S','M','L','XL','XXL'],inStock:true,stockCount:89,seller:'StyleCraft Fashion',deliveryDays:3,freeDelivery:true,tags:['jacket','leather','fashion','men']},
  {id:8,name:'Elegant Silk Evening Dress',slug:'silk-dress',category:'fashion',brand:'StyleCraft',price:3499,originalPrice:5999,discount:42,rating:4.5,reviewCount:2341,image:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop'],description:'Stunning silk evening dress with hand-embroidered details.',features:['100% Pure Silk','Hand-Embroidered Details','Flowing A-Line Silhouette'],specs:{'Material':'Pure Silk','Style':'A-Line'},colors:['#1a1a2e','#800020','#1e3a5f','#10b981'],sizes:['XS','S','M','L','XL'],inStock:true,stockCount:56,seller:'StyleCraft Fashion',deliveryDays:4,freeDelivery:true,tags:['dress','silk','evening','women']},
  {id:9,name:'FitPro Running Shoes X1',slug:'running-shoes',category:'fashion',brand:'FitPro',price:6999,originalPrice:9999,discount:30,rating:4.7,reviewCount:5621,image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop'],description:'Engineered for performance with carbon fiber plate and responsive foam.',features:['Carbon Fiber Speed Plate','Energy-Return Foam','Breathable Knit Upper','Lightweight 245g'],specs:{'Upper':'Engineered Knit','Weight':'245g'},colors:['#ef4444','#1a1a2e','#06b6d4','#f59e0b'],sizes:['7','8','9','10','11','12'],inStock:true,stockCount:312,seller:'FitPro Sports',deliveryDays:2,freeDelivery:true,tags:['shoes','running','sports','fitness']},
  {id:10,name:'Luxury Chronograph Watch',slug:'chronograph-watch',category:'fashion',brand:'StyleCraft',price:12999,originalPrice:19999,discount:35,rating:4.6,reviewCount:1932,image:'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop'],description:'Swiss-inspired chronograph with sapphire crystal and leather strap.',features:['Japanese Quartz Movement','Sapphire Crystal Glass','100m Water Resistant'],specs:{'Movement':'Japanese Quartz','Crystal':'Sapphire'},colors:['#c0c0c0','#f59e0b','#1a1a2e'],inStock:true,stockCount:67,seller:'StyleCraft Fashion',deliveryDays:2,freeDelivery:true,tags:['watch','luxury','chronograph']},
  {id:11,name:'Polarized Aviator Sunglasses',slug:'aviator-sunglasses',category:'fashion',brand:'StyleCraft',price:2499,originalPrice:3999,discount:38,rating:4.4,reviewCount:3456,image:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop'],description:'Classic aviator with polarized UV400 lenses and titanium frame.',features:['Polarized UV400 Lenses','Titanium Frame','Spring Hinges'],specs:{'Lens':'Polarized UV400','Frame':'Titanium'},colors:['#f59e0b','#1a1a2e','#06b6d4'],inStock:true,stockCount:189,seller:'StyleCraft Fashion',deliveryDays:2,freeDelivery:true,tags:['sunglasses','aviator','polarized']},
  {id:12,name:'Classic Stretch Denim Jeans',slug:'denim-jeans',category:'fashion',brand:'StyleCraft',price:1999,originalPrice:3499,discount:43,rating:4.3,reviewCount:7892,image:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop'],description:'Premium stretch denim with perfect slim fit.',features:['Organic Cotton Blend','2% Elastane Stretch','Slim Fit'],specs:{'Material':'98% Organic Cotton, 2% Elastane'},colors:['#1e3a5f','#1a1a2e','#6b7280'],sizes:['28','30','32','34','36','38'],inStock:true,stockCount:445,seller:'StyleCraft Fashion',deliveryDays:2,freeDelivery:true,tags:['jeans','denim','casual','men']},
  {id:13,name:'Smart HEPA Air Purifier',slug:'air-purifier',category:'home',brand:'HomeLux',price:14999,originalPrice:21999,discount:32,rating:4.5,reviewCount:2345,image:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop'],description:'Medical-grade HEPA purifier covering 600 sq ft with smart sensors.',features:['H13 HEPA Filter','Covers 600 sq ft','Smart Air Quality Sensor','Ultra-Quiet 22dB'],specs:{'Filter':'H13 HEPA + Carbon','Coverage':'600 sq ft'},colors:['#f8fafc','#1a1a2e'],inStock:true,stockCount:78,seller:'HomeLux Living',deliveryDays:3,freeDelivery:true,tags:['air purifier','health','smart home']},
  {id:14,name:'Robot Vacuum & Mop Combo',slug:'robot-vacuum',category:'home',brand:'HomeLux',price:19999,originalPrice:29999,discount:33,rating:4.6,reviewCount:4567,image:'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'],description:'LiDAR navigation robot vacuum with simultaneous mopping.',features:['LiDAR Navigation','5000Pa Suction','Auto-Empty Dock','Smart Room Mapping'],specs:{'Suction':'5000Pa','Battery':'180 min'},colors:[],inStock:true,stockCount:56,seller:'HomeLux Living',deliveryDays:3,freeDelivery:true,tags:['robot vacuum','smart home','cleaning']},
  {id:15,name:'Professional Espresso Machine',slug:'espresso-machine',category:'home',brand:'HomeLux',price:24999,originalPrice:34999,discount:29,rating:4.8,reviewCount:1876,image:'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=600&fit=crop'],description:'Barista-quality espresso at home with 20-bar pressure.',features:['20-Bar Italian Pump','Built-in Burr Grinder','Professional Steam Wand','Touch LCD Display'],specs:{'Pressure':'20 bar','Grinder':'Conical Burr'},colors:['#c0c0c0','#1a1a2e'],inStock:true,stockCount:34,seller:'HomeLux Living',deliveryDays:4,freeDelivery:true,tags:['coffee','espresso','kitchen']},
  {id:16,name:'Orthopedic Memory Foam Mattress',slug:'memory-mattress',category:'home',brand:'HomeLux',price:29999,originalPrice:49999,discount:40,rating:4.7,reviewCount:3245,image:'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1631049035182-249067d7618e?w=600&h=600&fit=crop'],description:'12-inch luxury memory foam with cooling gel and zero motion transfer.',features:['12-inch Multi-Layer Design','Cooling Gel Memory Foam','Zero Motion Transfer','10-Year Warranty'],specs:{'Height':'12 inches','Firmness':'Medium-Firm'},colors:[],sizes:['Single','Double','Queen','King'],inStock:true,stockCount:23,seller:'HomeLux Living',deliveryDays:5,freeDelivery:true,tags:['mattress','bedroom','sleep']},
  {id:17,name:'Smart RGB LED Desk Lamp',slug:'smart-lamp',category:'home',brand:'HomeLux',price:3999,originalPrice:5499,discount:27,rating:4.4,reviewCount:5678,image:'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop'],description:'16M color RGB LED lamp with wireless charging base.',features:['16M RGB Colors','Wireless Charging Base','Touch Controls','Eye-Care Technology'],specs:{'Colors':'16 Million RGB','Lumens':'800lm'},colors:['#f8fafc','#1a1a2e'],inStock:true,stockCount:167,seller:'HomeLux Living',deliveryDays:2,freeDelivery:true,tags:['lamp','lighting','smart home']},
  {id:18,name:'The Art of Programming',slug:'art-of-programming',category:'books',brand:'BookWorm',price:599,originalPrice:899,discount:33,rating:4.9,reviewCount:12456,image:'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop'],description:'The definitive guide to writing elegant, efficient code.',features:['600+ Pages','Code Examples in 5 Languages','Practice Problems'],specs:{'Pages':'648','Format':'Hardcover'},colors:[],inStock:true,stockCount:890,seller:'BookWorm Publishing',deliveryDays:2,freeDelivery:true,tags:['book','programming','coding']},
  {id:19,name:'AI Revolution: Future of Intelligence',slug:'ai-revolution',category:'books',brand:'BookWorm',price:799,originalPrice:1099,discount:27,rating:4.7,reviewCount:8765,image:'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop'],description:'How artificial intelligence is reshaping our world.',features:['400+ Pages','Case Studies','Expert Interviews'],specs:{'Pages':'432','Format':'Paperback'},colors:[],inStock:true,stockCount:567,seller:'BookWorm Publishing',deliveryDays:2,freeDelivery:true,tags:['book','ai','technology']},
  {id:20,name:'Mindful Living: A Modern Guide',slug:'mindful-living',category:'books',brand:'BookWorm',price:449,originalPrice:699,discount:36,rating:4.5,reviewCount:5432,image:'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop'],description:'Transform your daily life with practical mindfulness techniques.',features:['300+ Pages','Guided Exercises','Daily Practice Plans'],specs:{'Pages':'324','Format':'Paperback'},colors:[],inStock:true,stockCount:345,seller:'BookWorm Publishing',deliveryDays:2,freeDelivery:true,tags:['book','mindfulness','wellness']},
  {id:21,name:'Startup Playbook: Zero to IPO',slug:'startup-playbook',category:'books',brand:'BookWorm',price:699,originalPrice:999,discount:30,rating:4.6,reviewCount:6789,image:'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=600&fit=crop'],description:'The complete guide to building, scaling, and exiting a startup.',features:['500+ Pages','Real Case Studies','Financial Templates'],specs:{'Pages':'512','Format':'Hardcover'},colors:[],inStock:true,stockCount:234,seller:'BookWorm Publishing',deliveryDays:2,freeDelivery:true,tags:['book','startup','business']},
  {id:22,name:'Professional Cork Yoga Mat',slug:'yoga-mat',category:'sports',brand:'FitPro',price:1999,originalPrice:2999,discount:33,rating:4.5,reviewCount:4321,image:'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop'],description:'Eco-friendly natural cork yoga mat with superior grip.',features:['Natural Cork Surface','6mm Thick Cushioning','Non-Slip TPE Base','Antimicrobial'],specs:{'Material':'Cork + TPE','Thickness':'6mm'},colors:[],inStock:true,stockCount:234,seller:'FitPro Sports',deliveryDays:2,freeDelivery:true,tags:['yoga','fitness','mat']},
  {id:23,name:'Smart Fitness Tracker Band',slug:'fitness-band',category:'sports',brand:'FitPro',price:4999,originalPrice:6999,discount:29,rating:4.4,reviewCount:7654,image:'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop'],description:'Advanced fitness tracker with heart rate, SpO2, and 14-day battery.',features:['Heart Rate & SpO2 Monitor','14-Day Battery Life','AMOLED Display','110+ Sport Modes'],specs:{'Display':'1.47" AMOLED','Battery':'14 days'},colors:['#1a1a2e','#06b6d4','#ec4899'],inStock:true,stockCount:345,seller:'FitPro Sports',deliveryDays:2,freeDelivery:true,tags:['fitness','tracker','health']},
  {id:24,name:'Mountain Bicycle Pro 29"',slug:'mountain-bicycle',category:'sports',brand:'FitPro',price:18999,originalPrice:27999,discount:32,rating:4.7,reviewCount:1234,image:'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=600&fit=crop'],description:'Full suspension mountain bike with carbon frame.',features:['Carbon Fiber Frame','Full Suspension 150mm','Hydraulic Disc Brakes','Shimano 12-Speed'],specs:{'Frame':'Carbon Fiber','Wheels':'29"'},colors:['#1a1a2e','#ef4444','#06b6d4'],inStock:true,stockCount:23,seller:'FitPro Sports',deliveryDays:5,freeDelivery:true,tags:['bicycle','mountain','outdoor']},
  {id:25,name:'4-Person Camping Tent Ultra',slug:'camping-tent',category:'sports',brand:'FitPro',price:7999,originalPrice:11999,discount:33,rating:4.5,reviewCount:2345,image:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=600&fit=crop'],description:'Ultra-light 4-person tent with 5000mm waterproof rating.',features:['4-Person Capacity','5000mm Waterproof','UV50+ Protection','Instant Pop-Up Setup'],specs:{'Capacity':'4 Person','Waterproof':'5000mm'},colors:['#10b981','#f59e0b','#94a3b8'],inStock:true,stockCount:56,seller:'FitPro Sports',deliveryDays:3,freeDelivery:true,tags:['tent','camping','outdoor']},
  {id:26,name:'Luxury 10-Step Skincare Set',slug:'skincare-set',category:'beauty',brand:'BeautyGlow',price:3999,originalPrice:6999,discount:43,rating:4.6,reviewCount:5432,image:'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop'],description:'Complete Korean-inspired 10-step skincare routine.',features:['10 Full-Size Products','Hyaluronic Acid Serum','Vitamin C Brightening','Cruelty-Free & Vegan'],specs:{'Products':'10','Skin Type':'All Types'},colors:[],inStock:true,stockCount:89,seller:'BeautyGlow Store',deliveryDays:3,freeDelivery:true,tags:['skincare','beauty','korean']},
  {id:27,name:'Professional Ionic Hair Dryer',slug:'hair-dryer',category:'beauty',brand:'BeautyGlow',price:5999,originalPrice:8999,discount:33,rating:4.5,reviewCount:3456,image:'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop'],description:'Salon-quality ionic hair dryer with 110,000 RPM motor.',features:['110,000 RPM Motor','Negative Ion Technology','4 Heat Settings','Lightweight 380g'],specs:{'Motor':'110K RPM','Power':'1600W'},colors:['#ec4899','#1a1a2e','#f8fafc'],inStock:true,stockCount:123,seller:'BeautyGlow Store',deliveryDays:2,freeDelivery:true,tags:['hair dryer','beauty','salon']},
  {id:28,name:'Artisan Perfume Collection',slug:'perfume-collection',category:'beauty',brand:'BeautyGlow',price:2999,originalPrice:4999,discount:40,rating:4.7,reviewCount:2789,image:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop'],description:'Luxury perfume discovery set from Grasse, France.',features:['5 Artisan Fragrances','Eau de Parfum','Travel-Size 15ml Each','Gift Box'],specs:{'Volume':'5 x 15ml','Origin':'Grasse, France'},colors:[],inStock:true,stockCount:67,seller:'BeautyGlow Store',deliveryDays:3,freeDelivery:true,tags:['perfume','fragrance','luxury']},
  {id:29,name:'STEM Robot Building Kit',slug:'robot-kit',category:'toys',brand:'PlayZone',price:4999,originalPrice:7499,discount:33,rating:4.8,reviewCount:3456,image:'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&h=600&fit=crop'],description:'Build and code 5 different robots with this STEM kit.',features:['5 Robot Designs','400+ Pieces','Bluetooth App Control','Visual Programming'],specs:{'Pieces':'400+','Ages':'8-16'},colors:[],inStock:true,stockCount:78,seller:'PlayZone Toys',deliveryDays:3,freeDelivery:true,tags:['robot','stem','coding','kids']},
  {id:30,name:'4K Camera Drone Explorer',slug:'camera-drone',category:'toys',brand:'TechVista',price:8999,originalPrice:12999,discount:31,rating:4.5,reviewCount:2345,image:'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&h=600&fit=crop'],description:'Foldable 4K drone with gimbal stabilization and 40-min flight.',features:['4K 60fps Camera','3-Axis Gimbal','Obstacle Avoidance','40-Min Flight Time'],specs:{'Camera':'4K 60fps','Range':'5km'},colors:['#6b7280'],inStock:true,stockCount:45,seller:'TechVista Store',deliveryDays:3,freeDelivery:true,tags:['drone','camera','flying']},
  {id:31,name:'Complete Board Games Collection',slug:'board-games',category:'toys',brand:'PlayZone',price:2499,originalPrice:3999,discount:38,rating:4.4,reviewCount:4567,image:'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&h=600&fit=crop'],description:'Premium collection of 12 classic and strategy board games.',features:['12 Board Games','Premium Wooden Chest','2-8 Players','Family Friendly'],specs:{'Games':'12','Players':'2-8'},colors:[],inStock:true,stockCount:89,seller:'PlayZone Toys',deliveryDays:3,freeDelivery:true,tags:['board games','family','strategy']},
  {id:32,name:'Organic Japanese Green Tea Set',slug:'green-tea-set',category:'grocery',brand:'GreenLeaf',price:1299,originalPrice:1999,discount:35,rating:4.6,reviewCount:5678,image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop'],description:'Premium matcha and sencha collection from Kyoto.',features:['Ceremonial Grade Matcha','4 Loose-Leaf Varieties','Bamboo Whisk Included'],specs:{'Origin':'Kyoto, Japan','Weight':'100g'},colors:[],inStock:true,stockCount:234,seller:'GreenLeaf Organics',deliveryDays:2,freeDelivery:false,tags:['tea','organic','japanese']},
  {id:33,name:'Premium Mixed Dry Fruits Box',slug:'dry-fruits-box',category:'grocery',brand:'GreenLeaf',price:2499,originalPrice:3499,discount:29,rating:4.7,reviewCount:4321,image:'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600&h=600&fit=crop'],description:'Handpicked selection of premium almonds, cashews, and more.',features:['6 Premium Varieties','500g Assortment','No Preservatives','Gift Box'],specs:{'Weight':'500g','Varieties':'6'},colors:[],inStock:true,stockCount:156,seller:'GreenLeaf Organics',deliveryDays:2,freeDelivery:true,tags:['dry fruits','nuts','healthy']},
  {id:34,name:'Belgian Chocolate Gift Collection',slug:'chocolate-collection',category:'grocery',brand:'GreenLeaf',price:1999,originalPrice:2999,discount:33,rating:4.8,reviewCount:6789,image:'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&h=600&fit=crop'],description:'Artisan Belgian chocolates in 12 exquisite flavors.',features:['12 Unique Flavors','Belgian Cocoa','Handcrafted','24 Pieces'],specs:{'Pieces':'24','Origin':'Brussels, Belgium'},colors:[],inStock:true,stockCount:89,seller:'GreenLeaf Organics',deliveryDays:3,freeDelivery:true,tags:['chocolate','belgian','gift']},
  {id:35,name:'Plant-Based Protein Powder',slug:'protein-powder',category:'health',brand:'FitPro',price:2999,originalPrice:3999,discount:25,rating:4.5,reviewCount:8765,image:'https://images.unsplash.com/photo-1593095948071-474c5cc2c1cf?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1593095948071-474c5cc2c1cf?w=600&h=600&fit=crop'],description:'Premium plant-based protein blend with 30g protein per serving.',features:['30g Protein/Serving','Plant-Based Blend','Zero Sugar','30 Servings'],specs:{'Protein':'30g/serving','Weight':'1kg'},colors:[],inStock:true,stockCount:345,seller:'FitPro Sports',deliveryDays:2,freeDelivery:true,tags:['protein','fitness','supplement']},
  {id:36,name:'Percussion Massage Gun Pro',slug:'massage-gun',category:'health',brand:'FitPro',price:7999,originalPrice:11999,discount:33,rating:4.6,reviewCount:3456,image:'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&h=600&fit=crop'],description:'Professional percussion therapy device with 30 speed levels.',features:['30 Speed Levels','8 Massage Heads','Brushless Motor','6-Hour Battery'],specs:{'Speeds':'30 Levels','Noise':'35dB'},colors:['#1a1a2e','#6b7280','#ef4444'],inStock:true,stockCount:123,seller:'FitPro Sports',deliveryDays:2,freeDelivery:true,tags:['massage','recovery','fitness']},
  {id:37,name:'Smart Blood Pressure Monitor',slug:'bp-monitor',category:'health',brand:'Syntra',price:3499,originalPrice:4999,discount:30,rating:4.4,reviewCount:2345,image:'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=600&h=600&fit=crop'],description:'FDA-cleared smart blood pressure monitor with app tracking.',features:['FDA Cleared','App Health Tracking','Irregular Heartbeat Detection','2-User Profiles'],specs:{'Accuracy':'±3 mmHg','Connectivity':'Bluetooth'},colors:['#f8fafc'],inStock:true,stockCount:89,seller:'Syntra Official',deliveryDays:2,freeDelivery:true,tags:['health','blood pressure','medical']},
  {id:38,name:'Smart Dash Camera 4K',slug:'dash-camera',category:'automotive',brand:'AutoPrime',price:5999,originalPrice:8999,discount:33,rating:4.5,reviewCount:3456,image:'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=600&fit=crop'],description:'4K dual-channel dash cam with night vision and GPS.',features:['4K Front + 1080P Rear','Night Vision','GPS Logging','Emergency Recording'],specs:{'Resolution':'4K + 1080P','Display':'3" IPS'},colors:['#1a1a2e'],inStock:true,stockCount:78,seller:'AutoPrime Motors',deliveryDays:2,freeDelivery:true,tags:['dashcam','car','safety']},
  {id:39,name:'Portable Car Jump Starter',slug:'jump-starter',category:'automotive',brand:'AutoPrime',price:3999,originalPrice:5999,discount:33,rating:4.6,reviewCount:2345,image:'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',images:['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop'],description:'Compact 2000A jump starter with power bank and tire inflator.',features:['2000A Peak Current','20000mAh Power Bank','Built-in Tire Inflator','LED Emergency Light'],specs:{'Peak Current':'2000A','Capacity':'20000mAh'},colors:['#f59e0b','#1a1a2e'],inStock:true,stockCount:56,seller:'AutoPrime Motors',deliveryDays:2,freeDelivery:true,tags:['jump starter','car','emergency']},
];

// ---- Procedural Product Generator (12M+ virtual catalog) ----
const ADJECTIVES = ['Premium','Ultra','Pro','Elite','Smart','Advanced','Classic','Deluxe','Essential','Supreme','Royal','Turbo','Quantum','Neo','Apex'];
const SUFFIXES = ['Plus','X','Max','Lite','Air','Prime','SE','GT','EVO','V2'];

const PRODUCT_TEMPLATES = {
  electronics: ['Wireless Earbuds','Bluetooth Speaker','Tablet','Gaming Mouse','Mechanical Keyboard','Webcam','Power Bank','USB Hub','Monitor','Projector','Smart Plug','Security Camera','VR Headset','Portable SSD','Smart Display'],
  fashion: ['Hoodie','Sneakers','Backpack','Belt','Polo Shirt','Chinos','Blazer','Scarf','Wallet','Cap','Loafers','Shorts','Cardigan','Beanie','Tie'],
  home: ['Smart Thermostat','Blender','Toaster','Iron','Fan','Humidifier','Organizer','Candle Set','Rug','Plant Pot','Wall Clock','Mirror','Shelf','Diffuser','Air Fryer'],
  books: ['Data Science Handbook','Design Thinking','Creative Writing','Financial Freedom','Cooking Mastery','World History','Science Fiction Collection','Philosophy Today','Marketing 101','Leadership Guide','Psychology Basics','Art of War','Meditation Guide','Travel Diary','Poetry Anthology'],
  sports: ['Resistance Bands','Jump Rope','Foam Roller','Weight Gloves','Water Bottle','Sports Bag','Tennis Racket','Football','Basketball','Swimming Goggles','Climbing Harness','Skateboard','Boxing Gloves','Badminton Set','Cricket Bat'],
  beauty: ['Face Serum','Lip Balm Set','Nail Kit','Eye Cream','Body Lotion','Face Mask Pack','Makeup Brush Set','Foundation','Mascara','Concealer','Toner','Sunscreen','BB Cream','Highlighter','Blush Palette'],
  toys: ['RC Car','Puzzle Set','Building Blocks','Action Figures','Art Kit','Science Kit','Musical Toy','Dollhouse','Train Set','Card Games','Magic Set','Telescope','Microscope','Craft Kit','Stuffed Animal'],
  grocery: ['Honey','Olive Oil','Coffee Beans','Protein Bars','Nuts Mix','Spice Set','Pasta Pack','Rice Variety','Cereal','Jam Set','Sauce Collection','Snack Box','Energy Drinks','Organic Flour','Dried Herbs'],
  health: ['Multivitamins','Omega-3 Capsules','Immunity Booster','Sleep Aid','Probiotic','Collagen Powder','Eye Drops','First Aid Kit','Thermometer','Oximeter','Heating Pad','Ice Pack','Posture Corrector','Knee Brace','Wrist Support'],
  automotive: ['Car Cover','Seat Cushion','Phone Mount','Air Freshener','Cleaning Kit','Tire Inflator','LED Headlights','Floor Mats','Steering Wheel Cover','Trunk Organizer','Wiper Blades','Battery Charger','OBD Scanner','Roof Rack','GPS Tracker'],
};

const CATEGORY_IMAGES = {
  electronics: ['photo-1511707171634-5f897ff02aa9','photo-1496181133206-80ce9b88a853','photo-1505740420928-5e560c06d30e','photo-1593359677879-a4bb92f829d1','photo-1523275335684-37898b6baf30'],
  fashion: ['photo-1551028719-00167b16eac5','photo-1595777457583-95e059d581b8','photo-1542291026-7eec264c27ff','photo-1524592094714-0f0654e20314','photo-1572635196237-14b3f281503f'],
  home: ['photo-1585771724684-38269d6639fd','photo-1558618666-fcd25c85f82e','photo-1517668808822-9ebb02f2a0e6','photo-1631049035182-249067d7618e','photo-1507473885765-e6ed057ab6fe'],
  books: ['photo-1532012197267-da84d127e765','photo-1544716278-ca5e3f4abd8c','photo-1512820790803-83ca734da794','photo-1589998059171-988d887df646'],
  sports: ['photo-1601925260368-ae2f83cf8b7f','photo-1575311373937-040b8e1fd5b6','photo-1485965120184-e220f721d03e','photo-1504280390367-361c6d9f38f4'],
  beauty: ['photo-1556228578-0d85b1a4d571','photo-1522338242992-e1a54906a8da','photo-1541643600914-78b084683601'],
  toys: ['photo-1535378917042-10a22c95931a','photo-1507582020474-9a35b7d455d9','photo-1610890716171-6b1bb98ffd09'],
  grocery: ['photo-1556679343-c7306c1976bc','photo-1596591606975-97ee5cef3a1e','photo-1549007994-cb92caebd54b'],
  health: ['photo-1593095948071-474c5cc2c1cf','photo-1616530940355-351fabd9524b','photo-1559757175-7cb057fba93c'],
  automotive: ['photo-1617788138017-80ad40651399','photo-1558618666-fcd25c85f82e'],
};

// Deterministic seeded random
function seededRandom(seed) {
  let x = Math.sin(seed * 9301 + 49297) * 49153;
  return x - Math.floor(x);
}

export function generateProduct(id) {
  if (id <= 39) return SEED_PRODUCTS[id - 1];
  const seed = id;
  const r = (n) => Math.floor(seededRandom(seed + n) * 1000);
  const cats = Object.keys(PRODUCT_TEMPLATES);
  const cat = cats[r(1) % cats.length];
  const templates = PRODUCT_TEMPLATES[cat];
  const template = templates[r(2) % templates.length];
  const adj = ADJECTIVES[r(3) % ADJECTIVES.length];
  const suffix = SUFFIXES[r(4) % SUFFIXES.length];
  const brand = BRANDS[r(5) % BRANDS.length];
  const imgs = CATEGORY_IMAGES[cat];
  const img = imgs[r(6) % imgs.length];
  const basePrice = 500 + r(7) * 200;
  const discount = 10 + (r(8) % 45);
  const originalPrice = Math.round(basePrice / (1 - discount / 100));
  return {
    id,
    name: `${adj} ${template} ${suffix}`,
    slug: `${adj}-${template}-${suffix}`.toLowerCase().replace(/\s+/g, '-'),
    category: cat,
    brand,
    price: basePrice,
    originalPrice,
    discount,
    rating: 3.5 + (r(9) % 15) / 10,
    reviewCount: 100 + r(10) * 50,
    image: `https://images.unsplash.com/${img}?w=400&h=400&fit=crop`,
    images: [`https://images.unsplash.com/${img}?w=600&h=600&fit=crop`],
    description: `Discover the ${adj} ${template} ${suffix} by ${brand}. Exceptional quality and performance.`,
    features: [`Premium ${cat} product`, `By ${brand}`, `${discount}% discount`, 'Free returns'],
    specs: { Brand: brand, Category: cat },
    colors: r(11) % 3 === 0 ? ['#1a1a2e', '#c0c0c0'] : [],
    inStock: r(12) % 10 !== 0,
    stockCount: 10 + r(13) % 500,
    seller: `${brand} Store`,
    deliveryDays: 1 + (r(14) % 5),
    freeDelivery: r(15) % 3 !== 0,
    tags: [cat, template.toLowerCase(), brand.toLowerCase()],
  };
}

// Helpers
export function getProduct(id) {
  return generateProduct(id);
}

export function getProductsByCategory(cat, page = 1, limit = 20) {
  const result = [];
  // First check seed products
  for (const p of SEED_PRODUCTS) {
    if (p.category === cat) result.push(p);
  }
  // Generate more if needed
  let genId = 40;
  while (result.length < page * limit && genId < 1000) {
    const p = generateProduct(genId);
    if (p.category === cat) result.push(p);
    genId++;
  }
  return result.slice((page - 1) * limit, page * limit);
}

export function searchProducts(query, limit = 20) {
  const q = query.toLowerCase();
  const results = [];
  for (const p of SEED_PRODUCTS) {
    if (p.name.toLowerCase().includes(q) || p.category.includes(q) || p.brand.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.description.toLowerCase().includes(q)) {
      results.push(p);
    }
  }
  // Also try generated products
  for (let i = 40; i < 200 && results.length < limit; i++) {
    const p = generateProduct(i);
    if (p.name.toLowerCase().includes(q) || p.category.includes(q) || p.brand.toLowerCase().includes(q)) {
      results.push(p);
    }
  }
  return results.slice(0, limit);
}

export function formatPrice(p) {
  return '₹' + p.toLocaleString('en-IN');
}

export function getStars(rating) {
  let s = '';
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '★';
  for (let i = 0; i < 5 - full - (half ? 1 : 0); i++) s += '☆';
  return s;
}

export const DEALS = [
  { id: 1, productId: 7, endsIn: 7200, claimed: 67, total: 100, label: 'Lightning Deal' },
  { id: 2, productId: 16, endsIn: 14400, claimed: 45, total: 80, label: 'Deal of the Day' },
  { id: 3, productId: 26, endsIn: 3600, claimed: 89, total: 100, label: 'Lightning Deal' },
  { id: 4, productId: 9, endsIn: 10800, claimed: 34, total: 60, label: 'Limited Time' },
  { id: 5, productId: 30, endsIn: 5400, claimed: 56, total: 75, label: 'Flash Sale' },
  { id: 6, productId: 4, endsIn: 18000, claimed: 23, total: 50, label: 'Deal of the Day' },
  { id: 7, productId: 15, endsIn: 9000, claimed: 78, total: 100, label: 'Lightning Deal' },
  { id: 8, productId: 34, endsIn: 12000, claimed: 45, total: 60, label: 'Limited Time' },
];

export const COUPONS = [
  { code: 'WELCOME10', discount: 10, type: 'percent', minOrder: 500, maxDiscount: 1000, description: '10% off first order', active: true, expiresAt: '2026-12-31' },
  { code: 'SYNTRA500', discount: 500, type: 'flat', minOrder: 3000, maxDiscount: 500, description: '₹500 off on orders above ₹3000', active: true, expiresAt: '2026-06-30' },
  { code: 'FESTIVE20', discount: 20, type: 'percent', minOrder: 2000, maxDiscount: 5000, description: '20% off during festival sale', active: true, expiresAt: '2026-05-15' },
  { code: 'FREESHIPPER', discount: 0, type: 'shipping', minOrder: 0, maxDiscount: 0, description: 'Free shipping on any order', active: true, expiresAt: '2026-12-31' },
];

export const BANNERS = [
  { id: 1, title: 'Syntra Grand Sale', subtitle: 'Up to 70% off on Electronics', cta: 'Shop Now', gradient: 'linear-gradient(135deg, #7c3aed, #06b6d4)', category: 'electronics', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=400&fit=crop' },
  { id: 2, title: 'Fashion Week Special', subtitle: 'New Arrivals + Extra 20% Off', cta: 'Explore', gradient: 'linear-gradient(135deg, #ec4899, #f59e0b)', category: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop' },
  { id: 3, title: 'Home Makeover Sale', subtitle: 'Smart Home Essentials from ₹3,999', cta: 'Browse', gradient: 'linear-gradient(135deg, #10b981, #06b6d4)', category: 'home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&h=400&fit=crop' },
  { id: 4, title: 'Fitness February', subtitle: 'Gear up with FitPro — up to 40% off', cta: 'Shop Fitness', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', category: 'sports', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=400&fit=crop' },
];

export const SAMPLE_REVIEWS = [
  { userName: 'Rahul S.', rating: 5, title: 'Absolutely amazing!', comment: 'Best purchase I have made this year. Quality is outstanding and delivery was super fast.', date: '2026-03-15', helpful: 42 },
  { userName: 'Priya M.', rating: 4, title: 'Great value for money', comment: 'Really impressed with the build quality. Minor packaging issue but product is perfect.', date: '2026-03-10', helpful: 28 },
  { userName: 'Amit K.', rating: 5, title: 'Exceeded expectations', comment: 'Was skeptical at first but this product truly delivers on all its promises. Highly recommended!', date: '2026-02-28', helpful: 35 },
  { userName: 'Sneha R.', rating: 4, title: 'Very good product', comment: 'Using it daily and very satisfied. The features work exactly as described.', date: '2026-02-20', helpful: 19 },
  { userName: 'Vikram P.', rating: 3, title: 'Decent but could be better', comment: 'Good overall but I expected a bit more at this price point. Still, no major complaints.', date: '2026-02-15', helpful: 12 },
];

export const BUNDLES = [
  { products: [1, 3, 5], discount: 15 },
  { products: [2, 3, 17], discount: 12 },
  { products: [7, 10, 11], discount: 18 },
  { products: [22, 23, 35], discount: 15 },
  { products: [26, 27, 28], discount: 20 },
];
