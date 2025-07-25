import { create } from "zustand";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:7180";
export const website_url = "http://localhost:5173";

export const userAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  unreadNotifications: 0,
  isCheckingAuth: true,
  notifications: [],
  fetchNotifications: async (userId) => {
    try {
      if (!userId) return;
      const response = await axios.get(
        `${API_URL}/notification/user/${userId}`
      );
      set({ notifications: response.data });
      return response;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },
  fetchUnreadNotifications: async () => {
    set({ isLoading: true, error: null, unreadNotifications: 0 });
    try {
      const response = await axios.get(`${API_URL}/notification/unread-notification`);
      set({ unreadNotifications: response.data.count, isLoading: false, error: null });
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
      set({ error: error.response?.data?.message || "Error fetching unread notifications", isLoading: false });
    }
  },
  markAsRead: async (notificationId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/notification/mark-as-read`, { notificationId });
      set({ isLoading: false, error: null });
      return response;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      set({ error: error.response?.data?.message || "Error marking notification as read", isLoading: false });
    }
  },
  deleteNotification: async (notificationId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_URL}/notification/delete`, { data: { notificationId } });
      set({ isLoading: false, error: null });
      return response;
    } catch (error) {
      console.error("Error deleting notification:", error);
      set({ error: error.response?.data?.message || "Error deleting notification", isLoading: false });
    }
  },
  signup: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/user/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data; // Return success data
    } catch (error) {
      set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
      throw error;
    }
  },
  deviceLogin: async (deviceId, deviceCode, userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/sensor/login`, { deviceId, deviceCode, userId });
      set({ isLoading: false, error: null });
      return response.data;
    } catch (error) {
      console.error("Error logging in device:", error);
      set({ error: error.response?.data?.message || "Error logging in device", isLoading: false });
      throw error;
    }
  },
  deviceLogout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/sensor/logout`);
      set({ isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/user/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response.data.message || "error verifying email", isLoading: false });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/user/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/user/login`, { email, password });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "error logging in", isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/user/logout`);
      set({ isAuthenticated: false, user: null, error: null, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "error logging out", isLoading: false });
      throw error;
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/user/forget-password`, { email });
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ error: error.response?.data?.error || "Error sending reset link", isLoading: false });
    }
  },
  khaltiSend: async (itemId, totalPrice) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/khalti/initialize-khalti`, { itemId, totalPrice, website_url });
      window.location.href = response.data.payment.payment_url;
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ error: error.response?.data?.message || "error payment", isLoading: false });
    }
  },
}));