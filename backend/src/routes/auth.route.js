import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup route
router.get("/signup", signup);

// Login route
router.get("/login", login);


// Logout route
router.get("/logout", logout);

export default router;