const mongoose = require('mongoose');
const Product = require('../models/Product');

// Helper to safely escape regex special characters
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// @desc    Fetch all products with optional filter/search/sort/pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, search, sort, page, limit, all } = req.query;

    const queryFilter = {};

    // Filter by category with escaped input
    if (category && typeof category === 'string' && category !== 'All' && category.trim() !== '') {
      const safeCat = escapeRegex(category.trim());
      queryFilter.category = { $regex: new RegExp(`^${safeCat}$`, 'i') };
    }

    // Search by keyword in name or description with safe escaping
    if (search && typeof search === 'string' && search.trim() !== '') {
      const safeSearch = escapeRegex(search.trim());
      queryFilter.$or = [
        { name: { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } },
      ];
    }

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') {
      sortOptions = { price: 1 };
    } else if (sort === 'price-high') {
      sortOptions = { price: -1 };
    } else if (sort === 'rating') {
      sortOptions = { rating: -1, numReviews: -1 };
    } else if (sort === 'name-asc') {
      sortOptions = { name: 1 };
    }

    // Total count for filtered query
    const totalProducts = await Product.countDocuments(queryFilter);

    // Also get distinct categories for filtering UX
    const categories = await Product.distinct('category');

    // Handle pagination
    const isFetchAll = all === 'true' || limit === 'all';
    let productsQuery = Product.find(queryFilter).sort(sortOptions);

    let currentPage = 1;
    let pageSize = 12;
    let totalPages = 1;

    if (!isFetchAll) {
      const parsedPage = parseInt(page, 10);
      currentPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

      const parsedLimit = parseInt(limit, 10);
      // Reasonable page size: minimum 1, default 12, max 100
      pageSize = Number.isInteger(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 100) : 12;

      totalPages = Math.ceil(totalProducts / pageSize) || 1;
      const skip = (currentPage - 1) * pageSize;

      productsQuery = productsQuery.skip(skip).limit(pageSize);
    } else {
      // Safety cap when fetching all without pagination
      productsQuery = productsQuery.limit(500);
      pageSize = totalProducts;
      totalPages = 1;
    }

    const products = await productsQuery;

    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      page: currentPage,
      totalPages,
      limit: pageSize,
      hasMore: currentPage < totalPages,
      categories: ['All', ...categories],
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid product ID format.',
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
};
