const { describe, it } = require('node:test');
const assert = require('node:assert');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Test Suite 1: Authentication & Password Security
describe('Authentication & Cryptographic Security', () => {
  it('should securely hash passwords using bcrypt with salt', async () => {
    const rawPassword = 'SecurePassword123!';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    assert.notStrictEqual(rawPassword, hashedPassword);
    assert.strictEqual(hashedPassword.startsWith('$2'), true);

    const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
    assert.strictEqual(isMatch, true);

    const isWrongMatch = await bcrypt.compare('WrongPassword456!', hashedPassword);
    assert.strictEqual(isWrongMatch, false);
  });

  it('should correctly generate and verify JSON Web Tokens (JWT)', () => {
    const secret = 'test_jwt_secret_key_12345';
    const userId = '654321654321654321654321';

    const token = jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
    assert.strictEqual(typeof token, 'string');
    assert.strictEqual(token.split('.').length, 3); // Standard JWT header.payload.signature

    const decoded = jwt.verify(token, secret);
    assert.strictEqual(decoded.id, userId);

    // Expired or bad signature rejection
    assert.throws(() => {
      jwt.verify(token, 'different_wrong_secret');
    });
  });
});

// Test Suite 2: Business Logic & Cart Calculations
describe('Order Pricing & Stock Verification Calculations', () => {
  it('should calculate itemsPrice, shipping, and tax accurately', () => {
    const items = [
      { price: 25.00, quantity: 2 }, // 50.00
      { price: 10.50, quantity: 1 }, // 10.50
    ];

    const itemsPrice = Math.round(
      items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100
    ) / 100;
    assert.strictEqual(itemsPrice, 60.50);

    // Free shipping threshold > 50
    const shippingPrice = itemsPrice > 50 ? 0 : 10;
    assert.strictEqual(shippingPrice, 0);

    // 5% tax
    const taxPrice = Math.round(itemsPrice * 0.05 * 100) / 100;
    assert.strictEqual(taxPrice, 3.03);

    const totalPrice = Math.round((itemsPrice + shippingPrice + taxPrice) * 100) / 100;
    assert.strictEqual(totalPrice, 63.53);
  });

  it('should enforce shipping fee when order subtotal is below $50', () => {
    const items = [
      { price: 15.00, quantity: 2 }, // 30.00
    ];

    const itemsPrice = 30.00;
    const shippingPrice = itemsPrice > 50 ? 0 : 10;
    assert.strictEqual(shippingPrice, 10);

    const taxPrice = Math.round(itemsPrice * 0.05 * 100) / 100; // 1.50
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    assert.strictEqual(totalPrice, 41.50);
  });

  it('should detect when requested quantity exceeds available stock', () => {
    const product = { name: 'Wireless Headphones', stock: 5 };
    const validQty = 3;
    const invalidQty = 8;

    const isAvailable = (qty) => qty <= product.stock;

    assert.strictEqual(isAvailable(validQty), true);
    assert.strictEqual(isAvailable(invalidQty), false);
  });
});

// Test Suite 3: Data Validation Rules
describe('E-commerce Data Validation Rules', () => {
  it('should validate email format properly', () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

    assert.strictEqual(emailRegex.test('student@codealpha.com'), true);
    assert.strictEqual(emailRegex.test('invalid-email-format'), false);
    assert.strictEqual(emailRegex.test('user@com'), false);
  });

  it('should require all mandatory shipping fields', () => {
    const completeAddress = {
      fullName: 'Jane Doe',
      phone: '1234567890',
      address: '456 Market St',
      city: 'Seattle',
      postalCode: '98101',
      country: 'USA',
    };

    const isShippingValid = (addr) =>
      Boolean(
        addr &&
        addr.fullName?.trim() &&
        addr.phone?.trim() &&
        addr.address?.trim() &&
        addr.city?.trim() &&
        addr.postalCode?.trim() &&
        addr.country?.trim()
      );

    assert.strictEqual(isShippingValid(completeAddress), true);

    const incompleteAddress = { ...completeAddress, phone: '' };
    assert.strictEqual(isShippingValid(incompleteAddress), false);
  });
});
