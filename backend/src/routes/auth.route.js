import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js"; // Import the protectRoute middleware

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", logout);

// Update profile route (protected)
router.put("/update-profile", protectRoute, updateProfile);

export default router;