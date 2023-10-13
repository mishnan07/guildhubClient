import React, { useEffect, useState } from "react";
import Navbar from '../../Component/ClientComponent/NavBar/Navbar';
import CreateProInstance from "../../Axios/proAxios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RequirementShow from "../../Component/ClientComponent/Requirement/RequirementShow";


const RequirementPage = () => {

    const token = useSelector((state)=>state.proAuth.Token)

    const [user, setUser] = useState(null);
    const Type = 'professional'
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const proAxios = CreateProInstance()

  
  
    useEffect(() => {
      if(token){
       const fetchUserDetails = async () => {
           try {
             const response = await proAxios.get('/userDetails');
             const userDetail= response.data.user;
             setUser(userDetail);
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
     
   
  return (
    <>
    <Navbar Type={Type} user={user} />

    <div className="container mx-auto mt-16 flex flex-col md:flex-col items-center justify-center ">
      
      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <RequirementShow  Type={Type} user={user}/>
      </div>
    </div>

  </>
  
   
  )
}

export default RequirementPage
