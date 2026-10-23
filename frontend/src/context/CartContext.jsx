import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'codealpha_ecommerce_cart';

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Add item to cart with stock validation
  const addToCart = (product, requestedQty = 1) => {
    const qty = Math.max(1, parseInt(requestedQty, 10) || 1);

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product === product._id);

      if (existingItemIndex > -1) {
        const currentQty = prevItems[existingItemIndex].quantity;
        const newQty = currentQty + qty;

        if (newQty > product.stock) {
          showToast(`Cannot add more. Maximum available stock is ${product.stock}.`, 'error');
          return prevItems;
        }

        const updated = [...prevItems];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: newQty,
        };
        showToast(`Updated quantity of "${product.name}" in your cart.`, 'success');
        return updated;
      } else {
        if (qty > product.stock) {
          showToast(`Requested quantity exceeds available stock of ${product.stock}.`, 'error');
          return prevItems;
        }

        showToast(`Added "${product.name}" to cart!`, 'success');
        return [
          ...prevItems,
          {
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock,
            category: product.category,
            quantity: qty,
          },
        ];
      }
    });
  };

  // Update quantity directly
  const updateQuantity = (productId, newQty) => {
    const qty = parseInt(newQty, 10);

    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product === productId) {
          if (qty <= 0) return null; // Filtered out below
          if (qty > item.stock) {
            showToast(`Maximum available stock for this item is ${item.stock}.`, 'error');
            return { ...item, quantity: item.stock };
          }
          return { ...item, quantity: qty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Remove single item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.product === productId);
      if (removedItem) {
        showToast(`Removed "${removedItem.name}" from cart.`, 'info');
      }
      return prevItems.filter((item) => item.product !== productId);
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Calculations
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const itemsPrice = Math.round(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100
  ) / 100;

  // Free shipping on orders over $50, else $10 shipping
  const shippingPrice = itemsPrice === 0 ? 0 : itemsPrice > 50 ? 0 : 10;

  // 5% standard tax
  const taxPrice = Math.round(itemsPrice * 0.05 * 100) / 100;

  const totalPrice = Math.round((itemsPrice + shippingPrice + taxPrice) * 100) / 100;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
