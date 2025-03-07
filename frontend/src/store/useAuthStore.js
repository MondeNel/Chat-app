import { create } from "zustand";
import axiosInstance from '../lib/axios.js'
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
  authUser: null, // Authenticated user data
  isCheckingAuth: true, // Loading state for auth check
  isSigningUp: false, // Loading state for signup
  isLoggingIn: false, // Loading state for login
  isUpdatingProfile: false, // Loading state for profile update

  // Check authentication status
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("Auth Check Response:", res.data); // ✅ Check if backend response is correct
      set({ authUser: res.data.user }); // Make sure this matches backend structure
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  

  // Signup function
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Log in an existing user
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Update user profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error?.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Log out the user
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

}));
