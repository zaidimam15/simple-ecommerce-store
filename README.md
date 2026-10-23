# Atelier Edition — Modern Full-Stack E-Commerce Store

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tests](https://img.shields.io/badge/Tests-64%20Passing-brightgreen?style=flat)](https://nodejs.org/api/test.html)

A comprehensive, production-ready Full-Stack MERN E-Commerce web application built with Node.js, Express, React, Vite, and MongoDB Atlas. Features an extensive curated catalogue of 122 products, rich responsive UI/UX, full-text search and category filtering, wishlist, quick view, cart persistence, secure JWT authentication, and a streamlined **Cash on Delivery (COD)** checkout workflow with atomic stock reservation and zero external third-party payment gateway dependencies.

---

## Table of Contents
- [Highlights & Features](#highlights--features)
- [Payment Architecture (Cash on Delivery)](#payment-architecture-cash-on-delivery)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Local Setup & Installation](#local-setup--installation)
- [Running the Application](#running-the-application)
- [Automated Testing Suite](#automated-testing-suite)
- [Production Build](#production-build)
- [API Reference](#api-reference)
- [Security & Safe GitHub Upload Checklist](#security--safe-github-upload-checklist)
- [Demo Credentials](#demo-credentials)
- [License](#license)

---

## Highlights & Features

### 🛍️ Curated 122-Product Catalogue
- **10 Curated Lifestyle Categories**: Audio, Wearables, Accessories, Eyewear, Apparel, Travel, Kitchen, Home, Gaming, and Footwear.
- **Rich Product Metadata**: Real high-definition photography, verified stock levels, ratings, review counts, detailed descriptions, and SKU tags.
- **Interactive Browsing**: Instant search with regex sanitization, multi-category pill selectors, sorting (price low/high, rating, name A-Z), and dynamic pagination.

### 🎨 Premium UI/UX & Responsive Design System
- **Generous Wide Layout**: Designed around a modern `1500px` container with zero cramped side margins.
- **Editorial Hero**: Deep navy, royal blue, and coral brand palette with real-time stock and product counters.
- **Quick View Modal**: Instant product inspection without leaving the catalogue.
- **Wishlist Drawer**: Slide-out drawer with persistent client-side wishlist tracking and direct add-to-bag capabilities.
- **Shopping Cart**: Real-time quantity adjustments, free shipping calculation threshold (orders > $50), 5% estimated tax, and subtotal computation.

### 🔐 Authentication & Account Management
- **JWT Authentication**: Secure stateless tokens with bearer header authorization.
- **Password Protection**: Salted Bcrypt password hashing.
- **1-Click Demo Login**: Pre-populated demo credentials for immediate testing.
- **Order History**: Authenticated user dashboard displaying previous orders, payment statuses, and tracking reference IDs.

---

## Payment Architecture (Cash on Delivery)

The store implements a streamlined, dependable **Cash on Delivery (COD)** payment flow:

- **Zero External API Dependencies**: Does not require third-party payment gateway accounts, keys, or external webhooks.
- **Atomic Stock Reservation**: Orders atomically decrement inventory stock using MongoDB transactions and atomic operations (`$inc: { stock: -quantity }`).
- **Duplicate Prevention**: If duplicate product lines are submitted in an order, quantities are aggregated before database deduction to eliminate race conditions.
- **Server-Side Price Validation**: Product prices, subtotal, shipping fees ($10 standard or FREE over $50), and estimated 5% tax are computed strictly on the backend to prevent client-side price tampering.
- **Stock Restoration on Cancellation**: Authenticated customers can cancel processing orders from their Order History; reserved inventory is automatically and idempotently returned to stock.
- **Delivered Order Protection**: Orders that have already been fulfilled or delivered cannot be cancelled or modified.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, React Router DOM 6, Context API (Auth, Cart, Wishlist, Toast) |
| **Styling** | Vanilla CSS Design System (Custom design tokens, glassmorphism, responsive breakpoints) |
| **Backend** | Node.js (v18+), Express 4.21, Mongoose 8.9, CORS, Dotenv |
| **Database** | MongoDB Atlas (Cloud) / Local MongoDB |
| **Security** | Bcryptjs 3.0, JSON Web Tokens 9.0, Input Sanitization (ReDoS/XSS defense) |
| **Payments** | Cash on Delivery (Built-in, zero external dependencies) |
| **Testing** | Node.js Native Test Runner (`node --test`) with 64 passing unit and integration tests |

---

## Project Structure

```
Simple E-commerce Store/
├── .gitignore                      # Master repository ignore rules
├── package.json                    # Root workspace runner scripts
├── README.md                       # Complete documentation & setup guide
├── backend/
│   ├── .env.example                # Backend environment variable template
│   ├── .gitignore                  # Backend-specific ignore rules
│   ├── config/
│   │   └── db.js                   # MongoDB Mongoose connection handler
│   ├── controllers/
│   │   ├── authController.js       # Register, login, and user profile
│   │   ├── orderController.js      # Order creation, order history, cancellation & stock sync
│   │   └── productController.js    # Catalogue query, search, filtering, pagination
│   ├── data/
│   │   └── catalogueData.js        # 122 curated benchmark products across 10 categories
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT bearer token verification
│   │   └── errorMiddleware.js      # Global error & 404 handlers
│   ├── models/
│   │   ├── Order.js                # Order schema with items, status, address, payment method
│   │   ├── Product.js              # Product schema with price, stock, rating
│   │   └── User.js                 # User schema with bcrypt password hashing
│   ├── routes/
│   │   ├── authRoutes.js           # /api/auth endpoints
│   │   ├── orderRoutes.js          # /api/orders endpoints
│   │   └── productRoutes.js        # /api/products endpoints
│   ├── scripts/
│   │   ├── addMoreProducts.js      # Non-destructive inventory catalogue loader
│   │   └── seed.js                 # Initial seed script
│   ├── tests/
│   │   ├── api.test.js             # Basic API endpoint assertions
│   │   ├── catalogue.test.js       # Schema, category count, and data tests
│   │   ├── codOrderWorkflow.test.js # COD order workflow, pricing, stock & cancellation tests
│   │   ├── ecommerceWorkflow.test.js # Live catalogue & filtering workflow tests
│   │   ├── fullStackIntegration.test.js # Full-stack integration, COD security & preservation suite
│   │   ├── paginationAndSafety.test.js # Sanitization, bounds, and safety tests
│   │   └── routes.test.js          # Express route security & token tests
│   ├── server.js                   # Express application entry point
│   └── package.json                # Backend dependencies and test scripts
└── frontend/
    ├── .env.example                # Frontend environment variable template
    ├── .gitignore                  # Frontend-specific ignore rules
    ├── index.html                  # HTML entry point with modern typography
    ├── vite.config.js              # Vite configuration with /api backend proxy
    ├── package.json                # Frontend dependencies and build scripts
    ├── public/
    │   └── favicon.svg             # Store brand icon
    └── src/
        ├── api/
        │   └── client.js           # Centralized Fetch API client with JWT headers
        ├── components/
        │   ├── Footer.jsx          # Brand footer with links and trust markers
        │   ├── Icons.jsx           # Lightweight SVG icon collection
        │   ├── LoadingSpinner.jsx  # Loading state indicators
        │   ├── Navbar.jsx          # Header with search, wishlist/cart badges, auth
        │   ├── ProductCard.jsx     # Card with quick-view, rating, wishlist toggle
        │   ├── ProductSkeleton.jsx # Shimmer placeholder skeleton cards
        │   ├── ProtectedRoute.jsx  # Route guard for authenticated checkout/orders
        │   ├── QuickViewModal.jsx  # Fast product preview modal
        │   └── WishlistDrawer.jsx  # Slide-out saved items drawer
        ├── context/
        │   ├── AuthContext.jsx     # User authentication state
        │   ├── CartContext.jsx     # Cart state with localStorage persistence
        │   ├── ToastContext.jsx    # Toast notification system
        │   └── WishlistContext.jsx # Wishlist state with localStorage persistence
        ├── pages/
        │   ├── CartPage.jsx        # Shopping bag view and price summary
        │   ├── CheckoutPage.jsx    # Dedicated Cash on Delivery checkout
        │   ├── HomePage.jsx        # Editorial storefront with catalogue grid
        │   ├── LoginPage.jsx       # User login with 1-click demo button
        │   ├── MyOrdersPage.jsx    # Purchase history, status badges, and order cancellation
        │   ├── NotFoundPage.jsx    # 404 fallback page
        │   ├── OrderSuccessPage.jsx # Order confirmation view with delivery estimate
        │   ├── ProductDetailPage.jsx # Full product specs and add-to-bag
        │   └── RegisterPage.jsx    # Account registration
        ├── index.css               # Complete responsive CSS design tokens
        ├── main.jsx                # React DOM entry point
        └── App.jsx                 # Route definitions and provider wrappers
```

---

## Prerequisites

Before running the application locally, ensure you have:
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **MongoDB**: A running local MongoDB instance (`mongodb://127.0.0.1:27017/simple_ecommerce`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster.

---

## Environment Configuration

### Backend Environment: `backend/.env`
Create a `.env` file inside the `backend/` directory using `backend/.env.example` as a reference:

```env
# Server Port & Mode
PORT=5000
NODE_ENV=development

# MongoDB Connection String (Replace with your Atlas URI or local instance)
MONGODB_URI=mongodb://127.0.0.1:27017/simple_ecommerce

# JSON Web Token Secret Key (Provide a secure random string)
JWT_SECRET=your_jwt_secret_key_here_change_in_production

# Client / Frontend URL for CORS
CLIENT_URL=http://localhost:5173

# Payment Configuration
# Built-in Cash on Delivery (COD) requires zero third-party credentials.
PAYMENT_METHOD=Cash on Delivery
```

### Frontend Environment: `frontend/.env` (Optional)
Create an optional `.env` file inside `frontend/` if overriding default endpoints:

```env
# Frontend API Base URL (defaults to /api with Vite dev proxy to http://localhost:5000)
VITE_API_BASE_URL=/api
```

---

## Local Setup & Installation

Open your terminal in the project root directory:

### 1. Install All Dependencies
```bash
# Install root, backend, and frontend packages
npm run install:all
```
*(Or run `npm install` inside `backend/` and `npm install` inside `frontend/`)*

### 2. Configure Environment Files
Copy the example templates:
```bash
# On Windows PowerShell
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# On macOS / Linux
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
Edit `backend/.env` to add your MongoDB connection string.

### 3. Load Product Catalogue into MongoDB
Populate the database with the full 122 curated products non-destructively:
```bash
npm run seed:safe
# Or from backend/: node scripts/addMoreProducts.js
```

---

## Running the Application

### Option A: Run from Project Root (Recommended)
Run in two separate terminal windows:

**Terminal 1 — Backend API:**
```bash
npm run backend
```
- Starts on **http://localhost:5000**
- Health check: **http://localhost:5000/api/health**

**Terminal 2 — Frontend Application:**
```bash
npm run frontend
```
- Starts on **http://localhost:5173**

---

### Option B: Run Inside Subdirectories Directly

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## Automated Testing Suite

The project includes an automated test suite with **64 tests across 15 test suites** verifying security, data validation, calculations, COD workflows, and catalogue integrity:

```bash
# Run from root
npm test

# Or run from backend/
cd backend
npm test
```

### Test Coverage Highlights:
- **Authentication**: Bcrypt salting, password hashing, JWT signing and malformed token rejection.
- **Cash on Delivery Workflow**: Server-side price calculation, 5% estimated tax, free shipping threshold over $50, duplicate line item aggregation.
- **Stock Reservation & Restoration**: Atomic inventory deduction on order creation, idempotent stock return on cancellation, delivered order cancellation prevention.
- **Catalogue Preservation**: Validates that all 122 products and 10 categories are preserved in MongoDB with intact stock levels.
- **Input Sanitization**: XSS and ReDoS injection defense on search queries.

---

## Production Build

To build the client for production deployment:

```bash
# Run from root
npm run build:frontend

# Or from frontend/
cd frontend
npm run build
```
Production assets are generated in `frontend/dist/`.

---

## API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new account (`name`, `email`, `password`) | Public |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Private (Bearer JWT) |

### Products (`/api/products`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/products` | Query catalogue (`search`, `category`, `sort`, `page`, `limit`) | Public |
| `GET` | `/api/products/:id` | Fetch single product by MongoDB ObjectId | Public |

### Orders (`/api/orders`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/orders` | Create order with Cash on Delivery & atomic stock reservation | Private (Bearer JWT) |
| `GET` | `/api/orders/my-orders` | Retrieve authenticated user's order history | Private (Bearer JWT) |
| `GET` | `/api/orders/:id` | Retrieve single order details (owner only) | Private (Bearer JWT) |
| `PATCH` | `/api/orders/:id/cancel` | Cancel processing order and restore reserved stock | Private (Bearer JWT) |

---

## Security & Safe GitHub Upload Checklist

Before pushing this repository to GitHub or any public remote:

- [x] **No Secrets Tracked**: `.env` files (`backend/.env`, `frontend/.env`) are excluded in `.gitignore`.
- [x] **Template Provided**: `.env.example` files provide only dummy placeholder values.
- [x] **Build Artifacts Excluded**: `node_modules/`, `dist/`, `build/`, and `coverage/` are strictly ignored.
- [x] **Log & OS Files Excluded**: `*.log`, `.DS_Store`, `Thumbs.db`, and editor state files are excluded.
- [x] **Zero Third-Party Gateway Secrets**: COD payment architecture requires no external gateway API keys or private secrets.

---

## Demo Credentials
For testing local authentication and checkout:
- **Email**: `demo@example.com`
- **Password**: `password123`
*(A convenient **"Demo Account"** 1-click auto-fill button is available on the Login page).*

---

## License
This project is licensed under the **ISC License**. Developed as part of the CodeAlpha Full Stack Development Internship.
