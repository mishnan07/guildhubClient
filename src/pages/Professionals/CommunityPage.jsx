import React, { useEffect, useState } from "react";
import LeftSidebar from '../../components/clients/LeftSidebar/LeftSidebar';
import MiddleContent from '../../components/clients/MiddleContent/MiddleContent';
import RightSidebar from '../../components/clients/RightSidebar/RightSidebar';
import Navbar from '../../components/clients/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userAxios from "../../Axios/userAxios";
import Community from "../../components/clients/MiddleContent/Community";



const CommunityPage = () => {
  const Type = 'professional'
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state)=>state.proAuth.Token)


  useEffect(() => {
    if(token){
     const fetchUserDetails = async () => {
         try {
           const response = await userAxios.get('/userDetails', {
             headers: { Authorization: `Bearer ${token}` },
           });
           const userDetail= response.data.user;
           setUser(userDetail);
         } catch (error) {
           console.log(error);
         }
       };
       console.log('successful');
       fetchUserDetails();
         }else{
       navigate('/professional/login')
    }
     }, [token]);
   
     console.log(user,'===============');
 
  return (
    <>
      <Navbar Type={Type} user={user}/>
      <div className="container mx-auto mt-20">
        <div className="flex flex-col md:flex-row space-x-4">
        <div className="w-16"></div> {/* Add spacing */}
          <LeftSidebar Type={Type} user={user}/>
          <div className="w-2"></div> {/* Add spacing */}
          <Community  Type={Type} user={user}/>
          <div className="w-2"></div> {/* Add spacing */}
          <RightSidebar />
          <div className=""></div> {/* Add spacing */}
        </div>
      </div>
    </>
  );
};

export default CommunityPage;






