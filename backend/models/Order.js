const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
  },
  image: {
    type: String,
    required: true,
  },
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, 'Postal / ZIP code is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: {
      type: [orderItemSchema],
      validate: {
        validator: function (items) {
          return items && items.length > 0;
        },
        message: 'Order must contain at least one item',
      },
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: 'Cash on Delivery (Standard Internship Demo)',
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'cancelled'],
      default: 'pending',
    },
    razorpayOrderId: {
      type: String,
      index: true,
      default: null,
    },
    razorpayPaymentId: {
      type: String,
      index: true,
      default: null,
    },
    razorpaySignature: {
      type: String,
      default: null,
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
orderSchema.index({ user: 1, createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
