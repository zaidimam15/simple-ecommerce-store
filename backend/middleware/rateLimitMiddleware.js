// Lightweight In-Memory Rate Limiting Middleware
const ipRequestCounts = new Map();

/**
 * Creates an in-memory rate limiter middleware.
 * @param {Object} options
 * @param {number} options.windowMs - Time window in milliseconds (default: 15 minutes)
 * @param {number} options.max - Maximum requests allowed per window (default: 10)
 * @param {string} options.message - Error message when rate limit is exceeded
 */
const createRateLimiter = ({
  windowMs = 15 * 60 * 1000,
  max = 10,
  message = 'Too many requests from this IP. Please try again after 15 minutes.',
} = {}) => {
  return (req, res, next) => {
    // Determine client IP (support reverse proxies e.g. Render, Vercel)
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';

    const now = Date.now();
    const record = ipRequestCounts.get(clientIp);

    if (!record || now > record.resetTime) {
      ipRequestCounts.set(clientIp, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (record.count >= max) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.set('Retry-After', String(retryAfterSeconds));
      return res.status(429).json({
        success: false,
        message,
        retryAfter: `${retryAfterSeconds}s`,
      });
    }

    record.count += 1;
    next();
  };
};

// Periodically clean up stale records every 10 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestCounts.entries()) {
    if (now > record.resetTime) {
      ipRequestCounts.delete(ip);
    }
  }
}, 10 * 60 * 1000).unref();

module.exports = { createRateLimiter };
