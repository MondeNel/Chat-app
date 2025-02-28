import User from "../models/user.models.js"; 
import Message from "../models/message.model.js"; 


// Controller function to get users for the sidebar
export const getUsersForSidebar = async (req, res) => {
    try {
        // Get the ID of the currently authenticated user
        const loggedInUserId = req.user._id;

        // Fetch all users except the currently authenticated user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // Send the filtered users as a response
        res.status(200).json(filteredUsers);
    } catch (error) {
        // Log the error and send a 500 Internal Server Error response
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function to get messages between two users
export const getMessages = async (req, res) => {
    try {
        // Extract the ID of the user to chat with from the request parameters
        const { id: userToChatId } = req.params;

        // Get the ID of the currently authenticated user
        const myId = req.user._id;

        // Fetch messages between the authenticated user and the user to chat with
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId }, // Messages sent by the authenticated user
                { senderId: userToChatId, receiverId: myId }, // Messages received by the authenticated user
            ],
        });

        // Send the messages as a response
        res.status(200).json(messages);
    } catch (error) {
        // Log the error and send a 500 Internal Server Error response
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function to send a message
export const sendMessage = async (req, res) => {
    try {
        // Extract the message content (text and image) from the request body
        const { text, image } = req.body;

        // Extract the receiver's ID from the request parameters
        const { id: receiverId } = req.params;

        // Get the sender's ID from the authenticated user
        const senderId = req.user._id;

        let imageURL;
        // If an image is provided, upload it to Cloudinary
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "chat-images", // Optional: Organize images in a folder
                transformation: [{ width: 500, height: 500, crop: "fill" }], // Optional: Resize and crop the image
            });
            imageURL = uploadResponse.secure_url; // Get the secure URL of the uploaded image
        }

        // Create a new message document
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL, // Use the Cloudinary URL if an image was uploaded
        });

        // Save the message to the database
        await newMessage.save();

        // Send the newly created message as a response
        res.status(201).json(newMessage);
    } catch (error) {
        // Log the error and send a 500 Internal Server Error response
        console.log("Error in sendMessage: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};