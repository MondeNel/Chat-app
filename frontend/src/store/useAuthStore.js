import { create } from 'zustand';
import axiosInstance from '../lib/axios.js'; 
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null, // Authenticated user data
  isCheckingAuth: true, // Loading state for auth check

  // Check authentication status
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data }); // Set authenticated user
    } catch (error) {
      console.error('Error in checkAuth:', error);
      set({ authUser: null }); // Clear user on error
    } finally {
      set({ isCheckingAuth: false }); // End loading state
    }
  },

  // Signup function
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data); 
      set({ authUse:res.data });
      toast.success('Account created successfully');
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error in signup:', error);
    } finally {
      set({ isSigningUp: false });
    }
  },


  // Log in an existing user
  login: async (credentials) => {
    set({ isLoggingIn: true }); // Start loading state
    try {
      const res = await axiosInstance.post('/auth/login', credentials);
      set({ authUser: res.data }); // Set authenticated user
    } catch (error) {
      console.error('Error in login:', error);
      throw error; // Re-throw error for handling in the UI
    } finally {
      set({ isLoggingIn: false }); // End loading state
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    set({ isUpdatingProfile: true }); // Start loading state
    try {
      const res = await axiosInstance.put('/auth/profile', profileData);
      set({ authUser: res.data }); // Update authenticated user
    } catch (error) {
      console.error('Error in updateProfile:', error);
      throw error; // Re-throw error for handling in the UI
    } finally {
      set({ isUpdatingProfile: false }); // End loading state
    }
  },

  // Log out the user
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null }); // Clear authenticated user
    } catch (error) {
      console.error('Error in logout:', error);
      throw error; // Re-throw error for handling in the UI
    }
  },
}));