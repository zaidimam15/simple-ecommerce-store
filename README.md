# 🛍️ Atelier Edition
### ✨ Modern Full-Stack E-Commerce Store

## 🌐 Live Links

| 🔗 Resource | 🚀 Visit |

| 🌍 **Live Frontend** | [Open Atelier Edition](https://simple-ecommerce-store-red.vercel.app/) |

| ⚙️ **Backend API** | [Open Backend](https://simple-ecommerce-store-hb6q.onrender.com) |

| 💚 **API Health Check** | [Check API Status](https://simple-ecommerce-store-hb6q.onrender.com/api/health) |

| 💻 **GitHub Repository** | [Explore Source Code](https://github.com/zaidimam15/simple-ecommerce-store) |

## 📖 About the Project

**Atelier Edition** is a modern, full-stack e-commerce web application developed using React, Node.js, Express, and MongoDB.

The project combines an elegant storefront with product discovery, user authentication, shopping cart management, wishlist functionality, inventory control, and a convenient Cash on Delivery checkout experience.

Built with a focus on responsive design, usability, backend validation, and secure order processing.

## ✨ Features

### 🛍️ Product Catalogue
- 📦 122 curated products across 10 lifestyle categories.
- 🏷️ Product prices, descriptions, ratings, reviews, and stock details.
- 🔎 Search with input sanitization.
- 🎯 Category filtering and pagination.
- ↕️ Sorting by price, rating, and product name.

### 🎨 Premium UI/UX
- 💎 Modern editorial-inspired storefront.
- 📱 Responsive desktop, tablet, and mobile layouts.
- 👀 Quick View product modal.
- ❤️ Slide-out wishlist drawer.
- 🛒 Shopping cart with persistent storage.
- 🔔 Toast notifications and loading skeletons.

### 🔐 Authentication & Accounts
- 👤 User registration and login.
- 🔑 JWT-based authentication.
- 🔒 Password hashing with bcrypt.
- 🛡️ Protected checkout and order routes.
- 📋 Authenticated order history.

### 🛒 Shopping & Checkout
- ➕ Add products and update cart quantities.
- 🧮 Automatic subtotal and order-total calculation.
- 🚚 Shipping cost calculation.
- 🧾 Estimated tax calculation.
- 💵 Cash on Delivery checkout.
- ✅ Server-side product price validation.

### 📦 Inventory & Order Management
- 📉 Stock deduction when orders are placed.
- 🔄 Duplicate product-line aggregation.
- 📈 Stock restoration for eligible cancellations.
- 🛡️ Protection against cancelling delivered orders.
- 🔍 Backend validation for order processing.

## 💳 Payment System

### 💵 Cash on Delivery (COD)

The application uses a built-in Cash on Delivery workflow without requiring an external payment gateway.

- No third-party payment gateway keys are required.
- Product prices and order totals are calculated on the server.
- Inventory is reserved during order creation.
- Eligible cancellations restore reserved stock.

**Configured pricing rules:**

| Item | Rule |
|---|---|
| 🚚 Standard Shipping | $10 |
| 🎁 Free Shipping | Orders over $50 |
| 🧾 Estimated Tax | 5% |

These are the application's configured example amounts.

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| 🎨 Frontend | React 18, Vite 6 |
| 🧭 Routing | React Router DOM 6 |
| 🧠 State Management | React Context API |
| 💅 Styling | Vanilla CSS, responsive design |
| ⚙️ Backend | Node.js, Express.js |
| 🗄️ Database | MongoDB Atlas, Mongoose |
| 🔐 Security | JWT, bcryptjs, input sanitization |
| 🧪 Testing | Node.js Native Test Runner |
| ☁️ Deployment | Vercel, Render |

## 📁 Project Structure

    Simple E-commerce Store/
    ├── README.md
    ├── package.json
    ├── backend/
    │   ├── config/
    │   ├── controllers/
    │   ├── data/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── scripts/
    │   ├── tests/
    │   ├── .env.example
    │   ├── server.js
    │   └── package.json
    └── frontend/
        ├── public/
        ├── src/
        │   ├── api/
        │   ├── components/
        │   ├── context/
        │   ├── pages/
        │   ├── App.jsx
        │   └── main.jsx
        ├── .env.example
        ├── index.html
        └── package.json

## ⚙️ Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) v18 or higher.
- npm v9 or higher.
- MongoDB Atlas or a local MongoDB instance.
- Git (optional).

Check the installed versions:

    node -v
    npm -v

## 🔧 Environment Configuration

### Backend — `backend/.env`

Create this file using `backend/.env.example` as a template.

    PORT=5000
    NODE_ENV=development
    MONGODB_URI=mongodb://127.0.0.1:27017/simple_ecommerce
    JWT_SECRET=replace_with_a_secure_random_secret
    CLIENT_URL=http://localhost:5173
    PAYMENT_METHOD=Cash on Delivery

Configure your own MongoDB connection string and a strong JWT secret.

### Frontend — `frontend/.env`

For local development:

    VITE_API_BASE_URL=/api

For the deployed frontend, set this environment variable in Vercel:

    VITE_API_BASE_URL=https://simple-ecommerce-store-hb6q.onrender.com/api

Redeploy the frontend after updating environment variables.

⚠️ Never commit real `.env` files, database credentials, or JWT secrets to GitHub.

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

    git clone https://github.com/zaidimam15/simple-ecommerce-store.git
    cd simple-ecommerce-store

### 2️⃣ Install Dependencies

Run from the project root:

    npm run install:all

Alternatively, install dependencies separately inside `backend/` and `frontend/`.

### 3️⃣ Configure Environment Files

On Windows PowerShell:

    Copy-Item backend/.env.example backend/.env
    Copy-Item frontend/.env.example frontend/.env

Update `backend/.env` with your database connection and JWT secret.

### 4️⃣ Load the Product Catalogue

Use the non-destructive catalogue loader:

    npm run seed:safe

Alternatively, from the backend directory:

    node scripts/addMoreProducts.js

Always review database scripts and back up important data before running them.

## ▶️ Run the Application

Open two terminal windows in the project root.

**Terminal 1 — Backend API**

    npm run backend

Backend: http://localhost:5000

Health Check: http://localhost:5000/api/health

**Terminal 2 — Frontend**

    npm run frontend

Frontend: http://localhost:5173

You can also use the development scripts inside the backend and frontend directories.

## 🧪 Automated Testing

Run tests from the project root:

    npm test

Or from the backend directory:

    cd backend
    npm test

The documented test suite contains 64 tests covering:

- 🔐 Authentication and JWT validation.
- 🔑 Password hashing.
- 🛍️ Product catalogue integrity.
- 💳 COD pricing and order validation.
- 📦 Stock deduction and restoration.
- 🔄 Order cancellation rules.
- 🔎 Search sanitization and pagination.
- 🛡️ API route security.

Run the suite locally to confirm the current passing count before reporting the results as verified.

## 🏗️ Production Build

Build the frontend from the project root:

    npm run build:frontend

Alternatively, from the frontend directory:

    npm run build

Production files are generated in `frontend/dist/`.

## 📡 API Reference

### 🔐 Authentication — `/api/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |
| GET | `/api/auth/me` | Get current user profile | JWT Required |

### 🛍️ Products — `/api/products`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/products` | Search, filter, sort, and paginate products | Public |
| GET | `/api/products/:id` | Get product details | Public |

### 📦 Orders — `/api/orders`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/orders` | Create a COD order | JWT Required |
| GET | `/api/orders/my-orders` | Get order history | JWT Required |
| GET | `/api/orders/:id` | Get order details | JWT Required |
| PATCH | `/api/orders/:id/cancel` | Cancel an eligible order | JWT Required |

## 🔒 Security Checklist

- [ ] `.env` files are excluded from Git.
- [ ] `.env.example` contains only placeholder values.
- [ ] `node_modules/` and build artifacts are ignored.
- [ ] Database credentials and JWT secrets are never committed.
- [ ] CORS is configured for the intended frontend origin.
- [ ] Authentication and API validation are tested.
- [ ] Important database data is backed up before seeding.

## 🧑‍💻 Demo Account

The project documentation lists these demo credentials:

- **Email:** `demo@example.com`
- **Password:** `password123`

A demo login button is described on the Login page. The account must exist in the deployed database for login to work. Never use these credentials for a personal account.

## 👨‍💻 Author

**Zaid Imam**

- 🐙 GitHub: [@zaidimam15](https://github.com/zaidimam15)
- 💻 Repository: [Simple E-Commerce Store](https://github.com/zaidimam15/simple-ecommerce-store)
- 🌐 Live Website: [Atelier Edition](https://simple-ecommerce-store-red.vercel.app/)

## 📄 License

Licensed under the ISC License. See the repository's license file for details.

Developed as part of the CodeAlpha Full Stack Development Internship.

