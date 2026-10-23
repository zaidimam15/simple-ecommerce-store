import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = 'codealpha_ecommerce_wishlist';

export const WishlistProvider = ({ children }) => {
  const { showToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (err) {
      console.error('Failed to save wishlist to localStorage', err);
    }
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const toggleWishlist = (product) => {
    if (!product || !product._id) return;

    setWishlistItems((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        showToast(`Removed "${product.name}" from your wishlist.`, 'info');
        return prev.filter((item) => item._id !== product._id);
      } else {
        showToast(`Saved "${product.name}" to your wishlist!`, 'success');
        return [
          ...prev,
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: product.stock,
            rating: product.rating,
          },
        ];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => {
      const item = prev.find((i) => i._id === productId);
      if (item) {
        showToast(`Removed "${item.name}" from wishlist.`, 'info');
      }
      return prev.filter((i) => i._id !== productId);
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
