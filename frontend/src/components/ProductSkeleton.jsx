import React from 'react';

export const ProductSkeleton = ({ count = 8 }) => {
  return (
    <div className="products-grid" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="product-card skeleton-card">
          <div className="skeleton-image-wrap shimmer" />
          <div className="skeleton-info">
            <div className="skeleton-line skeleton-badge shimmer" />
            <div className="skeleton-line skeleton-title shimmer" />
            <div className="skeleton-line skeleton-subtitle shimmer" />
            <div className="skeleton-line skeleton-rating shimmer" />
            <div className="skeleton-footer">
              <div className="skeleton-line skeleton-price shimmer" />
              <div className="skeleton-line skeleton-btn shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
