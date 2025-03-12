import React from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useChatStore } from '../store/useChatStore.js';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();


  return (
    <div className='p-2.5 border-b border-base-300'>
        <div className='flex items-center justify-between'>
            <div className='flex items-cente gap-3'>
                {/* Avatar */}
                <div className='avatar'>
                    <div className='size-10 rounded-full relative'>
                        <img src={selectedUser.profilePic || '/avatar.png'} alt={selectedUser.fullName} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader