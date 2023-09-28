// App.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000'); // Update with your backend server URL

function ChatBox() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('messages', (data) => {
      setMessages(data);
    });

    socket.on('new-message', (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        text: message,
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit('send-message', newMessage);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <p>{msg.text}</p>
              <small>{msg.timestamp}</small>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
