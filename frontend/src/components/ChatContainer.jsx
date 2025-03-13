import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import MessageSkeleton from './skeletons/MessageSkeleton.jsx';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore(); // ✅ Added authUser

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]); // ✅ Prevents errors when selectedUser is null

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div 
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
          >
            {/* Profile Image */}
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img 
                  src={
                    message.senderId === authUser._id 
                      ? authUser.profilePic || '/avatar.png' 
                      : selectedUser?.profilePic || '/avatar.png'
                  } 
                  alt="profile pic" 
                />
              </div>
            </div>

            {/* Message Header & Timestamp */}
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {new Date(message.createdAt).toLocaleTimeString()} 
              </time>
            </div>

              {/* Message Bubble */}
              <div className="chat-bubble flex">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}

                {message.text && <p>{message.text}</p>}
              </div>

          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
