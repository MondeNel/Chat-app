import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from './useAuthStore.js';

/**
 * Zustand store for managing chat-related state.
 */
export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null, 
    isUsersLoading: false,
    isMessagesLoading: false,

    /**
     * Fetches users and updates the state.
     */
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    /**
     * Fetch messages and update the state.
     */
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get();
    
        if (!selectedUser) {
            toast.error("No user selected!");
            return;
        }
    
        console.log("Sending message to:", selectedUser._id);
        console.log("Message Data:", messageData);
    
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error("Failed to send message:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Failed to send message.");
        }
    },

    /**
     * Subscribe to new messages via WebSocket
     */
    subscribeToMessages: () => {  // ✅ Fixed typo in function name
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on('newMessage', (newMessage) => {
            set({
                messages: [...get().messages, newMessage], // ✅ Corrected 'message' to 'messages'
            });
        });
    },

    /**
     * Unsubscribe from new message events
     */
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage');
    },

    /**
     * Select a user and update the state.
     */
    setSelectedUser: (selectedUser) => set({ selectedUser }), // Ensures only one user is selected

}));
