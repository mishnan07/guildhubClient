import React, { useEffect, useState } from 'react'
import Profile from '../../components/professionals/Profile.jsx/Profile'
import Navbar from '../../components/clients/navbar/Navbar';
import userAxios from "../../Axios/userAxios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Follow from '../../components/clients/Follow/Follow';
const ProfilePages = () => {

    
    const dispatch = useDispatch();
    const navigate = useNavigate();useNavigate
   const token = useSelector((state)=>state.proAuth.Token)

   const [user, setUser] = useState(null);
   const Type = 'professional'

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
       fetchUserDetails();   }else{
       navigate('/professional/login')
    }
     }, [token]);
   

  return (
    <div>
        <Navbar Type={Type} user={user}/>
        <div className='h-12'></div>
      <Profile Type={Type}  Uuser={user} token={token}/>

    </div>
  )
}

export default ProfilePages
