import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

/**
 * Zustand store for managing chat-related state.
 */
export const useChatStore = create((set) => ({
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

    /**
     * Select a user and update the state.
     */
    setSelectedUser: (selectedUser) => set({ selectedUser }), // Ensures only one user is selected

}));
