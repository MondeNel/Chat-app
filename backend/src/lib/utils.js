import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    // Generate a JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
    });

    // Set the token in a cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevents XSS attacks (cross-site scripting attacks)
        sameSite: "strict", // Prevents CSRF attacks (cross-site request forgery)
        secure: process.env.NODE_ENV !== "development", // Ensure cookies are only sent over HTTPS in production
    });

    return token; // Return the generated token
};