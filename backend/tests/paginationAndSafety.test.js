const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('Catalogue Pagination & Input Sanitization Logic', () => {
  it('should sanitize dangerous regex characters from search and category inputs', () => {
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const unsafeSearch = 'Product (Special Edition) [4K]* + $100?';
    const escaped = escapeRegex(unsafeSearch);

    // Creating a RegExp with the escaped string should not throw SyntaxError
    assert.doesNotThrow(() => {
      const reg = new RegExp(escaped, 'i');
      assert.strictEqual(reg.test('Product (Special Edition) [4K]* + $100?'), true);
      assert.strictEqual(reg.test('Different Product'), false);
    });
  });

  it('should validate and clamp pagination bounds safely', () => {
    const calculatePagination = (total, pageQuery, limitQuery) => {
      const parsedPage = parseInt(pageQuery, 10);
      const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

      const parsedLimit = parseInt(limitQuery, 10);
      const limit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 100) : 12;

      const totalPages = Math.ceil(total / limit) || 1;
      const skip = (page - 1) * limit;

      return {
        page,
        limit,
        totalPages,
        skip,
        hasMore: page < totalPages,
      };
    };

    // Test default pagination (no params)
    const defaults = calculatePagination(120, undefined, undefined);
    assert.strictEqual(defaults.page, 1);
    assert.strictEqual(defaults.limit, 12);
    assert.strictEqual(defaults.totalPages, 10);
    assert.strictEqual(defaults.skip, 0);
    assert.strictEqual(defaults.hasMore, true);

    // Test clamped high limit
    const highLimit = calculatePagination(120, '2', '500');
    assert.strictEqual(highLimit.page, 2);
    assert.strictEqual(highLimit.limit, 100); // Clamped to 100
    assert.strictEqual(highLimit.skip, 100);
    assert.strictEqual(highLimit.totalPages, 2);
    assert.strictEqual(highLimit.hasMore, false);

    // Test invalid negative or non-numeric page input
    const invalidInputs = calculatePagination(50, '-3', 'abc');
    assert.strictEqual(invalidInputs.page, 1); // Defaults to 1
    assert.strictEqual(invalidInputs.limit, 12); // Defaults to 12
    assert.strictEqual(invalidInputs.totalPages, 5);
  });

  it('should preserve existing product stock and avoid overwrites during safe seeding', () => {
    // Simulating database collection and seed input
    const mockDbProducts = [
      {
        _id: 'prod_1',
        name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
        stock: 3, // Live decreased stock due to customer orders
        price: 398.0,
      },
    ];

    const seedCandidates = [
      {
        name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
        stock: 25, // Initial catalogue stock
        price: 398.0,
      },
      {
        name: 'Anker 737 Power Bank (PowerCore 24K) 140W',
        stock: 35,
        price: 149.99,
      },
    ];

    let inserted = 0;
    let skipped = 0;

    for (const candidate of seedCandidates) {
      const existing = mockDbProducts.find(
        (p) => p.name.trim().toLowerCase() === candidate.name.trim().toLowerCase()
      );

      if (existing) {
        // Do NOT overwrite stock!
        skipped++;
      } else {
        mockDbProducts.push({ _id: `prod_${mockDbProducts.length + 1}`, ...candidate });
        inserted++;
      }
    }

    assert.strictEqual(skipped, 1);
    assert.strictEqual(inserted, 1);
    // Crucial check: stock for existing product must remain 3, not overwritten with 25
    assert.strictEqual(mockDbProducts[0].stock, 3);
    assert.strictEqual(mockDbProducts.length, 2);
  });
});
