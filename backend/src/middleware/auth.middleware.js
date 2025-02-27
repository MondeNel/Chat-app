import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Extract the token from the cookies
        const token = req.cookies.jwt;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token is valid
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // Find the user in the database
        const user = await User.findById(decoded.userId).select("-password");

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};