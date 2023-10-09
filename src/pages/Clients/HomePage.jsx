import React, { useEffect, useState } from "react";
import LeftSidebar from '../../components/clients/LeftSidebar/LeftSidebar';
import MiddleContent from '../../components/clients/MiddleContent/MiddleContent';
import RightSidebar from '../../components/clients/RightSidebar/RightSidebar';
import Navbar from '../../components/clients/navbar/Navbar';
import { ClientLogout } from "../../Redux/ClientAuth";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateUserInstance from "../../Axios/userAxios";


const HomePage = () => {
  const Type = 'users'
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
 const token = useSelector((state)=>state.ClientAuth.Token)
 const userAxios = CreateUserInstance()
   
 const hadleLogout = () => {
  dispatch(ClientLogout());
  navigate('/login');
};

  useEffect(() => {
    if(token){
     const fetchUserDetails = async () => {
         try {
           const response = await userAxios.get('/clientDetails', {
             headers: { Authorization: `Bearer ${token}` },
           });
           const userDetail= response.data.user;

           if(userDetail.isBanned){
            hadleLogout()
          }else{
            setUser(userDetail);

          }
           } catch (error) {
           console.log(error);
         }
       };
       console.log('successful');
       fetchUserDetails();
         }else{
       navigate('/login')
    }
     }, [token]);
   
     console.log(user,'===============');
 
  return (
    <>
      <Navbar Type={Type} user={user}/>
      <div className="container mx-auto mt-20 ">
        <div className="flex flex-col md:flex-row space-x-4">
        <div className="w-10"></div> {/* Add spacing */}
          <LeftSidebar Type={Type} user={user}/>
          <div className="w-2 "></div> {/* Add spacing */}
          <MiddleContent Type={Type} user={user} token={token}/>
          <div className="w-2"></div> {/* Add spacing */}
          <RightSidebar />
          <div className="w-10"></div> {/* Add spacing */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
