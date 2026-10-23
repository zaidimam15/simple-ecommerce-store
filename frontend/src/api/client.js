const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper to make API requests
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Attach JWT token if saved in localStorage
  const token = localStorage.getItem('codealpha_token');

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      const errorMsg =
        data.message || `Request failed with status ${response.status}`;

      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    if (
      error.name === 'TypeError' &&
      error.message.includes('fetch')
    ) {
      throw new Error(
        'Unable to connect to backend server. Make sure the backend is running on port 5000.'
      );
    }

    throw error;
  }
}

// Authentication API
export const authAPI = {
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () =>
    request('/auth/me', {
      method: 'GET',
    }),
};

// Products API
export const productAPI = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams();

    if (params.category && params.category !== 'All') {
      query.append('category', params.category);
    }

    if (params.search) {
      query.append('search', params.search);
    }

    if (params.sort) {
      query.append('sort', params.sort);
    }

    if (params.page) {
      query.append('page', params.page);
    }

    if (params.limit) {
      query.append('limit', params.limit);
    }

    if (params.all) {
      query.append('all', params.all);
    }

    const queryString = query.toString()
      ? `?${query.toString()}`
      : '';

    return request(`/products${queryString}`, {
      method: 'GET',
    });
  },

  getProductById: (id) =>
    request(`/products/${id}`, {
      method: 'GET',
    }),
};

// Orders API
export const orderAPI = {
  createOrder: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getMyOrders: () =>
    request('/orders/my-orders', {
      method: 'GET',
    }),

  getOrderById: (id) =>
    request(`/orders/${id}`, {
      method: 'GET',
    }),

  // Cancel an order
  cancelOrder: (id) =>
    request(`/orders/${id}/cancel`, {
      method: 'PATCH',
    }),
};