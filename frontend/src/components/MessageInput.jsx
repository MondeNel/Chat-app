import React, { useRef, useState } from 'react';


const MessageInput = () => {
  const [ text, setText ] = useState('');
  const [ imagePreview , setImagePriview ] = useState(null);
  const fileInputRef = useRef(null);

  
  return (
    <div>MessageInput</div>
  )
}

export default MessageInput