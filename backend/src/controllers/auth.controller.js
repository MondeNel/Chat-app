import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

// SIGN-UP
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Check to see if any field is not filled
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT for the new user
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send the response with the user and token
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT for the authenticated user
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set the token in a cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Send the response with the user and token
        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// LOGOUT
export const logout = (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });

        // Send a success response
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    const { fullName } = req.body;
    let { profilePic } = req.body;

    // Check if at least one field is provided
    if (!fullName && !profilePic) {
        return res.status(400).json({ message: "At least one field (fullName or profilePic) is required" });
    }

    // Ensure the user is authenticated
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized - User not authenticated" });
    }

    const userId = req.user._id; // Get the user ID from the request object (attached by protectRoute)

    try {
        // If a new profile picture is provided, upload it to Cloudinary
        if (profilePic) {
            // Validate profilePic URL format
            const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if (!urlRegex.test(profilePic)) {
                return res.status(400).json({ message: "Invalid profile picture URL" });
            }

            // Upload the image to Cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
                folder: "profile-pictures", // Optional: Organize images in a folder
                transformation: [{ width: 150, height: 150, crop: "fill" }], // Optional: Resize and crop the image
            });

            // Set the profilePic URL to the Cloudinary secure URL
            profilePic = uploadedResponse.secure_url;
        }

        // Find the user by ID and update their profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, profilePic },
            { new: true, runValidators: true } // Return the updated user and enforce schema validation
        ).select("-password"); // Exclude the password field from the response

        // Check if the user exists
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the updated user in the response
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// CHECK AUTH
export const checkAuth = (req, res) => {
    try {
        // Return the authenticated user's details
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};