import mongoose from "mongoose";

// Define the schema for the Message model
const messageSchema = new mongoose.Schema(
    {
        // Sender ID: References the User who sent the message
        senderId: {
            type: mongoose.Schema.Types.ObjectId, // Data type: MongoDB ObjectId
            ref: "User", // Reference to the User model
            required: true, // Field is required
        },

        // Receiver ID: References the User who received the message
        receiverId: {
            type: mongoose.Schema.Types.ObjectId, // Data type: MongoDB ObjectId
            ref: "User", // Reference to the User model
            required: true, // Field is required
        },

        // Text content of the message (optional if an image is provided)
        text: {
            type: String, // Data type: String
        },

        // Image URL of the message (optional if text is provided)
        image: {
            type: String, // Data type: String
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Message model from the schema
const Message = mongoose.model("Message", messageSchema);

// Export the Message model for use in other parts of the application
export default Message;