import React, { useEffect, useState } from 'react';
import userInstance from '../../../../Axios/userAxios';
import InputEmoji from 'react-input-emoji';
import './ChatBox.css';

const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch user data of the chat partner
    const id = chat?.members?.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const response = await userInstance.get(`/user/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) {
      getUserData();
    }
  }, [chat, currentUserId]);

  useEffect(() => {
    // Fetch chat messages
    const fetchMessages = async () => {
      try {
        const response = await userInstance.get(`/message/${chat._id}`);
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);

  useEffect(() => {
    // Handle receiving new messages
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage, chat, messages]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const response = await userInstance.post('/addMessage/', message);
      setMessages([...messages, response.data]);
      setNewMessage('');

      // Send the message to the parent component (Chat)
      if (setSendMessage) {
        setSendMessage(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div className="online-dot">
                <img src="" alt="image" />
                <span>online</span>
                <span>{userData?.name}</span>
              </div>
            </div>
          </div>
          <div className="chat-body">
            {messages.map((message) => (
              <div
                key={message._id}
                className={message.senderId === currentUserId ? 'message own' : 'message'}
              >
                <span>{message.text}</span>
                <span>{message.createdAt}</span>
              </div>
            ))}
          </div>
          <div className="chat-sender">
            <div>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div className="send-button" onClick={handleSend}>
              Send
            </div>
          </div>
        </>
      ) : (
        <span>Select a chat to start a conversation</span>
      )}
    </div>
  );
};

export default ChatBox;
