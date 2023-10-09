import React from 'react'
import {GoogleLogin, useGoogleLogin} from '@react-oauth/google'
import {decodeJwt} from 'jose'
import CreateUserInstance from '../../../Axios/userAxios'
import { useDispatch } from 'react-redux'
import { ClientLogin } from '../../../Redux/ClientAuth'
import { useNavigate } from 'react-router-dom'


const Google = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userAxios = CreateUserInstance()
  return (
    <div >
          <GoogleLogin
          
          
        onSuccess={(credentialResponse)=>{
            console.log(credentialResponse);
            const {credential} = credentialResponse
            const payload = credential ? decodeJwt(credential) : undefined
            if(payload){
                console.log(payload);
                userAxios.post('googleLogin',payload)
                .then((res)=>{
                    const result=res.data.userSignUp
                    const token = result.token
                    const status = result.status
                    if(status){
                        dispatch(ClientLogin({token:token}))
                        navigate('/')
                    }
                })

            }
        }} 
        onError={error=>console.log(error)}
        useOneTap
        />
      
    </div>
  )
}

export default Google
