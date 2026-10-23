const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    image: {
      type: String,
      required: [true, 'Please provide product image URL'],
      default: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'Please provide product stock count'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search optimization
productSchema.index({ name: 'text', description: 'text', category: 'text' });
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
