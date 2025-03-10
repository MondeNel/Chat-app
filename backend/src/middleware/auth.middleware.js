import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

// Middleware to protect routes that require authentication
export const protectRoute = async (req, res, next) => {
  try {
    // Check for token in cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use the userId from decoded token to find the user in the database
    const user = await User.findById(decoded.userId).select("-password");

    // If no user is found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user to the request object for access in route handlers
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);

    // Handle specific errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    
    // If the error is anything else (like database issues), return a generic 500 error
    res.status(500).json({ message: "Internal server error" });
  }
};
