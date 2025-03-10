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
      console.log("Auth Check Response:", res.data);
      set({ authUser: res.data.user });
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
      return; // ✅ Prevents the error toast from appearing
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
      return; // ✅ Prevents the error toast from appearing
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
      return; // ✅ Prevents the error toast from appearing
    } catch (error) {
      toast.error(error?.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Log out the user
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        set({ authUser: null });
        toast.success("Logged out successfully");
        get().disconnectSocket();
        return; // ✅ Prevents the error toast from appearing
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },
}));


