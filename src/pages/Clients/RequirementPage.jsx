import React, { useEffect, useState } from "react";
import Hire from '../../components/clients/hire/Hire'
import Navbar from '../../components/clients/navbar/Navbar';
import userAxios from "../../Axios/userAxios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HireOptions from "../../components/clients/hire/HireOptions";
import RequirementShow from "../../components/clients/requirement/RequirementShow";
import ProCards from "../../components/professionals/proCards/ProCards";



const RequirementPage = () => {

    const Type = 'users'
    const [user, setUser] = useState(null);
    const [show,setShow] = useState(false)
    const [interstPro,setInterstedPro] = useState([])
    const [requirementId,setRequirementId] = useState('')
    const [hiredPros,setHiredPros] = useState([])
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const token = useSelector((state)=>state.ClientAuth.Token)
  
  
    useEffect(() => {
      if(token){
       const fetchUserDetails = async () => {
           try {
             const response = await userAxios.get('/clientDetails', {
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
         navigate('/login')
      }
       }, [token]);
     
       console.log(user,'===============');
   
  return (
    <>
    <Navbar Type={Type} user={user} />
    
    <div className="container mx-auto mt-16 flex flex-col md:flex-col items-center justify-center ">
      
      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        {!show?
        <RequirementShow  Type={Type} user={user} show={setShow} setInterstedPro={setInterstedPro} setRequirementId={setRequirementId} setHiredPros={setHiredPros}/>
        :
        <>
        <div>
       
        </div>
        <ProCards interstPro={interstPro} setShow={setShow} requirementId={requirementId} hiredPros={hiredPros}/>
        </>
       }
      </div>
    </div>
  </>
  
   
  )
}

export default RequirementPage
