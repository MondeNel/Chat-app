import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // Fallback to 5001 if PORT is not set

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });