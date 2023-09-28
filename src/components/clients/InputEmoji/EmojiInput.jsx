import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';

function EmojiInput({ id, send }) {
  const [text, setText] = useState('');

  const handleInputChange = (value) => {
    setText(value);
  };

  const handleEnter = () => {
    // Handle the action when the user presses Enter/Return key
    console.log('User pressed Enter with text:', text);
  };

  return (
    <div className="flex items-center justify-between w-full max-w-full border rounded-lg p-2 bg-white ">
      <InputEmoji
        value={text}
        onChange={handleInputChange}
        cleanOnEnter
        onEnter={handleEnter}
        placeholder="Type your message..."
        className="w-full mr-2 outline-none"
      />
      <button
    onClick={async() =>{await send(id, text)
        setText('')
    }}
        className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition duration-300 ease-in-out"
      >
        Send
      </button>
    </div>
  );
}

export default EmojiInput;
