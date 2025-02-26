import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import jwt module
import { generateToken } from "../lib/utils.js";


// SIGN-UP
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Check to see if any field is not filled
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
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
            process.env.JWT_SECRET, // Corrected typo here
            { expiresIn: "1h" }
        );

        // Send the response with the user and token
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Something went wrong" });
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

        // Send the response with the user and token
        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


// LOGOUT
export const logout = (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development", // Ensure cookies are only sent over HTTPS in production
        });

        // Send a success response
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};