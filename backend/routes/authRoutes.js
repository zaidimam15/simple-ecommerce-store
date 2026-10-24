const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { createRateLimiter } = require('../middleware/rateLimitMiddleware');

// Auth rate limiter: 30 attempts per 15 minutes (bypassed in test environment)
const authLimiter =
  process.env.NODE_ENV === 'test'
    ? (req, res, next) => next()
    : createRateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 30,
        message: 'Too many authentication attempts. Please try again after 15 minutes.',
      });

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.get('/me', protect, getCurrentUser);

module.exports = router;
