
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper to round to 2 decimal places
const toDecimals = (num) => Math.round(num * 100) / 100;

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items provided. Cart is empty.',
      });
    }

    if (
      !shippingAddress ||
      !shippingAddress.fullName?.trim() ||
      !shippingAddress.phone?.trim() ||
      !shippingAddress.address?.trim() ||
      !shippingAddress.city?.trim() ||
      !shippingAddress.postalCode?.trim() ||
      !shippingAddress.country?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required shipping address fields.',
      });
    }

    const validatedItems = [];
    let itemsPrice = 0;

    // Validate products and quantities using database values.
    for (const item of orderItems) {
      if (
        !item.product ||
        !mongoose.Types.ObjectId.isValid(item.product)
      ) {
        return res.status(400).json({
          success: false,
          message: `Invalid product reference for item: ${item.name || 'Unknown'}`,
        });
      }

      const productInDb = await Product.findById(item.product);

      if (!productInDb) {
        return res.status(404).json({
          success: false,
          message: `Product "${item.name || item.product}" is no longer available in the store.`,
        });
      }

      const requestedQty = Number(item.quantity);

      if (!Number.isInteger(requestedQty) || requestedQty <= 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity specified for "${productInDb.name}".`,
        });
      }

      if (productInDb.stock < requestedQty) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${productInDb.name}". Available: ${productInDb.stock}, Requested: ${requestedQty}.`,
        });
      }

      itemsPrice += productInDb.price * requestedQty;

      validatedItems.push({
        product: productInDb._id,
        name: productInDb.name,
        image: productInDb.image,
        price: productInDb.price,
        quantity: requestedQty,
      });
    }

    const shippingPrice = itemsPrice > 50 ? 0 : 10;
    const taxPrice = toDecimals(itemsPrice * 0.05);
    const totalPrice = toDecimals(
      itemsPrice + shippingPrice + taxPrice
    );

    // Atomically reserve stock and create the order in one transaction.
    const session = await mongoose.startSession();
    let createdOrder;

    try {
      await session.withTransaction(async () => {
        // Prevent the same product being decremented twice in a single
        // order if the client submits duplicate product lines.
        const quantitiesByProduct = new Map();

        for (const item of validatedItems) {
          const key = item.product.toString();
          quantitiesByProduct.set(
            key,
            (quantitiesByProduct.get(key) || 0) + item.quantity
          );
        }

        for (const [productId, quantity] of quantitiesByProduct) {
          const updatedProduct = await Product.findOneAndUpdate(
            {
              _id: productId,
              stock: { $gte: quantity },
            },
            {
              $inc: { stock: -quantity },
            },
            {
              new: true,
              session,
            }
          );

          if (!updatedProduct) {
            const product = await Product.findById(productId)
              .session(session);

            throw new Error(
              `INSUFFICIENT_STOCK:${product ? product.name : productId}`
            );
          }
        }

        const orders = await Order.create(
          [
            {
              user: req.user._id,
              orderItems: validatedItems,
              shippingAddress: {
                fullName: shippingAddress.fullName.trim(),
                phone: shippingAddress.phone.trim(),
                address: shippingAddress.address.trim(),
                city: shippingAddress.city.trim(),
                postalCode: shippingAddress.postalCode.trim(),
                country: shippingAddress.country.trim(),
              },
              paymentMethod:
                paymentMethod || 'Cash on Delivery (Standard)',
              itemsPrice: toDecimals(itemsPrice),
              taxPrice,
              shippingPrice,
              totalPrice,
              status: 'Processing',
              isPaid: false,
            },
          ],
          { session }
        );

        createdOrder = orders[0];
      });
    } catch (error) {
      if (error.message.startsWith('INSUFFICIENT_STOCK:')) {
        return res.status(400).json({
          success: false,
          message: `Stock changed while placing the order for "${error.message.slice('INSUFFICIENT_STOCK:'.length)}". Please try again.`,
        });
      }

      throw error;
    } finally {
      await session.endSession();
    }

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: createdOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid order ID format.',
      });
    }

    const order = await Order.findById(id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    if (
      !order.user ||
      (
        order.user._id.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin'
      )
    ) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to view this order.',
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel an order and restore product stock atomically
// @route   PATCH /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res, next) => {
  let session;

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID.',
      });
    }

    session = await mongoose.startSession();

    let cancelledOrder;

    try {
      await session.withTransaction(async () => {
        // Only the owner's unpaid, cancellable order can be changed.
        const order = await Order.findOneAndUpdate(
          {
            _id: id,
            user: req.user._id,
            status: { $in: ['Processing', 'Pending'] },
            isPaid: { $ne: true },
          },
          {
            $set: { status: 'Cancelled' },
          },
          {
            new: true,
            session,
          }
        );

        if (!order) {
          const existingOrder = await Order.findById(id)
            .session(session);

          if (!existingOrder) {
            const error = new Error('ORDER_NOT_FOUND');
            throw error;
          }

          if (
            existingOrder.user.toString() !==
            req.user._id.toString()
          ) {
            const error = new Error('ORDER_FORBIDDEN');
            throw error;
          }

          const error = new Error('ORDER_NOT_CANCELLABLE');
          throw error;
        }

        // Aggregate duplicate lines so each product is restored once
        // with the total quantity ordered.
        const quantitiesByProduct = new Map();

        for (const item of order.orderItems) {
          if (!item.product) {
            throw new Error('A product reference is missing from the order.');
          }

          const productId = item.product.toString();

          quantitiesByProduct.set(
            productId,
            (quantitiesByProduct.get(productId) || 0) +
            item.quantity
          );
        }

        for (const [productId, quantity] of quantitiesByProduct) {
          const restoredProduct = await Product.findByIdAndUpdate(
            productId,
            { $inc: { stock: quantity } },
            { new: true, session }
          );

          if (!restoredProduct) {
            throw new Error(
              `Product ${productId} was not found while restoring stock.`
            );
          }
        }

        cancelledOrder = order;
      });
    } catch (error) {
      if (error.message === 'ORDER_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          message: 'Order not found.',
        });
      }

      if (error.message === 'ORDER_FORBIDDEN') {
        return res.status(403).json({
          success: false,
          message: 'You are not allowed to cancel this order.',
        });
      }

      if (error.message === 'ORDER_NOT_CANCELLABLE') {
        return res.status(400).json({
          success: false,
          message:
            'This order cannot be cancelled. It may already be cancelled, paid, shipped, or completed.',
        });
      }

      throw error;
    }

    return res.status(200).json({
      success: true,
      message: 'Order cancelled successfully. Product stock has been restored.',
      order: cancelledOrder,
    });
  } catch (error) {
    next(error);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};
