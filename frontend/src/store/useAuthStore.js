import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

// Load user and token from localStorage on app startup
const storedUser = JSON.parse(localStorage.getItem("authUser")) || null;
const storedToken = localStorage.getItem("authToken") || null;

export const useAuthStore = create((set, get) => ({
  authUser: storedUser,
  token: storedToken,
  isCheckingAuth: true,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isSigningUp: false,

  // Check authentication status on app load
  checkAuth: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      set({ authUser: null, token: null, isCheckingAuth: false });
      return;
    }

    try {
      const res = await axiosInstance.get("/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Auth Check Response:", res.data);
      set({ authUser: res.data.user, token });
      localStorage.setItem("authUser", JSON.stringify(res.data.user)); // Persist user data
    } catch (error) {
      console.log("Auth check failed:", error);
      set({ authUser: null, token: null });
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Login Function
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      set({ authUser: res.data.user, token: res.data.token });
      localStorage.setItem("authUser", JSON.stringify(res.data.user));
      localStorage.setItem("authToken", res.data.token);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Update Profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const token = get().token;
      const res = await axiosInstance.put("/auth/update-profile", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Logout
  logout: () => {
    set({ authUser: null, token: null });
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully");
  },

   // Signup function
   signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data)); // Persist user
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
}));

