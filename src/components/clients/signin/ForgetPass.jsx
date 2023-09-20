import React, { useEffect, useState } from 'react'
import Otp from '../otp/Otp'
import userAxios from '../../../Axios/userAxios'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClientLogin, ClientEmail } from "../../../Redux/ClientAuth.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPass from './ResetPass';

const ForgetPass = () => {

    const [success,setSuccess] = useState(false)
    const [phone,setPhone] = useState('')
    const [change,setChange] = useState(false)

  

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
      if(success){
        setChange(true)
      }
    },[success])

  return (
    <div>
    {!change ? (
      <>
        <Otp  setSuccess={setSuccess} setPhone={setPhone}  value='Forget Password'/>
        <ToastContainer />
      </>
    ) : (
      <ResetPass phone={phone} value='Change Password'/>
    )}
  </div>
  )
}

export default ForgetPass
