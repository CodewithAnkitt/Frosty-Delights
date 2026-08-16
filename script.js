/**
 * =============================================
 * FROSTY DELIGHTS - Premium Ice Cream Shop
 * script.js - Main JavaScript File
 * =============================================
 */

/* ===== LOADING SCREEN ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Trigger initial animations after load
    initScrollAnimations();
  }, 2200);
});

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  handleBackToTop();
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ===== HERO SLIDER ===== */
const slides = document.querySelectorAll('.slide');
const sliderDotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let sliderInterval;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  sliderDotsContainer.appendChild(dot);
});

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  document.querySelectorAll('.dot')[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }

function startSlider() {
  sliderInterval = setInterval(nextSlide, 3500);
}
function stopSlider() { clearInterval(sliderInterval); }

startSlider();
document.querySelector('.hero').addEventListener('mouseenter', stopSlider);
document.querySelector('.hero').addEventListener('mouseleave', startSlider);

/* ===== FLOATING PARTICLES ===== */
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#ff6b9d', '#ffd166', '#06d6a0', '#a8edea', '#fcb69f', '#e0c3fc'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 12 + 4;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ===== SCROLL ANIMATIONS (AOS-like) ===== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        // Trigger counter animation when stats come into view
        if (entry.target.classList.contains('stats-grid')) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
  document.querySelectorAll('.stats-grid').forEach(el => observer.observe(el));
}

/* ===== COUNTER ANIMATION ===== */
let countersAnimated = false;
function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current).toLocaleString('en-IN');
    }, 16);
  });
}

/* ===== BACK TO TOP ===== */
const backToTopBtn = document.getElementById('backToTop');
function handleBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== DARK / LIGHT MODE TOGGLE ===== */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeToggle.innerHTML = theme === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

/* ===== MENU DATA & RENDERING ===== */

