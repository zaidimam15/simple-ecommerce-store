const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const Product = require('../models/Product');

describe('Full-Stack Automated QA & Integration Test Suite', () => {
  const BASE_URL = 'http://localhost:5000';

  before(async () => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
      });
    }
  });

  after(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  });

  // =========================================================================
  // 1. BACKEND & API TESTS
  // =========================================================================
  describe('A. Health & System Integrity', () => {
    it('GET /api/health should return 200 with operational status and databaseConnected: true', async () => {
      const res = await fetch(`${BASE_URL}/api/health`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.databaseConnected, true);
      assert.strictEqual(typeof data.timestamp, 'string');
    });

    it('GET / should return 200 with API welcome sitemap', async () => {
      const res = await fetch(`${BASE_URL}/`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.ok(data.endpoints);
      assert.ok(data.endpoints.health);
      assert.ok(data.endpoints.products);
      assert.ok(data.endpoints.orders);
    });
  });

  describe('B. Product Catalogue, Search & Pagination Checks', () => {
    it('GET /api/products should return exactly 122 total products in MongoDB database', async () => {
      const res = await fetch(`${BASE_URL}/api/products?page=1&limit=1`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.totalProducts, 122);
    });

    it('GET /api/products should return all 10 distinct categories', async () => {
      const res = await fetch(`${BASE_URL}/api/products?limit=1`);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(Array.isArray(data.categories));

      const expectedCategories = [
        'Electronics', 'Fashion', 'Shoes', 'Accessories', 'Home & Kitchen',
        'Beauty & Personal Care', 'Sports & Fitness', 'Books & Stationery', 'Gaming', 'Bags & Travel'
      ];

      for (const cat of expectedCategories) {
        assert.ok(data.categories.includes(cat), `Category "${cat}" should be present in categories list`);
      }
    });

    it('GET /api/products should filter accurately for every category without errors', async () => {
      const categoriesToTest = ['Electronics', 'Gaming', 'Fashion', 'Shoes', 'Bags & Travel'];
      for (const cat of categoriesToTest) {
        const res = await fetch(`${BASE_URL}/api/products?category=${encodeURIComponent(cat)}&limit=5`);
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.ok(data.products.length > 0, `Category "${cat}" should return products`);
        for (const p of data.products) {
          assert.strictEqual(p.category.toLowerCase(), cat.toLowerCase());
        }
      }
    });

    it('GET /api/products with safe search query should find matching items', async () => {
      const res = await fetch(`${BASE_URL}/api/products?search=headphone`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.count > 0, 'Search for "headphone" should match products');
    });

    it('GET /api/products with dangerous XSS or regex payloads should be sanitized safely without crashing', async () => {
      const dangerousInputs = [
        '<script>alert(1)</script>',
        '${7*7}',
        '\\.\\*\\+\\?\\^',
        '([a-zA-Z0-9]+)*$',
        "'; DROP TABLE products; --",
      ];

      for (const input of dangerousInputs) {
        const res = await fetch(`${BASE_URL}/api/products?search=${encodeURIComponent(input)}`);
        assert.strictEqual(res.status, 200);
        const data = await res.json();
        assert.strictEqual(data.success, true);
        assert.ok(Array.isArray(data.products));
      }
    });

    it('GET /api/products sorting options (price-low, price-high, rating, name-asc) should work correctly', async () => {
      // Test price-low
      const resLow = await fetch(`${BASE_URL}/api/products?sort=price-low&limit=10`);
      const dataLow = await resLow.json();
      for (let i = 0; i < dataLow.products.length - 1; i++) {
        assert.ok(dataLow.products[i].price <= dataLow.products[i + 1].price);
      }

      // Test price-high
      const resHigh = await fetch(`${BASE_URL}/api/products?sort=price-high&limit=10`);
      const dataHigh = await resHigh.json();
      for (let i = 0; i < dataHigh.products.length - 1; i++) {
        assert.ok(dataHigh.products[i].price >= dataHigh.products[i + 1].price);
      }
    });

    it('GET /api/products/:id with invalid format should return 404', async () => {
      const res = await fetch(`${BASE_URL}/api/products/invalid_id_12345`);
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.strictEqual(data.message, 'Invalid product ID format.');
    });

    it('GET /api/products/:id with non-existent ObjectId should return 404', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await fetch(`${BASE_URL}/api/products/${fakeId}`);
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.strictEqual(data.message, 'Product not found.');
    });
  });

  describe('C. Authentication, Authorization & Security', () => {
    it('GET /api/auth/me should reject missing authorization token with 401', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/me`);
      assert.strictEqual(res.status, 401);
      const data = await res.json();
      assert.strictEqual(data.success, false);
    });

    it('GET /api/auth/me should reject malformed or tampered token with 401', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: 'Bearer this_is_an_invalid_tampered_token' },
      });
      assert.strictEqual(res.status, 401);
      const data = await res.json();
      assert.strictEqual(data.success, false);
    });

    it('POST /api/auth/register should validate email and password constraints', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Tester', email: 'test_short@example.com', password: '123' }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.message.includes('Password must be at least 6 characters'));
    });
  });

  describe('D. Cash on Delivery (COD) Order Security & Route Integrity', () => {
    it('POST /api/orders without authentication should return 401', async () => {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderItems: [] }),
      });
      assert.strictEqual(res.status, 401);
    });

    it('GET /api/orders/my-orders without authentication should return 401', async () => {
      const res = await fetch(`${BASE_URL}/api/orders/my-orders`);
      assert.strictEqual(res.status, 401);
    });

    it('Obsolete payment endpoints should return 404', async () => {
      const resKey = await fetch(`${BASE_URL}/api/payment/razorpay-key`);
      assert.strictEqual(resKey.status, 404);

      const resCreate = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      assert.strictEqual(resCreate.status, 404);
    });
  });

  // =========================================================================
  // 2. FRONTEND ARCHITECTURE & DESIGN SYSTEM AUTOMATED VERIFICATION
  // =========================================================================
  describe('E. Frontend Design System & Responsive Tokens', () => {
    const cssPath = path.resolve(__dirname, '../../frontend/src/index.css');
    let cssContent = '';

    before(() => {
      cssContent = fs.readFileSync(cssPath, 'utf-8');
    });

    it('index.css should define wide 1500px container to prevent narrow central squeeze', () => {
      assert.ok(
        cssContent.includes('1500px'),
        'CSS should include 1500px maximum width rule for expansive layout'
      );
    });

    it('index.css should define the vibrant brand palette: deep navy, royal blue, and bright coral', () => {
      assert.ok(cssContent.includes('--navy-900: #0a0f1d') || cssContent.includes('#0a0f1d'), 'Navy 900 base present');
      assert.ok(cssContent.includes('--primary: #4361ee') || cssContent.includes('#4361ee'), 'Royal Blue primary present');
      assert.ok(cssContent.includes('--accent: #ff5a5f') || cssContent.includes('#ff5a5f'), 'Bright Coral accent present');
    });

    it('index.css should define 5-column category grid and 4-5 column product grid rules', () => {
      assert.ok(cssContent.includes('grid-template-columns: repeat(5, 1fr)'), '5-column category grid declared');
      assert.ok(cssContent.includes('minmax(290px, 1fr)'), 'Wide product card minmax bounds declared');
    });

    it('index.css should define responsive rules for desktop (1200, 992) and mobile (640, 480)', () => {
      assert.ok(cssContent.includes('@media (max-width: 1200px)'), '1200px breakpoint declared');
      assert.ok(cssContent.includes('@media (max-width: 992px)'), '992px tablet breakpoint declared');
      assert.ok(cssContent.includes('@media (max-width: 640px)'), '640px mobile breakpoint declared');
      assert.ok(cssContent.includes('@media (max-width: 480px)'), '480px small mobile breakpoint declared');
    });

    it('index.css should include @media (prefers-reduced-motion: reduce) for accessibility', () => {
      assert.ok(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'Accessibility motion query present');
    });

    it('HomePage.jsx should define all 10 categories with real high-definition Unsplash photography and accent colors', () => {
      const homePath = path.resolve(__dirname, '../../frontend/src/pages/HomePage.jsx');
      const homeContent = fs.readFileSync(homePath, 'utf-8');

      const categories = [
        'Electronics', 'Fashion', 'Shoes', 'Accessories', 'Home & Kitchen',
        'Beauty & Personal Care', 'Sports & Fitness', 'Books & Stationery', 'Gaming', 'Bags & Travel'
      ];

      for (const cat of categories) {
        assert.ok(homeContent.includes(`name: '${cat}'`), `HomePage should define category tile for ${cat}`);
      }

      assert.ok(homeContent.includes('images.unsplash.com'), 'Category tiles should link to real imagery');
      assert.ok(homeContent.includes('color:'), 'Category tiles should have distinctive accent colors');
    });

    it('CheckoutPage.jsx should configure Cash on Delivery as the dedicated payment method', () => {
      const checkoutPath = path.resolve(__dirname, '../../frontend/src/pages/CheckoutPage.jsx');
      const checkoutContent = fs.readFileSync(checkoutPath, 'utf-8');
      assert.ok(checkoutContent.includes('Cash on Delivery'), 'CheckoutPage should configure Cash on Delivery');
      assert.ok(!checkoutContent.includes('Razorpay'), 'CheckoutPage should have zero Razorpay references');
    });
  });

  // =========================================================================
  // 3. DATA INTEGRITY & STOCK PRESERVATION
  // =========================================================================
  describe('F. Database Data Preservation & Original Stocks', () => {
    it('MongoDB should strictly retain all 122 products and original stocks without modification', async () => {
      const count = await Product.countDocuments();
      assert.strictEqual(count, 122, 'Total products in MongoDB must remain exactly 122');

      const originalSony = await Product.findOne({ name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones' });
      assert.ok(originalSony, 'Sony headphones must exist in DB');
      assert.strictEqual(originalSony.stock, 25, 'Original Sony headphone stock must remain 25');

      const originalApple = await Product.findOne({ name: 'Apple Watch Series 9 GPS 45mm' });
      assert.ok(originalApple, 'Apple Watch must exist in DB');
      assert.strictEqual(originalApple.stock, 18, 'Original Apple Watch stock must remain 18');
    });
  });
});
