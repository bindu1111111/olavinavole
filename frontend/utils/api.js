import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Products API
export const productAPI = {
  getAll: async (filters = {}) => {
    const response = await axios.get(`${API_BASE_URL}/products`, { params: filters });
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  create: async (productData) => {
    const response = await axios.post(`${API_BASE_URL}/products`, productData, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  addReview: async (productId, reviewData) => {
    const response = await axios.post(`${API_BASE_URL}/products/${productId}/review`, reviewData, {
      headers: getAuthHeader(),
    });
    return response.data;
  },
};

// Orders API
export const orderAPI = {
  create: async (orderData) => {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/orders`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/orders/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  updateStatus: async (id, statusData) => {
    const response = await axios.put(`${API_BASE_URL}/orders/${id}/status`, statusData, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  confirmPayment: async (orderId, paymentIntentId) => {
    const response = await axios.post(
      `${API_BASE_URL}/orders/${orderId}/confirm-payment`,
      { orderId, paymentIntentId },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  cancel: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/orders/${id}/cancel`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },
};

export default {
  productAPI,
  orderAPI,
};
