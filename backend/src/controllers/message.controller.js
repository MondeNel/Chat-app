import User from "../models/user.models.js"; 

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