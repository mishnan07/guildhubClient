import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateUserInstance from '../../../Axios/userAxios';
import CreateProInstance from '../../../Axios/proAxios';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Navbar from '../NavBar/Navbar';
import ProfilePic from '../ProfilePic/ProfilePic';
import { userAPI } from '../../../Constants/Api';
import EmojiInput from '../InputEmoji/EmojiInput';
import SearchBar from '../MiddleContent/SearchBar';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const ContactList = ({ setReceiver, users, pros, seReciverId, userId, FetchChats,isLoading }) => {
  const [all, setAll] = useState([]);
  const profile = "/images/user_149071.png";
  const [searchInput, SetSearchInput] = useState("");
  const location = useLocation();


  useEffect(() => { 
    const combinedArray = [...pros, ...users];
    setAll(combinedArray);
  }, [users, pros, userId]);

  const details = (specificId, value) => {
    let idExists = pros.find((pro) => pro._id === specificId);

    if (!idExists) {
      idExists = users.find((user) => user._id === specificId);
    }

    if (idExists) {
        return idExists.name;
      
     
    }
    return "";
  };

  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    const receiverId = queryParams.get("id");
    if(receiverId){
    
      const name = queryParams.get("name");
       setReceiver(name);
       seReciverId(receiverId);
       FetchChats(receiverId);
    }
  },[])


  const handleUserClick = async (contact) => {
    try {
      await setReceiver(contact.name);
      await seReciverId(contact._id);
      await FetchChats(contact._id);
    } catch (error) {
      console.error('Error handling user click:', error);
    }
  };

  const datas = all.filter((item) => {
    const name = item.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return item._id !== userId && name;
  });
  

  return (
    <div className="w-1/4 p-4 bg-gradient-to-r from-purple-500 to-blue-400 rounded-l-lg overflow-y-auto">
      <h2 className="text-xl font-semibold p-3">Contacts</h2>
      <div className=''>
      <SearchBar SetSearchInput={SetSearchInput} searchInput={searchInput} />
      </div>

      {isLoading && isLoading? (
        <LoadingSpinner />
      ) : (
      <ul>
        {datas.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-purple-500 p-2 rounded-lg h-20"
            onClick={() => handleUserClick(item)}
          >
            <div  className='flex items-center '>
              {item?.profilePic ? (
                <img
                  src={`${userAPI}/images/` + item?.profilePic}
                  alt="user"
                  className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600 p-0.5"
                />
              ) : (
                <img
                  src={profile}
                  alt="user"
                  className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600 p-0.5"
                />
              )}
              <p className='p-2 '>{item.name}</p>
              
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};



const ChatMessages = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [receverId, setReceiverId] = useState('');
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  // const [socket, setSocket] = useState(null);
  const [state, setState] = useState(false);
  const userAxios = CreateUserInstance()
  const proAxios = CreateProInstance()
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);



  const location = useLocation();
  const senderType = location.pathname.includes('professional') ? 'professional' : 'users';

  const token = useSelector((state) => (senderType === 'users' ? state.ClientAuth.Token : state.proAuth.Token));
  const id = useSelector((state) => (senderType === 'users' ? state.ClientAuth.Id : state.proAuth.Id));
   
  const Axios = senderType === 'users' ? userAxios:proAxios

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const response = await Axios.get('/usersAndpros');
      setPros(response.data.pros);
      setUsers(response.data.users);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token, id,]);

  useEffect(() => {
    if (id) {
      const arr = senderType === 'professional' ? pros : users;
      const userDetail = arr.find((item) => item._id === id);
      setUser(userDetail || null);
    }
  }, [id, pros, users]);

  


    
const socket = io.connect('http://localhost:3000');
// socket.emit('connected',"connectedsss")



socket.on(id,(msg)=> {
  console.log('message recievd succussfully',msg)
  receiveMessage(msg)
})


  const FetchChats = async (receverId) => {
    try {
      setIsLoading1(true)
      const response = await Axios.get(`/FetchChats/${id}/${receverId}`);
      const match = response.data.match;
      const newMessage = [].concat(...match.map((conversation) => conversation.messages));
      setChatMessages(newMessage);
      setIsLoading1(false)
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  // useEffect(()=>{
  //   FetchChats(receverId)
  // },[receverId])

 

  const receiveMessage = (msg) => {
    const newMessage = {
      senderId: msg.senderId,
      senderType: msg.senderType,
      text: msg.text,
      timestamp:   new Date(),
      receiverId: msg.receiverId,
      receiverType: msg.receiverType,
    };
  
    setChatMessages([...chatMessages,newMessage]);
  };

  const handleSendMessage = (id,messageText) => {
    if (messageText.trim() !== '') {
      let receiverType = '';
      const idExistsUser = users.some((item) => item._id === receverId);
      const idExistsPro = pros.some((item) => item._id === receverId);

      if (idExistsUser) {
        receiverType = 'users';
      } else if (idExistsPro) {
        receiverType = 'professional';
      }

      const newMessage = {
        senderId: id,
        senderType: senderType,
        text: messageText,
        receiverId: receverId,
        receiverType: receiverType,
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit('chatRoom', newMessage);
      setChatMessages([...chatMessages, newMessage]);
      socket.emit('mesage', messageText);
    }
  };



  const formatTimestamp = (timestamp) => {
    const currentTime = new Date();
    const itemTime = new Date(timestamp);
    const timeDifference = Math.floor((currentTime - itemTime) / 1000); // Time difference in seconds

    if (timeDifference < 60) {
      return "a few seconds ago";
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(timeDifference / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };
 

  return (
    <>
      <Navbar Type={senderType} user={user} />
      <div className='w-full h-20'></div>

      <div className='flex h-[800px] sm-h-[600px] md:h-[650px] md:px-36 '>
        <ContactList setReceiver={setReceiver} users={users} pros={pros} seReciverId={setReceiverId} userId={id} FetchChats={FetchChats}  isLoading={isLoading} />
        <div className="w-3/4 p-4 bg-white rounded-r-lg ">
          <div className="border rounded-lg p-4 h-full">
            <div className="flex items-center  mb-4">
            <ProfilePic UserId={receverId } value='pic'/>

              <h2 className="text-xl ml-2 font-semibold">{` ${receiver}`}</h2>

            </div>
            <div className="border-t border-gray-300 h-3/4 overflow-y-auto">
            {isLoading1 ? (
        <LoadingSpinner />
      ) : (
     <>
              {chatMessages.map((message, index) => (
                <div key={index} className="mb-2">
                  <div className={`text-${message.senderId === id ? 'right' : 'left'}`}>
                    <div className='flex-col text-blue-600'>
                    
                      <div className={`flex  justify-${message.senderId === id ? 'end' : 'start'}`}>
                      <div className={`text-lg bg-${message.senderId === id ? 'green-300 text-green-800' : 'gray-200 text-gray-700'} rounded-lg p-2 inline-block`}>
                    <div className='text-sm'>
                      <ProfilePic UserId={message.senderId} value='name'/>

                      <span className="text-sm text-gray-400">
                        {formatTimestamp(message.timestamp) ==='NaN days ago' ?'now' :formatTimestamp(message.timestamp)}
                      </span>
                      </div>
                      {message.text}
                    </div>

                      </div>
                     
                    </div>
                    {}
                  
                  </div>
                </div>
              ))}
     </> )}
            </div>
            <div className="mt-4">
              <div className="w-full p-2 rounded-lg bg-gray-200 focus:outline-none">
                <EmojiInput send={handleSendMessage} id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessages;