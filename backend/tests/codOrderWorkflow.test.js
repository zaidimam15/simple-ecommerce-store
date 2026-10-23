const { describe, it } = require('node:test');
const assert = require('node:assert');

describe('Cash on Delivery (COD) Order Workflow, Calculations & Security', () => {
  // Helper to round to 2 decimal places
  const toDecimals = (num) => Math.round(num * 100) / 100;

  it('should enforce server-side price calculation and prevent frontend amount tampering', () => {
    // Database product reference price: $49.00
    const dbProduct = { id: 'prod_123', price: 49.00, stock: 10 };

    // Malicious client sends manipulated client-side price: $1.00
    const clientItem = { product: 'prod_123', quantity: 2, price: 1.00 };

    // Trusted server calculation
    const calculatedSubtotal = dbProduct.price * clientItem.quantity;
    assert.strictEqual(calculatedSubtotal, 98.00); // 49 * 2 = 98.00, NOT 2.00

    const shipping = calculatedSubtotal > 50 ? 0 : 10;
    assert.strictEqual(shipping, 0); // Free shipping threshold (> $50)

    const tax = toDecimals(calculatedSubtotal * 0.05);
    assert.strictEqual(tax, 4.90);

    const total = toDecimals(calculatedSubtotal + shipping + tax);
    assert.strictEqual(total, 102.90);
  });

  it('should apply standard shipping fee when subtotal is $50 or less', () => {
    const subtotal = 35.00;
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = toDecimals(subtotal * 0.05);
    const total = toDecimals(subtotal + shipping + tax);

    assert.strictEqual(shipping, 10.00);
    assert.strictEqual(tax, 1.75);
    assert.strictEqual(total, 46.75);
  });

  it('should create valid Cash on Delivery order object with correct default statuses', () => {
    const createCodOrder = (userId, items, address) => {
      const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
      const shipping = subtotal > 50 ? 0 : 10;
      const tax = toDecimals(subtotal * 0.05);
      const total = toDecimals(subtotal + shipping + tax);

      return {
        user: userId,
        orderItems: items,
        shippingAddress: address,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'pending',
        isPaid: false,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
        status: 'Processing',
      };
    };

    const order = createCodOrder(
      'user_123',
      [{ product: 'prod_abc', price: 60.0, quantity: 1 }],
      {
        fullName: 'Eleanor Vance',
        phone: '+1 (555) 019-2834',
        address: '742 Evergreen Terrace, Suite 4B',
        city: 'Springfield',
        postalCode: '97477',
        country: 'United States',
      }
    );

    assert.strictEqual(order.paymentMethod, 'Cash on Delivery');
    assert.strictEqual(order.isPaid, false);
    assert.strictEqual(order.status, 'Processing');
    assert.strictEqual(order.paymentStatus, 'pending');
    assert.strictEqual(order.totalPrice, 63.0);
    assert.strictEqual(order.shippingPrice, 0);
  });

  it('should validate shipping address and reject missing mandatory fields', () => {
    const validateAddress = (addr) => {
      if (!addr) return false;
      const required = ['fullName', 'phone', 'address', 'city', 'postalCode', 'country'];
      return required.every((field) => addr[field] && String(addr[field]).trim().length > 0);
    };

    assert.strictEqual(
      validateAddress({
        fullName: 'Jane Doe',
        phone: '1234567890',
        address: '100 Main St',
        city: 'Metropolis',
        postalCode: '10001',
        country: 'USA',
      }),
      true
    );

    assert.strictEqual(
      validateAddress({
        fullName: 'Jane Doe',
        phone: '', // Missing
        address: '100 Main St',
        city: 'Metropolis',
        postalCode: '10001',
        country: 'USA',
      }),
      false
    );

    assert.strictEqual(validateAddress(null), false);
  });

  it('should validate item quantities and reject non-integers, zeros, or negative numbers', () => {
    const isValidQuantity = (qty) => {
      const num = Number(qty);
      return Number.isInteger(num) && num > 0;
    };

    assert.strictEqual(isValidQuantity(1), true);
    assert.strictEqual(isValidQuantity(5), true);
    assert.strictEqual(isValidQuantity(0), false);
    assert.strictEqual(isValidQuantity(-2), false);
    assert.strictEqual(isValidQuantity(1.5), false);
    assert.strictEqual(isValidQuantity('abc'), false);
    assert.strictEqual(isValidQuantity(null), false);
  });

  it('should detect when requested quantity exceeds available inventory stock', () => {
    const checkStock = (availableStock, requestedQty) => {
      return availableStock >= requestedQty;
    };

    assert.strictEqual(checkStock(10, 5), true);
    assert.strictEqual(checkStock(10, 10), true);
    assert.strictEqual(checkStock(10, 11), false);
    assert.strictEqual(checkStock(0, 1), false);
  });

  it('should aggregate duplicate product entries in a single order to prevent race conditions', () => {
    const orderItems = [
      { product: 'prod_A', quantity: 2 },
      { product: 'prod_B', quantity: 1 },
      { product: 'prod_A', quantity: 3 }, // Duplicate entry for prod_A
    ];

    const aggregated = new Map();
    for (const item of orderItems) {
      aggregated.set(item.product, (aggregated.get(item.product) || 0) + item.quantity);
    }

    assert.strictEqual(aggregated.get('prod_A'), 5); // 2 + 3 = 5
    assert.strictEqual(aggregated.get('prod_B'), 1);
    assert.strictEqual(aggregated.size, 2);
  });

  it('should restore stock idempotently when a COD order is cancelled', () => {
    let inventory = { prod_1: 15, prod_2: 8 };

    const order = {
      _id: 'order_cod_001',
      orderItems: [
        { product: 'prod_1', quantity: 3 },
        { product: 'prod_2', quantity: 2 },
      ],
      isPaid: false,
      status: 'Processing',
      paymentStatus: 'pending',
    };

    const cancelOrder = (ord) => {
      if (ord.status === 'Cancelled') {
        return { action: 'skipped', reason: 'already_cancelled' };
      }

      for (const item of ord.orderItems) {
        inventory[item.product] += item.quantity;
      }
      ord.status = 'Cancelled';
      ord.paymentStatus = 'cancelled';
      return { action: 'stock_restored', inventory };
    };

    // First cancellation: stock restored
    const firstResult = cancelOrder(order);
    assert.strictEqual(firstResult.action, 'stock_restored');
    assert.strictEqual(inventory.prod_1, 18); // 15 + 3
    assert.strictEqual(inventory.prod_2, 10); // 8 + 2
    assert.strictEqual(order.status, 'Cancelled');

    // Duplicate cancellation: must NOT restore stock a second time
    const secondResult = cancelOrder(order);
    assert.strictEqual(secondResult.action, 'skipped');
    assert.strictEqual(secondResult.reason, 'already_cancelled');
    assert.strictEqual(inventory.prod_1, 18); // Unchanged
    assert.strictEqual(inventory.prod_2, 10); // Unchanged
  });

  it('should prevent cancellation of already delivered orders', () => {
    const order = {
      _id: 'order_delivered_001',
      status: 'Delivered',
      isPaid: true,
    };

    const canCancel = (ord) => {
      return ord.status === 'Processing';
    };

    assert.strictEqual(canCancel(order), false);
  });
});
