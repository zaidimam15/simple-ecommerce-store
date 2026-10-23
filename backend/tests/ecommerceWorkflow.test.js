const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const app = require('../server');

// Helper to simulate HTTP requests to Express app
const makeRequest = (method, reqPath, headers = {}, body = null) => {
  return new Promise((resolve, reject) => {
    const http = require('http');
    const server = http.createServer(app);

    server.listen(0, () => {
      const port = server.address().port;
      const options = {
        hostname: '127.0.0.1',
        port,
        path: reqPath,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      const req = http.request(options, (res) => {
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          server.close();
          try {
            const parsed = rawData ? JSON.parse(rawData) : {};
            resolve({ status: res.statusCode, data: parsed, raw: rawData });
          } catch (e) {
            resolve({ status: res.statusCode, raw: rawData });
          }
        });
      });

      req.on('error', (err) => {
        server.close();
        reject(err);
      });

      if (body) {
        req.write(typeof body === 'string' ? body : JSON.stringify(body));
      }
      req.end();
    });
  });
};

describe('E-commerce Catalogue Workflow & Live API Tests', () => {
  let sampleProductId = null;

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

  it('GET /api/products should return paginated catalogue with at least 100 total products', async () => {
    const res = await makeRequest('GET', '/api/products');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(typeof res.data.totalProducts, 'number');
    assert.strictEqual(
      res.data.totalProducts >= 100,
      true,
      `Expected totalProducts >= 100, received ${res.data.totalProducts}`
    );
    assert.strictEqual(Array.isArray(res.data.products), true);
    assert.strictEqual(res.data.products.length <= 12, true);
    assert.strictEqual(res.data.page, 1);
    assert.strictEqual(res.data.limit, 12);
    assert.strictEqual(Array.isArray(res.data.categories), true);
    assert.strictEqual(res.data.categories.includes('All'), true);

    if (res.data.products.length > 0) {
      sampleProductId = res.data.products[0]._id;
    }
  });

  it('GET /api/products?page=2&limit=6 should return the second page accurately', async () => {
    const res = await makeRequest('GET', '/api/products?page=2&limit=6');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.page, 2);
    assert.strictEqual(res.data.limit, 6);
    assert.strictEqual(res.data.count, 6);
    assert.strictEqual(res.data.hasMore, true);
  });

  it('GET /api/products?category=Gaming should filter strictly by category', async () => {
    const res = await makeRequest('GET', '/api/products?category=Gaming');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.totalProducts >= 10, true);
    for (const prod of res.data.products) {
      assert.strictEqual(prod.category.toLowerCase(), 'gaming');
    }
  });

  it('GET /api/products?search=keyboard should return relevant matching items', async () => {
    const res = await makeRequest('GET', '/api/products?search=keyboard');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.totalProducts >= 1, true);
    for (const prod of res.data.products) {
      const matchInName = prod.name.toLowerCase().includes('keyboard');
      const matchInDesc = prod.description.toLowerCase().includes('keyboard');
      assert.strictEqual(matchInName || matchInDesc, true);
    }
  });

  it('GET /api/products with special characters in search should not crash or throw ReDoS error', async () => {
    const res = await makeRequest('GET', '/api/products?search=(test)*[abc]+$');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.count, 0);
  });

  it('GET /api/products?sort=price-low should sort products by ascending price', async () => {
    const res = await makeRequest('GET', '/api/products?sort=price-low&limit=10');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    const prices = res.data.products.map((p) => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
      assert.strictEqual(prices[i] <= prices[i + 1], true, `Prices not ascending: ${prices[i]} > ${prices[i + 1]}`);
    }
  });

  it('GET /api/products?sort=price-high should sort products by descending price', async () => {
    const res = await makeRequest('GET', '/api/products?sort=price-high&limit=10');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    const prices = res.data.products.map((p) => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
      assert.strictEqual(prices[i] >= prices[i + 1], true, `Prices not descending: ${prices[i]} < ${prices[i + 1]}`);
    }
  });

  it('GET /api/products/:id should fetch a valid single product detail', async () => {
    assert.strictEqual(typeof sampleProductId, 'string');
    const res = await makeRequest('GET', `/api/products/${sampleProductId}`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.product._id.toString(), sampleProductId.toString());
    assert.strictEqual(typeof res.data.product.name, 'string');
    assert.strictEqual(typeof res.data.product.price, 'number');
    assert.strictEqual(typeof res.data.product.stock, 'number');
  });

  it('GET /api/products/:id with non-existent ObjectId should return 404', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const res = await makeRequest('GET', `/api/products/${nonExistentId}`);
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.data.success, false);
    assert.strictEqual(res.data.message.includes('not found'), true);
  });
});
