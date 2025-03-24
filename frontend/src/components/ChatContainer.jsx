import { useChatStore } from "../store/useChatStore.js";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // Fetch messages and subscribe to real-time updates
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id); // Fetch messages for the selected user
      subscribeToMessages(); // Subscribe to real-time updates
    }

    return () => {
      unsubscribeFromMessages(); // Unsubscribe when the component unmounts
    };
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Show loading skeleton if messages are loading
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Chat Header */}
      <ChatHeader />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isSender = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              ref={index === messages.length - 1 ? messageEndRef : null} // Attach ref to the last message
            >
              <div className={`flex items-end gap-2 ${isSender ? "flex-row-reverse" : "flex-row"}`}>
                {/* Profile Picture */}
                <div className="avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        isSender
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser?.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>

                {/* Chat Bubble */}
                <div
                  className={`max-w-[75%] rounded-xl p-3 shadow-sm ${
                    isSender ? "bg-primary text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p className="text-sm">{message.text}</p>}

                  {/* Timestamp */}
                  <div
                    className={`text-xs mt-1 ${
                      isSender ? "text-white/70" : "text-black/70"
                    } text-right`}
                  >
                    {formatMessageTime(message.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;