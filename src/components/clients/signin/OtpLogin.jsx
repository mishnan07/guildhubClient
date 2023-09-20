import React, { useEffect, useState } from 'react'
import Otp from '../otp/Otp'
import userAxios from '../../../Axios/userAxios'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClientLogin, ClientEmail } from "../../../Redux/ClientAuth.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OtpLogin = () => {
    const [success,setSuccess] = useState(false)
    const [phone,setPhone] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(success){
            userAxios
            .post("/login", { phone,success })
            .then((res) => {
              const result = res.data.userResponse;
              console.log(result.token);
              if (result.status === true) {
                const token = result.token;
                dispatch(ClientLogin({ token: token }));
                dispatch(ClientEmail({ email: email }));
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
