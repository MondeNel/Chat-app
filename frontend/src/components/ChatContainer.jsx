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

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isSender = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              ref={index === messages.length - 1 ? messageEndRef : null} // Attach ref only to the last message
            >
              <div className={`flex items-end gap-2 ${isSender ? "flex-row-reverse" : "flex-row"}`}>
                {/* Profile Picture */}
                <div className="avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        isSender
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>

                {/* Chat Bubble */}
                <div
                  className={`chat-bubble px-3 py-2 max-w-[75%] ${
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
                  {message.text && <p>{message.text}</p>}
                  {/* Timestamp */}
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formatMessageTime(message.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
