import express from "express";
import { protectRoute } from "../middleware/auth.middleware"; 
import { getUsersForSidebar } from "../controllers/message.controller.js"


// Create an Express router
const router = express.Router();

// Define a GET route to fetch users for the sidebar
// This route is protected by the protectRoute middleware
router.get("/users", protectRoute, getUsersForSidebar);

// Export the router for use in other parts of the application
export default router;