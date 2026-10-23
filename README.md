## 🌐 Live Demo & Project Links

| Resource | Link |
|---|---|
| 🌍 Live Frontend | [Visit Website](https://simple-ecommerce-store-red.vercel.app/) |
| ⚙️ Backend API | [View Backend](https://simple-ecommerce-store-hb6q.onrender.com) |
| 💚 API Health Check | [Check API](https://simple-ecommerce-store-hb6q.onrender.com/api/health) |
| 💻 GitHub Repository | [Explore Source Code](https://github.com/zaidimam15/simple-ecommerce-store) |

## ✨ About the Project

Atelier Edition is a full-stack e-commerce web application built using the MERN stack. It combines a modern storefront with product discovery, shopping cart management, user authentication, wishlist functionality, and Cash on Delivery checkout.

The application includes a curated catalogue of 122 products across 10 lifestyle categories, along with inventory management and automated tests.

## 🚀 Key Features

### 🛍️ Product Catalogue
- 122 curated products across 10 lifestyle categories.
- Product images, descriptions, prices, ratings, and stock information.
- Instant search with input sanitization.
- Category filtering and dynamic pagination.
- Sorting by price, rating, and product name.

### 🎨 Modern UI/UX
- Premium editorial-inspired design.
- Responsive layout for desktop, tablet, and mobile.
- Quick View modal for product previews.
- Slide-out wishlist drawer.
- Persistent cart and wishlist using local storage.
- Loading skeletons and toast notifications.

### 🔐 Authentication
- User registration and login.
- JWT-based authentication.
- Password hashing with bcrypt.
- Protected checkout and order routes.
- Authenticated order history.

### 🛒 Shopping & Checkout
- Add products to the shopping cart.
- Update quantities and calculate totals.
- Automatic shipping and estimated tax calculation.
- Cash on Delivery checkout.
- Server-side price validation.

### 📦 Stock & Order Management
- Inventory deduction when orders are placed.
- Duplicate product-line aggregation.
- Stock restoration for eligible cancellations.
- Protection against cancellation of delivered orders.
- Backend validation for order processing.

## 💳 Payment System — Cash on Delivery

The application uses a built-in Cash on Delivery (COD) workflow.

- No external payment gateway account or API keys required.
- Product prices and order totals are validated on the backend.
- Inventory is reserved when an order is created.
- Eligible cancellations restore reserved stock.

### Configured Pricing Rules
- 🚚 Standard Shipping: $10
- 🎁 Free Shipping: Orders over $50
- 🧾 Estimated Tax: 5%

These are the application's configured example amounts and can be changed as needed.

## 🧰 Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, Vite 6, React Router DOM 6 |
| State Management | React Context API |
| Styling | Vanilla CSS, Responsive Design |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcryptjs |
| Configuration | dotenv, CORS |
| Testing | Node.js Native Test Runner |
| Deployment | Vercel, Render |

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

Before starting, install:

- [Node.js](https://nodejs.org/) v18 or higher.
- npm v9 or higher.
- MongoDB Atlas or a local MongoDB instance.
- Git (optional).

Verify installation:

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

Use your own MongoDB connection string and a strong JWT secret.

### Frontend — `frontend/.env`

For local development, the application can use the Vite proxy:

    VITE_API_BASE_URL=/api

For the deployed Vercel frontend, configure:

    VITE_API_BASE_URL=https://simple-ecommerce-store-hb6q.onrender.com/api

Redeploy the frontend after changing its environment variables.

⚠️ Never expose database credentials or JWT secrets in frontend environment variables or public repositories.

## 💻 Local Setup & Installation

### 1. Clone the Repository

    git clone https://github.com/zaidimam15/simple-ecommerce-store.git
    cd simple-ecommerce-store

### 2. Install Dependencies

Run from the project root:

    npm run install:all

Alternatively, install dependencies inside the backend and frontend folders separately.

### 3. Configure Environment Files

On Windows PowerShell:

    Copy-Item backend/.env.example backend/.env
    Copy-Item frontend/.env.example frontend/.env

Update `backend/.env` with your database connection and JWT secret.

### 4. Load the Product Catalogue

Use the non-destructive catalogue loader:

    npm run seed:safe

Alternatively, from the backend directory:

    node scripts/addMoreProducts.js

Back up important data before running any database seeding operation.

## ▶️ Run the Application

Open two terminals from the project root.

**Terminal 1 — Backend**

    npm run backend

Backend URL: http://localhost:5000

Health Check: http://localhost:5000/api/health

**Terminal 2 — Frontend**

    npm run frontend

Frontend URL: http://localhost:5173

You can also start each application using its own development script from the corresponding directory.

## 🧪 Automated Testing

Run the tests from the project root:

    npm test

Or from the backend directory:

    cd backend
    npm test

The documented test suite contains 64 tests covering:

- Authentication and JWT validation.
- Password hashing.
- Product catalogue integrity.
- COD order calculations.
- Server-side price validation.
- Stock deduction and restoration.
- Order cancellation rules.
- Search sanitization and pagination.
- API route security.

Run the tests locally to verify the current passing count before describing the suite as fully passing.

## 🏗️ Production Build

Build the frontend from the project root:

    npm run build:frontend

Or from the frontend directory:

    npm run build

Production files are generated in `frontend/dist/`.

## 📡 API Reference

### 🔐 Authentication — `/api/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |
| GET | `/api/auth/me` | Get the current profile | JWT Required |

### 🛍️ Products — `/api/products`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/products` | Search, filter, sort, paginate | Public |
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
- [ ] CORS allows the intended frontend origin.
- [ ] Authentication and API validation are tested.
- [ ] Important database data is backed up before seeding.

## 🧑‍💻 Demo Credentials

The project documentation lists the following demo account:

- **Email:** `demo@example.com`
- **Password:** `password123`

A demo login button is described on the Login page. The account must exist in the deployed database for login to work. Do not use these credentials for a personal account.

## 👨‍💻 Author

**Zaid Imam**

- GitHub: [@zaidimam15](https://github.com/zaidimam15)
- Repository: [Simple E-Commerce Store](https://github.com/zaidimam15/simple-ecommerce-store)

## 📄 License

Licensed under the ISC License. See the repository's license file for details.

Developed as part of the CodeAlpha Full Stack Development Internship.
