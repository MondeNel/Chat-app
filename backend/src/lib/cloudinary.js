import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true, // Ensure all requests are made over HTTPS
});

// Log Cloudinary configuration status
console.log("Cloudinary configured successfully!");

// Export the configured Cloudinary instance
export default cloudinary;