// import React, { useEffect, useState } from "react";
// import LeftSidebar from '../../components/clients/LeftSidebar/LeftSidebar';
// import MiddleContent from '../../components/clients/MiddleContent/MiddleContent';
// import RightSidebar from '../../components/clients/RightSidebar/RightSidebar';
// import Navbar from '../../components/clients/navbar/Navbar';
// import { ClientLogout } from "../../Redux/ClientAuth";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import userAxios from "../../Axios/userAxios";
// import ChatMessages from "../../components/clients/chatMessage/ChatMessage";

// const ChatPage = () => {

//     const Type = 'users'
//     const [user, setUser] = useState(null);
  
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//    const token = useSelector((state)=>state.ClientAuth.Token)
  
     
//    const hadleLogout = () => {
//     dispatch(ClientLogout());
//     navigate('/login');
//   };
  
//     useEffect(() => {
//       if(token){
//        const fetchUserDetails = async () => {
//            try {
//              const response = await userAxios.get('/clientDetails', {
//                headers: { Authorization: `Bearer ${token}` },
//              });
//              const userDetail= response.data.user;
  
//              if(userDetail.isBanned){
//               hadleLogout()
//             }else{
//               setUser(userDetail);
  
//             }
//              } catch (error) {
//              console.log(error);
//            }
//          };
//          console.log('successful');
//          fetchUserDetails();
//            }else{
//          navigate('/login')
//       }
//        }, [token]);
     
//        console.log(user,'===============');
//   return (

//     <div>

//       <Navbar Type={Type} user={user}/>
//       <div className="container mx-auto mt-20">
      
//       <div className="px-36">
//       <ChatMessages />

//       </div>

        
//       </div>
//     </div>
//   )
// }

// export default ChatPage
