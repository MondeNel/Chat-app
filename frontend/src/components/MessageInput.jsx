import React, { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import { X } from 'lucide-react'; // Make sure to import the icon for removal

const MessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore(); // Assuming sendMessages is defined in your store

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove the Image Preview
  const removeImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = ''; // Reset file input
  };

  // Handle Send Message (with or without image)
  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (text.trim() || imagePreview) {
      const messageData = {
        text,
        image: imagePreview, // Send image if available
      };
      sendMessages(messageData); // Use the sendMessages function from your store
      setText(''); // Clear text input after sending
      setImagePreview(null); // Clear image preview after sending
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage}>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-2 rounded-md border border-zinc-300"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-2 rounded-md bg-base-300"
          >
            📷
          </button>
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-500 text-white"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
