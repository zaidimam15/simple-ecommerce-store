import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../api/client';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import QuickViewModal from '../components/QuickViewModal';
import {
  Sparkles,
  PackageOpen,
  AlertCircle,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Lock,
  ArrowRight,
  Star,
  Zap,
} from '../components/Icons';

// Metadata for rich editorial category cards with high-definition imagery and vibrant accents
const CATEGORY_TILES = [
  {
    name: 'Electronics',
    tag: 'Audio, Wearables & Workstations',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    color: '#4361ee',
  },
  {
    name: 'Fashion',
    tag: 'Luxury Cashmere, Denim & Outerwear',
    icon: '🧥',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80',
    color: '#ff5a5f',
  },
  {
    name: 'Shoes',
    tag: 'Runners, Chelsea Boots & Sneakers',
    icon: '👟',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    color: '#f72585',
  },
  {
    name: 'Accessories',
    tag: 'Horology, Wallets & Fine Jewelry',
    icon: '⌚',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    color: '#7209b7',
  },
  {
    name: 'Home & Kitchen',
    tag: 'Espresso Machines & Culinary Tools',
    icon: '☕',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
    color: '#ff6b35',
  },
  {
    name: 'Beauty & Personal Care',
    tag: 'Serums, Skincare & Grooming',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80',
    color: '#06d6a0',
  },
  {
    name: 'Sports & Fitness',
    tag: 'Yoga, Weights & Recovery Gear',
    icon: '🏋️',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    color: '#3a86ff',
  },
  {
    name: 'Books & Stationery',
    tag: 'Fountain Pens & Archival Notebooks',
    icon: '📖',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    color: '#e76f51',
  },
  {
    name: 'Gaming',
    tag: 'Mechanical Keyboards, Mice & Headsets',
    icon: '🎮',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    color: '#4cc9f0',
  },
  {
    name: 'Bags & Travel',
    tag: 'Cordura Backpacks & Luggage',
    icon: '🧳',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    color: '#f4a261',
  },
];

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productsSectionRef = useRef(null);

  // Synchronize state with URL parameters for deep-linking & browser history
  const searchFromUrl = searchParams.get('search') || '';
  const categoryFromUrl = searchParams.get('category') || 'All';
  const sortFromUrl = searchParams.get('sort') || 'latest';
  const pageFromUrl = parseInt(searchParams.get('page'), 10) || 1;
  const limitFromUrl = parseInt(searchParams.get('limit'), 10) || 12;

  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // QuickView modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Fetch primary catalogue
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await productAPI.getProducts({
        category: categoryFromUrl,
        search: searchFromUrl,
        sort: sortFromUrl,
        page: pageFromUrl,
        limit: limitFromUrl,
      });

      if (res.success) {
        setProducts(res.products || []);
        setTotalProducts(res.totalProducts ?? (res.products?.length || 0));
        setTotalPages(res.totalPages || 1);

        if (res.categories && res.categories.length > 0) {
          setCategories(res.categories);
        }
      } else {
        throw new Error(res.message || 'Failed to load products');
      }
    } catch (err) {
      console.error('Fetch products error:', err);
      setError(err.message || 'Error connecting to database');
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending products once on initial mount (sorted by highest rated)
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await productAPI.getProducts({
          sort: 'rating',
          limit: 4,
          page: 1,
        });
        if (res.success && res.products) {
          setTrendingProducts(res.products);
        }
      } catch (e) {
        console.warn('Could not fetch trending products:', e.message);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [categoryFromUrl, searchFromUrl, sortFromUrl, pageFromUrl, limitFromUrl]);

  // Helper to update URL search parameters
  const updateParams = (newParams) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (
        val === undefined ||
        val === null ||
        val === '' ||
        (key === 'category' && val === 'All') ||
        (key === 'page' && val === 1) ||
        (key === 'limit' && val === 12) ||
        (key === 'sort' && val === 'latest')
      ) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(val));
      }
    });
    setSearchParams(nextParams);
  };

  const handleCategoryClick = (cat) => {
    updateParams({ category: cat, page: 1 });
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSortChange = (e) => {
    updateParams({ sort: e.target.value, page: 1 });
  };

  const handleLimitChange = (e) => {
    updateParams({ limit: parseInt(e.target.value, 10), page: 1 });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === pageFromUrl) return;
    updateParams({ page: newPage });

    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClearSearch = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('search');
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handleResetAllFilters = () => {
    setSearchParams({});
  };

  const scrollToCatalogue = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate pagination page numbers with smart ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];
    const leftBound = Math.max(2, pageFromUrl - 1);
    const rightBound = Math.min(totalPages - 1, pageFromUrl + 1);

    if (leftBound > 2) {
      pages.push('...');
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }

    if (rightBound < totalPages - 1) {
      pages.push('...');
    }

    pages.push(totalPages);
    return pages;
  };

  // Calculate item range currently displayed
  const startItem = totalProducts > 0 ? (pageFromUrl - 1) * limitFromUrl + 1 : 0;
  const endItem = Math.min(pageFromUrl * limitFromUrl, totalProducts);

  return (
    <div className="homepage-editorial">
      {/* 1. Distinctive Editorial Hero Section */}
      <section className="editorial-hero">
        <div className="container hero-container">
          <div className="hero-text-block">
            <div className="hero-season-tag">
              <span className="hero-dot" />
              <span>AUTUMN/WINTER 2026 ATELIER COLLECTION</span>
            </div>

            <h1 className="editorial-hero-title">
              Form. Function. <br />
              <span className="accent-text">Enduring Craft.</span>
            </h1>

            <p className="editorial-hero-lead">
              A curated archive of 122 design-led objects across 10 distinct categories.
              Engineered with full-stack MongoDB precision and secured with Cash on Delivery.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                onClick={scrollToCatalogue}
                className="btn btn-primary btn-hero-primary"
              >
                <span>Browse Entire Catalogue</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => handleCategoryClick('Gaming')}
                className="btn btn-secondary btn-hero-secondary"
              >
                <span>Explore Gaming & Tech</span>
              </button>
            </div>

            {/* Metrics Live Strip */}
            <div className="hero-metrics-strip">
              <div className="metric-cell">
                <span className="metric-val">122</span>
                <span className="metric-lbl">Unique Pieces</span>
              </div>
              <div className="metric-separator" />
              <div className="metric-cell">
                <span className="metric-val">10</span>
                <span className="metric-lbl">Categories</span>
              </div>
              <div className="metric-separator" />
              <div className="metric-cell">
                <span className="metric-val">100%</span>
                <span className="metric-lbl">Real Stock Sync</span>
              </div>
              <div className="metric-separator" />
              <div className="metric-cell">
                <span className="metric-val">COD</span>
                <span className="metric-lbl">Verified Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Editorial Composition */}
          <div className="hero-visual-card">
            <div className="hero-visual-inner">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                alt="Studio Headphones Editorial"
                className="hero-featured-img"
              />
              <div className="hero-floating-badge">
                <span className="badge-featured-label">Curator’s Choice</span>
                <h4 className="badge-featured-title">Sony WH-1000XM5 Studio ANC</h4>
                <div className="badge-featured-bottom">
                  <span className="badge-featured-price">$398.00</span>
                  <span className="badge-featured-stock">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust & Value Strip */}
      <section className="editorial-trust-strip">
        <div className="container trust-strip-inner">
          <div className="trust-strip-item">
            <Truck size={22} className="trust-icon" />
            <div>
              <h4 className="trust-title">Free Express Shipping</h4>
              <p className="trust-desc">Complimentary on all orders over $50</p>
            </div>
          </div>
          <div className="trust-strip-item">
            <Lock size={22} className="trust-icon" />
            <div>
              <h4 className="trust-title">Cash on Delivery</h4>
              <p className="trust-desc">Pay upon doorstep receipt with zero online risk</p>
            </div>
          </div>
          <div className="trust-strip-item">
            <ShieldCheck size={22} className="trust-icon" />
            <div>
              <h4 className="trust-title">Official Guarantee</h4>
              <p className="trust-desc">1-Year brand warranty on all hardware</p>
            </div>
          </div>
          <div className="trust-strip-item">
            <RefreshCw size={22} className="trust-icon" />
            <div>
              <h4 className="trust-title">30-Day Returns</h4>
              <p className="trust-desc">Hassle-free direct inventory restoration</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Category Grid Tiles */}
      <section className="container section-categories">
        <div className="section-header-row">
          <div>
            <span className="section-pre-title">DISCOVER BY DEPARTMENT</span>
            <h2 className="section-main-title">Explore 10 Distinct Categories</h2>
          </div>
          <button
            type="button"
            onClick={() => handleCategoryClick('All')}
            className="btn btn-sm btn-outline"
          >
            View All Categories
          </button>
        </div>

        <div className="category-tiles-grid">
          {CATEGORY_TILES.map((cat) => {
            const isSelected = categoryFromUrl === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`category-tile-card ${isSelected ? 'selected' : ''}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCategoryClick(cat.name);
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="tile-bg-image"
                  loading="lazy"
                />
                <div className="tile-gradient-overlay" />
                <div className="tile-content">
                  <div className="tile-top-bar">
                    <span className="tile-icon-badge" style={{ backgroundColor: cat.color }}>
                      {cat.icon}
                    </span>
                    <span className="tile-arrow-btn">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                  <div className="tile-bottom-bar">
                    <h3 className="tile-title">{cat.name}</h3>
                    <p className="tile-tag">{cat.tag}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Trending & Top Rated Curated Spotlight */}
      {trendingProducts.length > 0 && !searchFromUrl && categoryFromUrl === 'All' && pageFromUrl === 1 && sortFromUrl === 'latest' && (
        <section className="container section-trending">
          <div className="section-header-row">
            <div>
              <span className="section-pre-title">TOP RATED ARCHIVE</span>
              <h2 className="section-main-title">Curated Best Sellers</h2>
            </div>
            <div className="trending-rating-badge">
              <Star size={15} fill="#f59e0b" stroke="#f59e0b" />
              <span>Rated 4.8+ by Verified Clients</span>
            </div>
          </div>

          <div className="products-grid">
            {trendingProducts.map((product) => (
              <ProductCard
                key={`trending-${product._id}`}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. Main Product Catalogue Section */}
      <section className="container section-catalogue" ref={productsSectionRef} id="products-section">
        <div className="section-header-row">
          <div>
            <span className="section-pre-title">ARCHIVE BROWSER</span>
            <h2 className="section-main-title">Complete Store Inventory</h2>
          </div>

          {/* Sort Control */}
          <div className="sort-control-wrap">
            <ArrowUpDown size={16} color="var(--text-muted)" />
            <select
              value={sortFromUrl}
              onChange={handleSortChange}
              className="sort-select"
              aria-label="Sort products"
            >
              <option value="latest">Sort by: Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated (4.5★ - 5.0★)</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="category-pills-scroll-wrap">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`category-pill ${categoryFromUrl === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Active Search Notification */}
        {searchFromUrl && (
          <div className="search-banner">
            <span>
              Searching archive for: <strong>"{searchFromUrl}"</strong>
            </span>
            <button
              type="button"
              onClick={handleClearSearch}
              className="btn btn-sm btn-secondary"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Catalogue Meta Bar: Product Count & Per Page Selector */}
        {!loading && !error && (
          <div className="catalogue-meta-bar">
            <span className="product-count-text">
              {totalProducts === 0 ? (
                'No products match your criteria'
              ) : (
                <>
                  Showing <strong>{startItem}–{endItem}</strong> of <strong>{totalProducts}</strong> products
                  {categoryFromUrl !== 'All' && <span> in <strong>{categoryFromUrl}</strong></span>}
                </>
              )}
            </span>

            {totalProducts > 0 && (
              <div className="catalogue-controls-right">
                <div className="page-size-selector">
                  <span>Show per page:</span>
                  <select
                    value={limitFromUrl}
                    onChange={handleLimitChange}
                    className="page-size-select"
                    aria-label="Products per page"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading Shimmer State */}
        {loading && <ProductSkeleton count={limitFromUrl} />}

        {/* Error State */}
        {!loading && error && (
          <div className="empty-state">
            <AlertCircle className="empty-icon" style={{ color: 'var(--danger)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Database Connection Notice
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
              {error}
            </p>
            <button onClick={fetchProducts} className="btn btn-primary">
              Retry Connection
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <PackageOpen className="empty-icon" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              No products found
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              We couldn't find any products matching your search or selected category.
            </p>
            <button
              onClick={handleResetAllFilters}
              className="btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}

        {/* Pagination Navigation */}
        {!loading && !error && totalPages > 1 && (
          <div className="pagination-wrapper">
            <nav className="pagination-container" aria-label="Product catalogue pagination">
              <button
                type="button"
                onClick={() => handlePageChange(pageFromUrl - 1)}
                disabled={pageFromUrl <= 1}
                className="pagination-btn"
                title="Go to previous page"
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>

              <div className="pagination-pages">
                {getPageNumbers().map((pageItem, idx) => {
                  if (pageItem === '...') {
                    return (
                      <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                        •••
                      </span>
                    );
                  }

                  const isCurrent = pageItem === pageFromUrl;
                  return (
                    <button
                      key={`page-${pageItem}`}
                      type="button"
                      onClick={() => handlePageChange(pageItem)}
                      className={`pagination-page-btn ${isCurrent ? 'active' : ''}`}
                      aria-label={`Page ${pageItem}`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {pageItem}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(pageFromUrl + 1)}
                disabled={pageFromUrl >= totalPages}
                className="pagination-btn"
                title="Go to next page"
                aria-label="Next Page"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </nav>

            <span className="pagination-info">
              Page {pageFromUrl} of {totalPages} ({totalProducts} total objects)
            </span>
          </div>
        )}
      </section>

      {/* QuickView Modal Mount */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default HomePage;