// ── Cones ──
const menuItems = [
  { id: 1,  name: 'Chocolate Crunch Cone',    desc: 'Crispy waffle cone packed with rich chocolate ice cream & crunchy choco chips', price: 99,  emoji: '🍦', category: 'cones',   bg: 'linear-gradient(135deg,#3d1c02,#d4a574)', badge: 'Best Seller', stars: 5, bestseller: true  },
  { id: 2,  name: 'Butterscotch Swirl Cone',  desc: 'Golden butterscotch swirled into a creamy soft-serve on a sugar cone',         price: 109, emoji: '🍦', category: 'cones',   bg: 'linear-gradient(135deg,#f6d365,#e08a00)', badge: 'Popular',     stars: 4, bestseller: false },
  { id: 3,  name: 'Strawberry Delight Cone',  desc: 'Luscious fresh strawberry soft-serve topped with berry drizzle',                price: 99,  emoji: '🍦', category: 'cones',   bg: 'linear-gradient(135deg,#fda085,#f6d365)', badge: 'Fruity',      stars: 5, bestseller: false },
  { id: 4,  name: 'Belgian Chocolate Cone',   desc: 'Premium Belgian chocolate dipped waffle cone with velvety dark chocolate fill', price: 129, emoji: '🍦', category: 'cones',   bg: 'linear-gradient(135deg,#2c1810,#7b4f2e)', badge: 'Luxury',      stars: 5, bestseller: true  },
  { id: 5,  name: 'Vanilla Caramel Cone',     desc: 'Smooth vanilla soft-serve drizzled with golden caramel on a waffle cone',      price: 89,  emoji: '🍦', category: 'cones',   bg: 'linear-gradient(135deg,#ffecd2,#ffd166)', badge: 'Classic',     stars: 4, bestseller: false },

  // ── Scoops ──
  { id: 6,  name: 'Classic Vanilla Scoop',    desc: 'Hand-scooped Madagascar vanilla bean ice cream, timeless and creamy',           price: 69,  emoji: '🍨', category: 'scoops',  bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', badge: 'Classic',     stars: 5, bestseller: false },
  { id: 7,  name: 'Rich Chocolate Scoop',     desc: 'Deep dark Belgian chocolate scoop, intensely satisfying with every bite',       price: 79,  emoji: '🍨', category: 'scoops',  bg: 'linear-gradient(135deg,#d4a574,#8b4513)', badge: 'Popular',     stars: 5, bestseller: true  },
  { id: 8,  name: 'Mango Magic Scoop',        desc: 'Tropical Alphonso mango scoop, sunshine in every creamy spoonful',             price: 89,  emoji: '🍨', category: 'scoops',  bg: 'linear-gradient(135deg,#f9d423,#ff9a3c)', badge: 'Seasonal',    stars: 4, bestseller: false },
  { id: 9,  name: 'Blueberry Cheesecake',     desc: 'Tangy cream cheese base with fresh blueberry compote ribbons',                 price: 99,  emoji: '🍨', category: 'scoops',  bg: 'linear-gradient(135deg,#667eea,#764ba2)', badge: 'Premium',     stars: 5, bestseller: true  },
  { id: 10, name: 'Cookies & Cream Scoop',    desc: 'Velvety vanilla loaded with crushed Oreo cookies throughout',                  price: 109, emoji: '🍨', category: 'scoops',  bg: 'linear-gradient(135deg,#2c3e50,#bdc3c7)', badge: 'Fav',         stars: 5, bestseller: false },

  // ── Sticks ──
  { id: 11, name: 'Choco Bar Stick',          desc: 'Classic creamy vanilla bar coated in a thick Belgian chocolate shell',         price: 79,  emoji: '🍫', category: 'sticks',  bg: 'linear-gradient(135deg,#3d1c02,#7b4f2e)', badge: 'Classic',     stars: 5, bestseller: true  },
  { id: 12, name: 'Almond Crunch Stick',      desc: 'Premium ice cream bar coated in dark chocolate studded with roasted almonds',  price: 99,  emoji: '🍫', category: 'sticks',  bg: 'linear-gradient(135deg,#6b3a2a,#c8956c)', badge: 'Crunchy',     stars: 5, bestseller: false },
  { id: 13, name: 'Dark Chocolate Stick',     desc: '70% cacao dark chocolate coating over a smooth milk ice cream centre',         price: 119, emoji: '🍫', category: 'sticks',  bg: 'linear-gradient(135deg,#1a0a00,#4a2800)', badge: 'Intense',     stars: 4, bestseller: false },
  { id: 14, name: 'Strawberry Cream Stick',   desc: 'Strawberry sorbet core wrapped in a white chocolate & cream shell',           price: 89,  emoji: '🍫', category: 'sticks',  bg: 'linear-gradient(135deg,#fda085,#f6d365)', badge: 'Fruity',      stars: 4, bestseller: false },
  { id: 15, name: 'Caramel Fudge Stick',      desc: 'Buttery caramel fudge ice cream bar dipped in toffee chocolate coating',      price: 109, emoji: '🍫', category: 'sticks',  bg: 'linear-gradient(135deg,#f6d365,#e08a00)', badge: 'Best Seller', stars: 5, bestseller: true  },

  // ── Family Packs ──
  { id: 16, name: 'Vanilla Family Tub',       desc: 'Signature Madagascar vanilla — 1L tub, perfect for the whole family',         price: 299, emoji: '🧊', category: 'family',  bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', badge: '1 Litre',     stars: 5, bestseller: false, size: '1 L'   },
  { id: 17, name: 'Chocolate Family Tub',     desc: 'Rich Belgian chocolate ice cream — 1L family tub for every choco lover',      price: 349, emoji: '🧊', category: 'family',  bg: 'linear-gradient(135deg,#d4a574,#3d1c02)', badge: '1 Litre',     stars: 5, bestseller: true,  size: '1 L'   },
  { id: 18, name: 'Butterscotch Family Tub',  desc: 'Creamy butterscotch with caramel chips — 1L take-home tub',                  price: 329, emoji: '🧊', category: 'family',  bg: 'linear-gradient(135deg,#f6d365,#e08a00)', badge: '1 Litre',     stars: 4, bestseller: false, size: '1 L'   },
  { id: 19, name: 'Mixed Fruit Family Tub',   desc: 'Refreshing medley of tropical fruits in every scoop — 1L tub',               price: 359, emoji: '🧊', category: 'family',  bg: 'linear-gradient(135deg,#f9d423,#ff4e50)', badge: '1 Litre',     stars: 4, bestseller: false, size: '1 L'   },
  { id: 20, name: 'Premium Assorted Pack',    desc: '1.5L luxury assorted box — 3 premium flavors in one celebration pack',       price: 499, emoji: '🧊', category: 'family',  bg: 'linear-gradient(135deg,#667eea,#764ba2)', badge: '1.5 Litres',  stars: 5, bestseller: true,  size: '1.5 L' },

  // ── Frosty Delights Special ──
  { id: 21, name: 'Royal Belgian Choco Sundae', desc: 'Layers of Belgian chocolate ice cream, warm brownie & gold caramel drizzle', price: 199, emoji: '🌟', category: 'special', bg: 'linear-gradient(135deg,#1a0a00,#7b4f2e)', badge: 'Signature',   stars: 5, bestseller: true  },
  { id: 22, name: 'Brownie Blast Sundae',      desc: 'Fudgy brownie chunks, hot chocolate sauce, whipped cream & rainbow chips',  price: 229, emoji: '🌟', category: 'special', bg: 'linear-gradient(135deg,#3d1c02,#c0392b)', badge: 'Indulgent',   stars: 5, bestseller: false },
  { id: 23, name: 'Rainbow Sprinkle Fantasy',  desc: 'Five-flavor ice cream tower crowned with rainbow sprinkles & fairy dust',   price: 189, emoji: '🌟', category: 'special', bg: 'linear-gradient(135deg,#f9d423,#ff4e50,#06d6a0)', badge: 'Colorful', stars: 5, bestseller: false },
  { id: 24, name: 'Ferrero Crunch Delight',    desc: 'Creamy hazelnut ice cream with Ferrero pieces and crispy wafer crumble',    price: 249, emoji: '🌟', category: 'special', bg: 'linear-gradient(135deg,#6b3a2a,#c8956c)', badge: 'Luxury',      stars: 5, bestseller: true  },
  { id: 25, name: 'Ultimate Frosty Paradise',  desc: 'Our grandest creation — 5 scoops, 3 sauces, waffle, fruits & sparkle',     price: 299, emoji: '🌟', category: 'special', bg: 'linear-gradient(135deg,#a18cd1,#fbc2eb)',  badge: 'Ultimate',    stars: 5, bestseller: true  },
];

/* ── Star rating renderer ── */
function renderStars(count) {
  return '★'.repeat(count) + '☆'.repeat(5 - count);
}

/* ── Single card HTML builder ── */
function buildMenuCard(item) {
  const sizeTag  = item.size       ? `<span class="card-size-tag"><i class="fas fa-box-open"></i> ${item.size}</span>` : '';
  const bsBadge  = item.bestseller ? `<div class="card-bs-badge">🏆 Best Seller</div>` : '';
  return `
    <div class="menu-card" data-category="${item.category}">
      <div class="card-img" style="background:${item.bg}">
        <span class="card-emoji">${item.emoji}</span>
        ${bsBadge}
        <div class="card-badge">${item.badge}</div>
      </div>
      <div class="card-body">
        <div class="card-meta-row">
          ${sizeTag}
          <span class="card-stars">${renderStars(item.stars)}</span>
        </div>
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          <div class="card-price">₹${item.price}</div>
          <button class="add-to-cart" data-id="${item.id}">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>`;
}

/* ── Render menu with filter + fade animation ── */
function renderMenu(filter = 'all') {
  const grid = document.getElementById('menuGrid');

  // Fade out
  grid.classList.add('fading');

  setTimeout(() => {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);
    filtered.forEach(item => { grid.insertAdjacentHTML('beforeend', buildMenuCard(item)); });

    // Fade in
    grid.classList.remove('fading');

    // Attach add-to-cart listeners
    grid.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        addToCart(id);
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.style.background = 'linear-gradient(135deg,#06d6a0,#0ab87a)';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-plus"></i> Add';
          btn.style.background = '';
        }, 1500);
      });
    });
  }, 220);
}

