import React, { useState, useEffect } from 'react';

const ChatMessages = () => {
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [receiver, setReceiver] = useState('John'); // Change to the recipient's name

  // Simulate receiving messages from another user (e.g., John)
  useEffect(() => {
    const receiveMessage = () => {
      const newMessage = {
        sender: receiver,
        text: 'Hello, how can I help you?',
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages([...chatMessages, newMessage]);
    };

    // Simulate receiving a message after a delay
    const timer = setTimeout(receiveMessage, 2000); // Adjust delay as needed

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [chatMessages, receiver]);

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      // Create a new message object with sender, text, and timestamp
      const newMessage = {
        sender: 'You',
        text: messageText,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Add the new message to the chatMessages state
      setChatMessages([...chatMessages, newMessage]);

      // Clear the input field
      setMessageText('');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4 bg-gray-200">
        {/* Your contact list code here */}
      </div>
      <div className="w-3/4 p-4 bg-white">
        <div className="border rounded-lg p-4 h-full">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{`Chat with ${receiver}`}</h2>
          </div>
          <div className="border-t border-gray-300 h-3/4 overflow-y-auto">
            {chatMessages.map((message, index) => (
              <div key={index} className="mb-2">
                <div
                  className={`${
                    message.sender === 'You' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span className="text-sm text-gray-600">
                    {message.sender} - {message.timestamp}
                  </span>
                  <div
                    className={`${
                      message.sender === 'You'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-700'
                    } rounded-lg p-2 inline-block`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex">
              <input
                type="text"
                className="w-full p-2 rounded-lg bg-gray-200 focus:outline-none"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
