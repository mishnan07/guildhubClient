import React, { useEffect, useState } from 'react'
import Otp from '../Otps/Otp'
// import userAxios from '../../../Axios/userAxios'
import CreateUserInstance from '../../../Axios/userAxios.js';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClientLogin, ClientId } from "../../../Redux/ClientAuth.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const OtpLogin = () => {
    const [success,setSuccess] = useState(false)
    const [phone,setPhone] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInstance = CreateUserInstance()

    useEffect(()=>{
        if(success){
            userInstance
            .post("/login", { phone,success })
            .then((res) => {
              const result = res.data.userResponse;
              console.log(result.token);
              if (result.status === true) {
                const token = result.token;
                const id = result.id
                dispatch(ClientLogin({ token: token }));
                dispatch(ClientId({ id: id }));
                navigate("/home");
              } else {
                toast.error(result.message);
              }
            })
            .catch((res) => {
                toast.error("User not found");
            });
        }
    },[success])

   
  return (
    <div>
        <Otp setSuccess={setSuccess} setPhone={setPhone} value='OTP Login'/>
        <ToastContainer />
    </div>
  )
}

export default OtpLogin
