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