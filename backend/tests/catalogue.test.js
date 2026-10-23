const { describe, it } = require('node:test');
const assert = require('node:assert');
const catalogueProducts = require('../data/catalogueData');
const Product = require('../models/Product');

describe('Catalogue Dataset & Schema Validation', () => {
  it('should contain at least 100 unique catalogue products', () => {
    assert.strictEqual(catalogueProducts.length >= 100, true, `Expected >= 100 products, got ${catalogueProducts.length}`);
    const uniqueNames = new Set(catalogueProducts.map((p) => p.name.trim().toLowerCase()));
    assert.strictEqual(uniqueNames.size, catalogueProducts.length, 'All catalogue product names must be unique');
  });

  it('should cover all 10 required product categories', () => {
    const requiredCategories = [
      'Electronics',
      'Fashion',
      'Shoes',
      'Accessories',
      'Home & Kitchen',
      'Beauty & Personal Care',
      'Sports & Fitness',
      'Books & Stationery',
      'Gaming',
      'Bags & Travel',
    ];

    const categoriesInDataset = new Set(catalogueProducts.map((p) => p.category));
    for (const cat of requiredCategories) {
      assert.strictEqual(
        categoriesInDataset.has(cat),
        true,
        `Catalogue must contain products in category "${cat}"`
      );
    }
  });

  it('should validate every product against the Mongoose Product schema requirements', () => {
    for (const item of catalogueProducts) {
      // Validate schema compliance without saving to database
      const doc = new Product(item);
      const validationError = doc.validateSync();
      assert.strictEqual(
        validationError,
        undefined,
        `Validation error for product "${item.name}": ${validationError?.message}`
      );

      // Explicit business rules
      assert.strictEqual(typeof item.name, 'string');
      assert.strictEqual(item.name.trim().length > 0, true);
      assert.strictEqual(item.name.length <= 120, true, `Name too long: ${item.name}`);

      assert.strictEqual(typeof item.description, 'string');
      assert.strictEqual(item.description.trim().length > 10, true);

      assert.strictEqual(typeof item.price, 'number');
      assert.strictEqual(item.price > 0, true, `Price must be > 0 for "${item.name}"`);

      assert.strictEqual(typeof item.image, 'string');
      assert.strictEqual(item.image.startsWith('https://'), true);

      assert.strictEqual(typeof item.stock, 'number');
      assert.strictEqual(Number.isInteger(item.stock), true);
      assert.strictEqual(item.stock >= 0, true);

      assert.strictEqual(typeof item.rating, 'number');
      assert.strictEqual(item.rating >= 0 && item.rating <= 5, true);

      assert.strictEqual(typeof item.numReviews, 'number');
      assert.strictEqual(item.numReviews >= 0, true);
    }
  });
});
