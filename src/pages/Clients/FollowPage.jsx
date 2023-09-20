import React, { useEffect, useState } from "react";
import LeftSidebar from '../../components/clients/LeftSidebar/LeftSidebar';
import MiddleContent from '../../components/clients/MiddleContent/MiddleContent';
import RightSidebar from '../../components/clients/RightSidebar/RightSidebar';
import Navbar from '../../components/clients/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClientLogout } from "../../Redux/ClientAuth";
import userAxios from "../../Axios/userAxios";
import Follow from "../../components/clients/Follow/Follow";
import RightSideBar from "../../components/professionals/rightSideBar/RightSideBar";



const FollowPage = () => {
  const Type = 'users'
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
 const token = useSelector((state)=>state.ClientAuth.Token)

   
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
    <Navbar Type={Type} user={user} />
    <div className="flex flex-col md:flex-row mt-20">
    <div className="w-10"></div> {/* Add spacing */}

      <LeftSidebar />
      <div className="w-10"></div> {/* Add spacing */}

      <div className=" w-full md:w-1/2 flex flex-col items-center justify-center">

        <div className="w-full ">
          <Follow Type={Type} user={user} />
        </div>

      </div>
      <div className="w-10"></div> {/* Add spacing */}
 
      <RightSidebar />
      <div className="w-10"></div> {/* Add spacing */}

    </div>
  </>
  );
};

export default FollowPage;
