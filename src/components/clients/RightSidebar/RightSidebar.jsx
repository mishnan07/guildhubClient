import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {io} from 'socket.io-client'



const RightSidebar = () => {

  const [likedUsers,setLikedUsers] = useState([])
  const [msg,setMsg] = useState('')

  const [notification,setNotification] = useState([])

  const profile = "/images/user_149071.png";

  const location = useLocation()
  const senderType = location.pathname.includes('professional') ? 'professional' : 'users'
  const id = useSelector((state)=> senderType=== 'users' ? state.ClientAuth.Id: state.proAuth.Id)


  const socket = io.connect('http://localhost:3000');

  socket.on(id,(LikesUser,senderId,senderType,text)=>{
       setLikedUsers([...likedUsers,LikesUser])
       console.log('recived msg user like============',LikesUser.name);
       const newNotifications = {
            text:text,
            senderType:senderType,
            senderId:senderId,
            timestamp:Date.now()
       }
       setMsg(`${LikesUser.name} liked your post`)
       setNotification([...notification,newNotifications])
  })

console.log(likedUsers,'ppppppppppp00');

  return (
    <div className="md:w-1/5">
      <div className="suggestions bg-white p-4 rounded-lg shadow-lg" id="sticky-sidebar">
      <h4 className="grey text-gray-700">notification</h4>
        <div className="follow-user flex items-center space-x-4">
          <img src={profile} alt="" className="profile-photo-sm w-12 h-12 rounded-full" />
          <div>
            <h5><a href="timeline.html" className="text-blue-500">Diana Amber</a></h5>
            <a href="#" className="text-green-500">{msg?msg:''}</a>
          </div>
          {/* {likedUsers.map((item)=>{
            <p>{`${item.name} liked your post`}</p>
          })} */}
        </div>
        
      </div>
    </div>
  );
};

export default RightSidebar;
