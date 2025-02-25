import express from "express";

const router = express.Router();

// Signup route
router.post("/signup", (req, res) => {
    try {
        res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login route
router.post("/login", (req, res) => {
    try {
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Logout route
router.get("/logout", (req, res) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;