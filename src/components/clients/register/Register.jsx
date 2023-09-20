import React, { useState } from 'react'
import userAxios from "../../../Axios/userAxios.js";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [location,setLocation] = useState('')

    const [errMsg,setErrMsg] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
console.log(phone);

      
const isValidEmail= (email)=> {
  // Basic email format validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
        if (name.trim().length === 0) {
          return showErrorMessage('Please enter your name');
        } else if (email.trim().length === 0) {
          return showErrorMessage('Please enter email');
        } else if (!isValidEmail(email)) {
          return showErrorMessage('Please enter a valid email');
        } else if (phone.trim().length === 0) {
          return showErrorMessage('Please enter phone number');
        } else if (!/^\d{10}$/.test(phone)) {
          return showErrorMessage('Please enter a valid 10-digit phone number');
        } 
         else  if (!/^[0-9]+$/.test(phone)) {
          return showErrorMessage('Please enter a valid phone number (numbers only)');
        }
        else if (password.length === 0) {
          return showErrorMessage('Please enter password');
        } else if (password.length < 6) {
          return showErrorMessage('Password should be at least 6 characters');
        } else if (location.trim().length === 0) {
          return showErrorMessage('Please enter location');
        }   
        
        userAxios.post('/register',{name,email,phone,password,location}).then((res)=>{
            if(res.data.status){
                console.log('registered sucesssssss');
                navigate('/login')
            }else{
              setErrMsg('user already exist')

                console.log('errrrrrrrrrrrrrrrppp');
               
            }
        }).catch((err)=>{
          setErrMsg('user already exist')
       
          console.log(err.message);
        })
    }

    const showErrorMessage = (message) => {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000
      });
    };

    const backgroundImageUrl = "/images/model-house-project-blueprints.jpg"; // Path to your image


  return (
       <>
      


       <div class="h-screen md:flex">
       <div  style={{ backgroundImage: `url('${backgroundImageUrl}')` }}>
      </div>

	<div class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden"  >
    <div>
    </div>


    <div className="flex flex-col md:flex-row justify-between items-center py-8 px-16 bg-gradient-to-r from-blue-800 to-purple-700">
  <div className="md:w-1/2 mb-8 md:mb-0">
    <h1 className="text-white font-bold text-4xl font-sans mb-4">India's Largest Home Community</h1>
    <div className="flex flex-row items-center">
      <div className="mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l1.596 5.178H19.3l-4.297 3.316 1.596 5.177L12 13.156l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2zm0 18l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2l1.596 5.178h5.704l-4.297 3.316 1.596 5.177L12 13.156z" />
        </svg>
      </div>
      <p className="text-white">Find Design</p>
    </div>
    <div className="flex flex-row items-center mt-2">
      <div className="mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l1.596 5.178H19.3l-4.297 3.316 1.596 5.177L12 13.156l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2zm0 18l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2l1.596 5.178h5.704l-4.297 3.316 1.596 5.177L12 13.156z" />
        </svg>
      </div>
      <p className="text-white">Find Professionals</p>
    </div>
    <div className="flex flex-row items-center mt-2">
      <div className="mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l1.596 5.178H19.3l-4.297 3.316 1.596 5.177L12 13.156l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2zm0 18l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2l1.596 5.178h5.704l-4.297 3.316 1.596 5.177L12 13.156z" />
        </svg>
      </div>
      <p className="text-white">Ask Queries</p>
    </div>
  </div>
  <div className="md:w-1/2">
    
  </div>
</div>



		<div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
	</div>

	<div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
		<form   onSubmit={handleSubmit} method='POST' class="bg-white">
			<h1 class="text-gray-800 font-bold text-2xl mb-1">Home Owner Register</h1>
			<p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
			<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clip-rule="evenodd" />
				</svg>

				<input class="pl-2 outline-none border-none"  type="text" id='name' name='name' onChange={(e)=>{setName(e.target.value)}} value={name}  placeholder="Full name" />
      </div>
				<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
						</svg>
					<input class="pl-2 outline-none border-none" type="email" id='email' name='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="Email" />
      </div>
					<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2zm4 0v16"/>
            </svg>

						<input class="pl-2 outline-none border-none"type="text" id='phone' name='phone' onChange={(e)=>{setPhone(e.target.value)}} value={phone} placeholder="Phone" />
      </div>
						<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a8 8 0 00-8 8v8a2 2 0 002 2h12a2 2 0 002-2v-8a8 8 0 00-8-8zm0 4a2 2 0 100 4 2 2 0 000-4z"/>
              </svg>

							<input class="pl-2 outline-none border-none" type="password" id='password' name='password' onChange={(e)=>{setPassword(e.target.value)}} value={password}  placeholder="Password" />
      </div>
      <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-10 8-14a8 8 0 10-16 0c0 4 8 14 8 14z"/>
    <circle cx="12" cy="10" r="3"/>
      </svg>

							<input class="pl-2 outline-none border-none" type="text" id='location' name='location' onChange={(e)=>{setLocation(e.target.value)}} value={location}  placeholder="Location" />
      </div>
							<button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Sigin Up</button>
							<span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">already sign up ?</span>

              <div>
          <ToastContainer /> {/* ToastContainer for showing success message */}
          </div>
		</form>
	</div>
</div>
       </>
    )
}

export default Register