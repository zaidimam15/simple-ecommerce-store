
const express = require('express');
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware');

// All order routes are protected by JWT
router.use(protect);

// Create a new order
router.post('/', createOrder);

// Get logged-in user's orders
router.get('/my-orders', getMyOrders);

// Cancel an order (must be before /:id)
router.patch('/:id/cancel', cancelOrder);

// Get order details by ID
router.get('/:id', getOrderById);

module.exports = router;
