import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {io} from 'socket.io-client'
import CreateUserInstance from '../../../Axios/UserAxios';
import CreateProInstance from '../../../Axios/ProAxios';
import ProfilePic from '../ProfilePic/ProfilePic';
import NoDataFound from '../../NoDataFound/NoDataFound';
import Modal from '../Modal/Modal';
import { FaTimes } from 'react-icons/fa';
import ProCards from '../ProList/ProCards';


const Notification = () => {


 
  const [notification,setNotification] = useState([]) 
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2,setIsOpen2] = useState(false)
  const userInstance = CreateUserInstance()
  const proInstance = CreateProInstance()
  
  const location = useLocation();
  const senderType = location.pathname.includes('professional') ? 'professional' : 'users';

  const token = useSelector((state) =>
    senderType === 'users' ? state.ClientAuth.Token : state.proAuth.Token
  );
  const id = useSelector((state) => (senderType === 'users' ? state.ClientAuth.Id : state.proAuth.Id));

  const Axios = senderType === 'users'?userInstance:proInstance   
 


  useEffect(()=>{
    const FetchNotifications = async()=>{
        try {
            const response = await Axios.get(`/FetchNotification/${id}`,)
            const match = response.data.match
            const newNotifications = [].concat(...match.map((conversation) => conversation.notifications));


setNotification(newNotifications)

        } catch (error) {
            
        }
    }
    FetchNotifications()
  },[])
  const socket = io.connect('http://localhost:3000');

  socket.on(id,(itemId,senderId,senderType,text)=>{
       const newNotifications = {
            text:text,
            itemId:itemId,
            senderType:senderType,
            senderId:senderId,
            timestamp:Date.now()
       }
       setNotification([...notification,newNotifications])
       console.log(newNotifications,'ppppppppppp00===');

  })
console.log(notification,'=============////');
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
 
const react =(text)=>{
    if(text === 'PostLike'){
        return 'post'
    }else if (text === 'RequirementIntersted'){
        return 'requirement'
    }else if (text === 'Hiring'){
        return 'interest'
    }
    return ''
} 

console.log(notification,'notiiiiiiiiii');


  return (
    <div>
{notification.length === 0 && <NoDataFound />
||notification.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((item, index) => (
  <div className="w-full h-auto relative py-2 z-0" key={index}>
    <div className="bg-white px-5 py-3.5 rounded-lg shadow hover:shadow-xl max-w-sm mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
      <div className="w-full flex items-center justify-between">
        <span className="font-medium text-sm text-slate-400">New Notification</span>
        <button className="-mr-1 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 h-5 w-5 rounded-full flex justify-center items-center">
          <svg className="h-2 w-2 fill-current items-center" viewBox="0 0 20 20">
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center mt-2 rounded-lg px-1 py-1 cursor-pointer">
        <div className="relative flex flex-shrink-0 items-end">
          {/* <img className="h-16 w-16 rounded-full" src="https://i.pravatar.cc/300" /> */}
          <ProfilePic UserId={item.senderId} value='pic'/>
          <span className="absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white"></span>
        </div>
        <div className="ml-3">
          <span className="font-semibold tracking-tight text-xs"><ProfilePic UserId={item.senderId} value='name'/></span>
          <span className="text-xs leading-none opacity-50 px-2">reacted to your {react(item.text)}</span>
          
          {item.text==='RequirementIntersted'&& 
        
            <p 
            onClick={()=> setIsOpen1(true) }
            className="text-xs leading-4 pt-2 italic opacity-70">
                Interested to your requirement Click to hire
            </p>
             }

         {item.text==='Hiring'&& 
         <>
            <p 
            onClick={()=> setIsOpen2(true) }
            className="text-xs leading-4 pt-2 italic opacity-70 ">
                you are hired for requirement
            </p>
            
             </>
             }


          <p className="text-xs leading-4 pt-2 italic opacity-70">
            {item.text==='PostLike'&&'❤ liked your post'}
            </p>
           
          <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">
          {formatTimestamp(item.timestamp)}
        </span>
        </div>
      </div>
    </div>
    <Modal isOpen={isOpen1} onClose={()=>setIsOpen1(false)}>
  <button className="p-2" onClick={() => setIsOpen1(false)}>
          <FaTimes /> 
  </button>
  <div className='px-10 ml-5'>
  <ProCards interstPro={item.senderId}  requirementId={item.itemId}  no='no'/>

  </div>
    </Modal>

   
  </div>


))}

       
    </div>
  );
};

export default Notification;