renderMenu();

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.getAttribute('data-filter'));
  });
});

/* ===== SHOPPING CART ===== */
let cart = JSON.parse(localStorage.getItem('frostyCart')) || [];

const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCart(); }
}

function saveCart() {
  localStorage.setItem('frostyCart', JSON.stringify(cart));
}

function renderCart() {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = count;
  cartTotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <span>🍦</span>
        <p>Your cart is empty!</p>
      </div>`;
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
}

// Initialize cart on load
renderCart();

/* ===== COUNTDOWN TIMER ===== */
function startCountdown() {
  // Set target to 3 days from now
  const saved = localStorage.getItem('frostyCountdownEnd');
  let endTime;
  if (saved) {
    endTime = parseInt(saved);
    if (endTime < Date.now()) {
      endTime = Date.now() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem('frostyCountdownEnd', endTime);
    }
  } else {
    endTime = Date.now() + 3 * 24 * 60 * 60 * 1000;
    localStorage.setItem('frostyCountdownEnd', endTime);
  }

  function update() {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('days').textContent = String(d).padStart(2, '0');
    document.getElementById('hours').textContent = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}
startCountdown();

/* ===== GALLERY ===== */
const galleryData = [
  { emoji: '🍦', label: 'Vanilla Delight', bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', height: '220px' },
  { emoji: '🍫', label: 'Chocolate Heaven', bg: 'linear-gradient(135deg,#d4a574,#8b4513)', height: '160px' },
  { emoji: '🍓', label: 'Strawberry Dream', bg: 'linear-gradient(135deg,#fda085,#f6d365)', height: '280px' },
  { emoji: '🥭', label: 'Mango Magic', bg: 'linear-gradient(135deg,#f9d423,#ff9a3c)', height: '180px' },
  { emoji: '🌈', label: 'Rainbow Sundae', bg: 'linear-gradient(135deg,#f9d423,#ff4e50)', height: '240px' },
  { emoji: '🍒', label: 'Black Forest', bg: 'linear-gradient(135deg,#434343,#000)', height: '200px' },
  { emoji: '🫐', label: 'Blueberry Burst', bg: 'linear-gradient(135deg,#667eea,#764ba2)', height: '260px' },
  { emoji: '🌿', label: 'Mint Fresh', bg: 'linear-gradient(135deg,#96fbc4,#a8edea)', height: '180px' },
  { emoji: '🍪', label: 'Oreo Crunch', bg: 'linear-gradient(135deg,#2c3e50,#bdc3c7)', height: '220px' },
];

let currentLightboxIndex = 0;

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  galleryData.forEach((item, i) => {
    const el = document.createElement('div');
    el.classList.add('gallery-item');
    el.innerHTML = `
      <div class="gallery-thumb" style="background:${item.bg};height:${item.height}">
        <span>${item.emoji}</span>
        <p>${item.label}</p>
      </div>
      <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
    `;
    el.addEventListener('click', () => openLightbox(i));
    grid.appendChild(el);
  });
}
renderGallery();

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function updateLightbox() {
  const item = galleryData[currentLightboxIndex];
  document.getElementById('lightboxContent').innerHTML = `
    <div style="background:${item.bg};border-radius:16px;padding:40px;font-size:6rem;text-align:center">
      ${item.emoji}
      <p style="font-size:1.2rem;font-weight:700;margin-top:12px">${item.label}</p>
    </div>
  `;
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
  updateLightbox();
});
document.getElementById('lightboxNext').addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
  updateLightbox();
});
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});
// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length; updateLightbox(); }
});

/* ===== REVIEWS SLIDER ===== */
const reviews = [
  { name: 'Priya Sharma', role: 'Food Blogger', emoji: '👩', stars: 5, text: '"Frosty Delights is hands down the best ice cream shop in Delhi! The Belgian Chocolate flavor is absolutely divine. I visit every weekend and never get tired of it!"' },
  { name: 'Rahul Mehta', role: 'Regular Customer', emoji: '👨', stars: 5, text: '"The Rainbow Sundae is a work of art! My kids absolutely love it. The staff is so friendly and the ambiance is perfect for family outings. Highly recommended!"' },
  { name: 'Ananya Patel', role: 'Food Enthusiast', emoji: '👩‍🦱', stars: 5, text: '"I tried the Mango Magic and it transported me straight to summer! The freshness of the ingredients is unmatched. This is my go-to place for celebrations."' },
  { name: 'Vikram Singh', role: 'Corporate Professional', emoji: '👨‍💼', stars: 5, text: '"Booked a table for my anniversary and the team went above and beyond. The special decoration and complimentary scoop made it truly memorable. Thank you Frosty Delights!"' },
  { name: 'Meera Nair', role: 'Dessert Lover', emoji: '👩‍🍳', stars: 5, text: '"The Butterscotch Bliss is my absolute weakness! I have tried ice cream all over India and nothing comes close to the quality here. Pure happiness in every scoop!"' },
];

let currentReview = 0;
let reviewInterval;

function renderReviews() {
  const slider = document.getElementById('reviewsSlider');
  const dotsContainer = document.getElementById('reviewDots');
  slider.innerHTML = '';
  dotsContainer.innerHTML = '';

  reviews.forEach((r, i) => {
    const card = document.createElement('div');
    card.classList.add('review-card');
    card.innerHTML = `
      <div class="review-avatar">${r.emoji}</div>
      <div class="review-stars">${'★'.repeat(r.stars)}</div>
      <p class="review-text">${r.text}</p>
      <div class="review-name">${r.name}</div>
      <div class="review-role">${r.role}</div>
    `;
    slider.appendChild(card);

    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToReview(i));
    dotsContainer.appendChild(dot);
  });
}

function goToReview(index) {
  currentReview = (index + reviews.length) % reviews.length;
  document.getElementById('reviewsSlider').style.transform = `translateX(-${currentReview * 100}%)`;
  document.querySelectorAll('#reviewDots .dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentReview);
  });
}

renderReviews();

document.getElementById('reviewPrev').addEventListener('click', () => {
  goToReview(currentReview - 1);
  resetReviewInterval();
});
document.getElementById('reviewNext').addEventListener('click', () => {
  goToReview(currentReview + 1);
  resetReviewInterval();
});

function startReviewInterval() {
  reviewInterval = setInterval(() => goToReview(currentReview + 1), 4000);
}
function resetReviewInterval() {
  clearInterval(reviewInterval);
  startReviewInterval();
}
startReviewInterval();

/* ===== BOOKING FORM VALIDATION ===== */
const bookingForm = document.getElementById('bookingForm');

// Set minimum date to today
const dateInput = document.getElementById('bookDate');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateBookingForm()) {
    showBookingPopup();
    bookingForm.reset();
  }
});

function validateBookingForm() {
  let valid = true;

  // Name
  const name = document.getElementById('guestName');
  const nameErr = document.getElementById('nameError');
  if (!name.value.trim() || name.value.trim().length < 2) {
    showError(name, nameErr, 'Please enter your full name (min 2 characters)');
    valid = false;
  } else { clearError(name, nameErr); }

  // Email
  const email = document.getElementById('guestEmail');
  const emailErr = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, emailErr, 'Please enter a valid email address');
    valid = false;
  } else { clearError(email, emailErr); }

  // Phone
  const phone = document.getElementById('guestPhone');
  const phoneErr = document.getElementById('phoneError');
  const phoneRegex = /^[+]?[\d\s\-]{10,15}$/;
  if (!phoneRegex.test(phone.value.trim())) {
    showError(phone, phoneErr, 'Please enter a valid 10-digit mobile number');
    valid = false;
  } else { clearError(phone, phoneErr); }

  // Guests
  const guests = document.getElementById('guestCount');
  const guestErr = document.getElementById('guestError');
  if (!guests.value) {
    showError(guests, guestErr, 'Please select number of guests');
    valid = false;
  } else { clearError(guests, guestErr); }

  // Date
  const date = document.getElementById('bookDate');
  const dateErr = document.getElementById('dateError');
  if (!date.value) {
    showError(date, dateErr, 'Please select a date');
    valid = false;
  } else { clearError(date, dateErr); }

  // Time
  const time = document.getElementById('bookTime');
  const timeErr = document.getElementById('timeError');
  if (!time.value) {
    showError(time, timeErr, 'Please select a time');
    valid = false;
  } else { clearError(time, timeErr); }

  return valid;
}

function showError(input, errEl, msg) {
  input.classList.add('error');
  errEl.textContent = msg;
}
function clearError(input, errEl) {
  input.classList.remove('error');
  errEl.textContent = '';
}

// Real-time validation on input
['guestName','guestEmail','guestPhone','guestCount','bookDate','bookTime'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const errEl = document.getElementById(id.replace('guest','').replace('book','').toLowerCase() + 'Error');
    // Map field IDs to error IDs
    const errMap = {
      guestName: 'nameError', guestEmail: 'emailError',
      guestPhone: 'phoneError', guestCount: 'guestError',
      bookDate: 'dateError', bookTime: 'timeError'
    };
    const err = document.getElementById(errMap[id]);
    if (err) err.textContent = '';
  });
});

function showBookingPopup() {
  const popup = document.getElementById('bookingPopup');
  popup.classList.add('open');
}
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('bookingPopup').classList.remove('open');
});
document.getElementById('bookingPopup').addEventListener('click', (e) => {
  if (e.target === document.getElementById('bookingPopup')) {
    document.getElementById('bookingPopup').classList.remove('open');
  }
});

/* ===== NEWSLETTER FORM ===== */
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsletterMsg');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    msg.textContent = '⚠️ Please enter a valid email address.';
    msg.style.color = '#ff6b6b';
  } else {
    msg.textContent = '🎉 Thank you for subscribing! Sweet deals coming your way!';
    msg.style.color = '#06d6a0';
    email.value = '';
    setTimeout(() => { msg.textContent = ''; }, 5000);
  }
});

/* ===== SMOOTH SCROLLING for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ===== PARALLAX EFFECT on hero ===== */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    const scoops = document.querySelectorAll('.scoop');
    scoops.forEach((s, i) => {
      const speed = 0.1 + i * 0.05;
      s.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

/* ===== OFFER CARD HOVER PULSE ===== */
document.querySelectorAll('.offer-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.animation = 'none';
  });
});

/* ===== INIT on DOMContentLoaded ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer if needed
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());
});

/* ===== TOUCH SWIPE for hero slider ===== */
let touchStartX = 0;
let touchEndX = 0;
const heroEl = document.querySelector('.hero');
heroEl.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
heroEl.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) goToSlide(currentSlide + 1);
    else goToSlide(currentSlide - 1);
  }
});

/* ===== TOUCH SWIPE for reviews ===== */
let reviewTouchStartX = 0;
const reviewsEl = document.querySelector('.reviews-slider-wrapper');
if (reviewsEl) {
  reviewsEl.addEventListener('touchstart', (e) => { reviewTouchStartX = e.changedTouches[0].screenX; }, { passive: true });
  reviewsEl.addEventListener('touchend', (e) => {
    const diff = reviewTouchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToReview(currentReview + 1);
      else goToReview(currentReview - 1);
      resetReviewInterval();
    }
  });
}

console.log('%c🍦 Frosty Delights - Premium Ice Cream Shop', 'color:#ff6b9d;font-size:18px;font-weight:bold;');
console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'color:#ffd166;font-size:12px;');
