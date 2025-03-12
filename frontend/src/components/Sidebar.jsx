import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import SidebarSkeleton from '../components/skeletons/SidebarSkeleton.jsx';
import { Users } from "lucide-react"; // ✅ Importing the missing icon

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            {/* Sidebar Header */}
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>
            </div>

            {/* Users List */}
            <div className='overflow-y-auto w-full py-3'>
                {users.length === 0 ? (
                    <p className='text-center text-sm text-gray-500'>No users found</p>
                ) : (
                    users.map((user) => (
                        <button
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center gap-2 p-3 w-full text-left ${
                                selectedUser?.id === user.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                            } transition rounded-md`}
                        >
                            <span className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                                {user.name[0]}
                            </span>
                            <span className="hidden lg:block">{user.name}</span>
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
