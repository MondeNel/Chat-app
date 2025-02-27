import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const updateProfile = async (req, res) => {
    const { fullName, profilePic } = req.body;
    const userId = req.user._id; // Get the user ID from the request object (attached by protectRoute)

    try {
        // Find the user by ID and update their profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, profilePic },
            { new: true } // Return the updated user
        ).select("-password"); // Exclude the password field from the response

        // Check if the user exists
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the updated user in the response
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};