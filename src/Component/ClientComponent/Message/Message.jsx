import React, { useEffect, useRef, useState } from 'react'
import InpuChat from './Input'
import io from "socket.io-client"
import { getUserMessage } from '../../service/UserApi'


const Message = ({selected,user}) => {

  const [message, setmessage] = useState([])
  const [socket, setSocket] = useState(null);
  const messageHolder = useRef(null);

// socket config
  useEffect(() => {
    const newSocket =io.connect("http://localhost:3000/")
    setSocket(newSocket);
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [selected]);

// add user

  useEffect(() => {
   if(socket){
    const id= selected._id
    socket.emit("add-user",id)
   }
  console.log(socket)
   if (socket) {
        socket.on("msg-recieve", (data) => {
      if(data){
        console.log(data,"dataaaa")
       
          if(data.id===selected._id){
            setmessage((prev)=>[...prev,data])
          }
          
       
       
      }
       
        });

  }  
  }, [socket])
 
  useEffect(() => {
    messageHookup()
  }, [selected])
  
  const messageHookup=()=>{
    try {
      getUserMessage(selected._id).then((res)=>{
        if(res.status===200){
          const ress= res.data?.result
          // console.log("type of",typeof(res.data.result?.messages))
          // console.log(res.data.result?.messages)
          setmessage(res.data?.result?.messages)
        }

      }).catch((err)=>{
        console.log(err,"hookup user err")
      })
    } catch (error) {
      console.log(error,"hookup err")
    }
  }

// sent message
const handleSentMsg= async(msg)=>{
  // console.log(msg);
  if(user==="user"){
    await socket.emit("send-message", {
      id:selected?._id,
      to:selected?.venue._id,
      from:selected?.user,
      senderType:"user",
      text:msg,
      timestamp:Date.now()
    });
   

  }else if(user==="venue"){
  await socket.emit("send-message", {
      id:selected?._id,
      to:selected?.user._id,
      from:selected?.venue, 
      senderType:"venue",
      text: msg,
      timestamp:Date.now()
    });
   
  }

}
function formatTimeDifference(timestamp) {
  // Convert the timestamp string to a Date object
  const timestampDate = new Date(timestamp);

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDiffInMilliseconds = currentDate - timestampDate;

  // Calculate the time difference in seconds
  const timeDiffInSeconds = Math.floor(timeDiffInMilliseconds / 1000);

  // Define time intervals
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Format the time difference
  if (timeDiffInSeconds < 1) {
    return "Just now";
  } else if (timeDiffInSeconds < minute) {
    return timeDiffInSeconds + " seconds ago";
  } else if (timeDiffInSeconds < hour) {
    const minutes = Math.floor(timeDiffInSeconds / minute);
    return minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
  } else if (timeDiffInSeconds < day) {
    const hours = Math.floor(timeDiffInSeconds / hour);
    return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
  } else if (timeDiffInSeconds < day * 2) {
    return "Yesterday";
  } else {
    // Customize this part for longer intervals as needed
    const days = Math.floor(timeDiffInSeconds / day);
    return days + " day" + (days > 1 ? "s" : "") + " ago";
  }
}

useEffect(() => {
  if (messageHolder.current)
    messageHolder.current.scrollTop = messageHolder.current.scrollHeight;
}, [message]);


  return (

<div className='bg-red-300 w-full'>
  {selected === '' ? (
    <div className='bg-white text-center h-screen'>No messages</div>
  ) : (
    <div>
      <div className='p-2 flex items-center bg-slate-400 border-rose-200'>
        <div className='avatar online'>
          <div className='w-8 rounded-full'>
            <img src={user === 'user' ? selected?.venue?.image[0] : selected?.user?.image} alt='avatar' />
          </div>
        </div>
        <div className='mx-5'>{user === 'user' ? selected?.venue?.name : selected?.user?.name}</div>
      </div>
      <div ref={messageHolder} className='bg-green-200 flex flex-col h-[83vh] overflow-x-auto'>
        {message?.map((item, index) => (
          <div key={index} className={`chat ${user === 'user' ? (item.senderType === 'user' ? 'chat-end' : 'chat-start') : (item.senderType === 'venue' ? 'chat-end' : 'chat-start')}`}>
            <div className='chat-header'>
              <time className='text-xs opacity-50'>{formatTimeDifference(item.timestamp)}</time>
            </div>
            <div className='chat-bubble'>{item.text}</div>
          </div>
        ))}
      </div>
      <InpuChat handle={handleSentMsg} />
    </div>
  )}
</div>

  )
}

export default Message