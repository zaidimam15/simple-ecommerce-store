const { describe, it } = require('node:test');
const assert = require('node:assert');
const app = require('../server');

// Helper to simulate HTTP requests without external network
const makeRequest = (method, path, headers = {}, body = null) => {
  return new Promise((resolve, reject) => {
    const http = require('http');
    const server = http.createServer(app);

    server.listen(0, () => {
      const port = server.address().port;
      const options = {
        hostname: '127.0.0.1',
        port,
        path,
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

describe('Express API Route & Security Testing', () => {
  it('GET /api/health should respond with status 200 and operational status', async () => {
    const res = await makeRequest('GET', '/api/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(typeof res.data.databaseConnected, 'boolean');
  });

  it('GET / should respond with 200 and API sitemap', async () => {
    const res = await makeRequest('GET', '/');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(typeof res.data.endpoints, 'object');
  });

  it('GET /api/auth/me should reject requests without token with 401', async () => {
    const res = await makeRequest('GET', '/api/auth/me');
    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.data.success, false);
    assert.strictEqual(res.data.message.includes('token'), true);
  });

  it('GET /api/auth/me should reject requests with invalid token with 401', async () => {
    const res = await makeRequest('GET', '/api/auth/me', {
      Authorization: 'Bearer invalid_bogus_token_123',
    });
    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.data.success, false);
  });

  it('POST /api/orders should reject unauthenticated order submission with 401', async () => {
    const res = await makeRequest('POST', '/api/orders', {}, { orderItems: [] });
    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.data.success, false);
  });

  it('GET /api/orders/my-orders should reject unauthenticated request with 401', async () => {
    const res = await makeRequest('GET', '/api/orders/my-orders');
    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.data.success, false);
  });

  it('POST /api/auth/register should return 400 if required fields are missing', async () => {
    const res = await makeRequest('POST', '/api/auth/register', {}, { name: 'Only Name' });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.data.success, false);
  });

  it('POST /api/auth/login should return 400 if email or password missing', async () => {
    const res = await makeRequest('POST', '/api/auth/login', {}, { email: 'test@example.com' });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.data.success, false);
  });

  it('GET non-existent route should return 404', async () => {
    const res = await makeRequest('GET', '/api/non-existent-route-xyz');
    assert.strictEqual(res.status, 404);
  });
});
