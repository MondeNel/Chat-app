import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';

/**
 * Zustand store for managing chat-related state.
 */
export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUsers: [],
    isUsersLoading: false,
    isMessagesLoading: false,
}));