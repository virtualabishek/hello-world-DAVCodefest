import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//  export const API_URL = "http://192.168.1.117:7180"; // Change to your actual API endpoint
export const API_URL ="https://khetai-4.onrender.com";


export const userAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    token: null,
setLoading: (loadingState) => set({ isLoading: loadingState }),

    signup: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/user/signup`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                
            });
            console.log(response)
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
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
            set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("No token found");

            const response = await axios.get(`${API_URL}/user/check-auth`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            console.log(error);
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

  login : async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, { email, password });
        let token = response.data.token;

        console.log("Token received from API:", token, typeof token); // Check token type

        // If token is an object, stringify it before storing
        if (typeof token === "object") {
            token = JSON.stringify(token);
        }

        // Now store the token safely as a string
        await AsyncStorage.setItem('authToken', token);

        set({
            isAuthenticated: true,
            user: response.data.user,
            token: token,
            isLoading: false,
            error: null,
        });
return response.data;
    } catch (error) {
        set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
        throw error;
    }
},

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/user/logout`);

            await AsyncStorage.removeItem("authToken");

            set({
                isAuthenticated: false,
                user: null,
                token: null,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
            throw error;
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/user/forget-password`, { email });
            set({ isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.error || "Error resetting password", isLoading: false });
        }
    },

       
  
    deviceLogin: async (deviceId, deviceCode,userId) => {
        set({ isLoading: true, error: null });
    
        try {
          const response = await axios.post(`${API_URL}/sensor/login`, {
            deviceId,
              deviceCode,
              userId
              
            
          });
    
          console.log("Device Login Response:", response.data);
    
          set({ isLoading: false, error: null });
    
          return response.data; // Return response data in case UI needs it
    
        } catch (error) {
          console.error("Error logging in device:", error);
          set({
            error: error.response?.data?.message || "Error logging in device",
            isLoading: false,
          });
          throw error;
        }
      },
      deviceLogout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axios.post(`${API_URL}/sensor/logout`); // Backend logout API (if needed)
          
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error logging out",
            isLoading: false,
          });
          throw error;
        }
      },

















}));
