import create from 'zustand';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      localStorage.setItem('token', response.data.token);
      set({ user: response.data.user, token: response.data.token, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message, isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      set({ user: response.data.user, token: response.data.token, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  restoreSession: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ token });
    }
  },
}));

export const useCartStore = create((set, get) => ({
  cart: null,
  isLoading: false,

  getCart: async (token) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ cart: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addToCart: async (token, productId, quantity, customization) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart/add`,
        { productId, quantity, customization },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ cart: response.data.cart, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  removeFromCart: async (token, productId) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart/remove`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ cart: response.data.cart, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateCartItem: async (token, productId, quantity) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(
        `${API_BASE_URL}/cart/update`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ cart: response.data.cart, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  clearCart: async (token) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(`${API_BASE_URL}/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ cart: response.data.cart, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
