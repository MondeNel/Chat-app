import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", logout);

// Update profile route (protected)
router.put("/update-profile", protectRoute, updateProfile);

// Check if user is authenticated
router.get("/check", protectRoute, checkAuth)

export default router;