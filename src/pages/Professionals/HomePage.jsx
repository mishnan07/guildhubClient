import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClientLogout } from "../../Redux/ClientAuth";
import { proLogOut } from "../../Redux/proAuth";
import userAxios from "../../Axios/userAxios";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from '../../components/clients/navbar/Navbar';
import LeftSidebar from '../../components/clients/LeftSidebar/LeftSidebar'
import MiddleContent from '../../components/clients/MiddleContent/MiddleContent'
import RightSidebar from '../../components/clients/RightSidebar/RightSidebar'

const HomePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
   const token = useSelector((state)=>state.proAuth.Token)

   const location = useLocation()
   const senderType = location.pathname.includes('professional') ? 'professional' : 'users'
 console.log(location,senderType);

   const [user, setUser] = useState(null);
   const Type = 'professional'

     
  const hadleLogout = () => {
    dispatch(proLogOut());
    navigate('/professional/login');
  };
   
    useEffect(() => {
   if(token){
    const fetchUserDetails = async () => {
        try {
          const response = await userAxios.get('/userDetails', {Type,
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
      fetchUserDetails();   }else{
      navigate('/professional/login')
   }
    }, [token]);
  
    console.log(user,'===============');

  return (
    <div>
        <>
      <Navbar Type={Type} user={user}/>
      <div className="container mx-auto mt-20">
        <div className="flex flex-col md:flex-row space-x-4">
        <div className="w-10"></div> {/* Add spacing */}
          <LeftSidebar Type={Type}  user={user} />
          <div className="w-2" ></div> {/* Add spacing */}
          <MiddleContent Type={Type} user={user} token={token}/>
          <div className="w-2"></div> {/* Add spacing */}
          <RightSidebar />
          <div className="w-10"></div> {/* Add spacing */}
        </div>
      </div>
    </>
    </div>
  )
}

export default HomePage
