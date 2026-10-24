// CodeAlpha E-Commerce Server - Streamlined Cash on Delivery Architecture
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { connectDB, isDBConnected } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'https://simple-ecommerce-store-red.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow localhost dev origins in non-production environments
      if (
        process.env.NODE_ENV !== 'production' &&
        (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:'))
      ) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS policy.`));
    },
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CodeAlpha Simple E-commerce API is operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    databaseConnected: isDBConnected(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to CodeAlpha Simple E-Commerce Store API',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth (register, login, me)',
      products: '/api/products',
      orders: '/api/orders',
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Connect DB & Start Server
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`\n=================================================`);
      console.log(` CodeAlpha E-Commerce Server running on port ${PORT} `);
      console.log(` API Health Check: http://localhost:${PORT}/api/health `);
      console.log(` Payment Method: Cash on Delivery (COD) Only `);
      console.log(`=================================================`);
      console.log('');
    });
  });
}

module.exports = app;
