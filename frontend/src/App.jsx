import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="app-container">
                <Navbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/order-success/:id"
                      element={
                        <ProtectedRoute>
                          <OrderSuccessPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/orders"
                      element={
                        <ProtectedRoute>
                          <MyOrdersPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
