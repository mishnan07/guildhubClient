import React, { useEffect, useState } from "react";
import LeftSidebar from '../../components/clients/LeftSidebar/LeftSidebar';
import MiddleContent from '../../components/clients/MiddleContent/MiddleContent';
import RightSidebar from '../../components/clients/RightSidebar/RightSidebar';
import Navbar from '../../components/clients/navbar/Navbar';
import { ClientLogout } from "../../Redux/ClientAuth";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import userAxios from "../../Axios/userAxios";
import Notification from "../../components/clients/notification/Notification";
import HirePage from "../Professionals/HirePage";
import Community from "../../components/clients/MiddleContent/Community";

const MainPage = () => {
    
  
  const location = useLocation();
  const Type = location.pathname.includes('professional') ? 'professional' : 'users';

  let home = location.pathname.includes('home')?true:false
  let notification = location.pathname.includes('notification')?true:false
  let hire = location.pathname.includes('hire')?true:false
  let message = location.pathname.includes('message')?true:false
  let community = location.pathname.includes('community')?true:false


  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) =>
    Type === 'users' ? state.ClientAuth.Token : state.proAuth.Token
  );
  const id = useSelector((state) => (Type === 'users' ? state.ClientAuth.Id : state.proAuth.Id));
  console.log(token, 'lldddda', id);

     
 const hadleLogout = () => {
    Type === 'users'? dispatch(ClientLogout())  :  dispatch(proLogOut())
    Type === 'users'? navigate('/login'): navigate('/professional/login')
};
  
    useEffect(() => {
      if(token){
       const fetchUserDetails = async () => {
           try {
            let response
            if(Type === 'users'){
                response = await userAxios.get('/clientDetails', {
                    headers: { Authorization: `Bearer ${token}` },
                  });
            }else if(Type === 'professional'){
                response = await userAxios.get('/userDetails', {
                    headers: { Authorization: `Bearer ${token}` },
                });

            }
            
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
        Type === 'users'? navigate('/login'): navigate('/professional/login')
      }
       }, [token]);

  return (
    <>
    <Navbar Type={Type} user={user}/>

    <div className="container mt-20 ">

      <div className="flex flex-col md:flex-row justify-around px-6">
      <div></div> 
        <LeftSidebar Type={Type} user={user}/>
        <div className="md:w-1/3 overflow-scroll h-screen">
        
        {notification&&<Notification />}
        {home &&  <MiddleContent Type={Type} user={user} token={token}/>}
        {hire && <HirePage /> }
        {community && <Community  Type={Type} user={user}/>}
       

        </div>
        <RightSidebar />
        <div></div> 
       
      </div>
    </div>
  </>
  
  
  )
}

export default MainPage
