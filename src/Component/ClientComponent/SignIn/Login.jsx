import React, { useState } from "react";
import CreateUserInstance from "../../../Axios/UserAxios.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClientLogin, ClientId } from "../../../Redux/ClientAuth.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Google from "../Google/Google.jsx";
import { FaStar } from "react-icons/fa";
import Nav from "../NavBar/Nav.jsx";
import CreateProInstance from "../../../Axios/ProAxios.js";
import { ProId, proLogin } from "../../../Redux/proAuth.js";

const Login = () => {
  const backgroundImageUrl = "/images/model-house-project-blueprints.jpg"; // Path to your image
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType,setUserType]=useState('')
  const [show,setShow] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAxios = CreateUserInstance();
  const proAxios = CreateProInstance()

  const handleSubmit = async(e) => {
    console.log(userType,'pppppppppppppp',email,password);
    e.preventDefault();
    try {
      
    const isValidEmail = (email) => {
      // Basic email format validation using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if(userType === ''){
      return showErrorMessage('please select user type')
    }

    if (email.trim().length === 0) {
      return showErrorMessage("Please enter email");
    } else if (!isValidEmail(email)) {
      return showErrorMessage("Please enter a valid email");
    } else if (password.length === 0) {
      return showErrorMessage("Please enter password");
    } else if (password.length < 6) {
      return showErrorMessage("Password should be at least 6 characters");
    }


   if(userType==='users'){
   const  res=await userAxios.post("/login", { email, password })
   const result = res.data.userResponse;
   if (result.status === true) {
     const token = result.token;
     const id = result.id;
     dispatch(ClientLogin({ token: token }));
     dispatch(ClientId({ id: id }));
     navigate("/home");
   } else {
     showErrorMessage(result.message);
   }
   }else if(userType==='professional'){
    const res =await proAxios.post("/login", { email, password })
    const result = res.data.userSignUp;
    if (result.status === true) {
      const token = result.token;
      const id = result.id
      dispatch(proLogin({ token: token }));
      dispatch(ProId({ id: id }));
      navigate("/professional/home");
    }
  }
       
      
    } catch (error) {
      showErrorMessage("User not found");

    }

   
  };

  const showToastMessage = () => {
    toast.success("Success!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  return (
    <>
      {/* <Nav /> */}

      <div className="h-screen overflow-hidden">
      

<Nav setShow={setShow}/>

        <div
          className="bg-cover bg-center bg-fixed flex justify-evenly  h-full backdrop-blur-3xl bg-opacity-80 overflow-hidden"
          style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        >
          {show&&
          <div className="w-full flex  h-full flex-col justify-center gap-y-2 items-center">
            <div className="p-3 rounded-lg border justify-between bg-opacity-0 w-3/5 flex md:w-2/5 lg:w-[40%] bg-white">
            <div
  onClick={() => setUserType('users')} // When clicked, setUserType is called to set the user type to 'users'
  className={`"p-3 rounded-lg flex font-semibold cursor-pointer justify-center items-center shadow-lg backdrop-blur-2xl  w-3/5 md:w-2/5 lg:w-[48%]"${userType === 'professional' && 'bg-orange-500'}`}
>
                <a  >Home Owner</a>
              </div>
              <div onClick={()=>setUserType('professional')} className="p-3 rounded-lg flex justify-center cursor-pointer items-center font-semibold shadow-lg backdrop-blur-2xl bg-opacity-30 bg-white w-3/5 md:w-2/5 lg:w-[48%]">
                <a >Professional</a>
              </div>
            </div>

            <div className="p-8 rounded-lg shadow-lg backdrop-blur-2xl bg-opacity-30 bg-white w-3/5 md:w-2/5 lg:w-[40%]">
              <h1 className="text-3xl font-bold mb-8 text-center text-gray-800" >
                Login to GuildHub
              </h1>
              <form method="POST" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block font-semibold text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-semibold text-gray-700 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter your password"
                  />
                  <Link to="/forgetPass">
                    <div className="text-xs text-end">
                      <p className="text-red-700">forget password</p>
                    </div>
                  </Link>
                </div>

                <div>
                  <ToastContainer />{" "}
                </div>

                <div className="mb-6">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="flex justify-between">
               
                <Link to="/otpLogin">
                  <div className="text-xs ">
                    <p>sign in with phone</p>
                  </div>
                </Link>
              </div>
              <div className="flex justify-center mt-4">
                <Google />
              </div>
            </div>
          </div>}
          {/* <div className=" "> */}
         {!show&&
          <div className="flex flex-col items-center mb-64 mr-56 justify-center h-screen relative  ">
            <div
             className="py-20"
            >            </div>

              <h1  style={{ textShadow: "2px 2px black" }}
              className="text-center text-white  text-6xl font-semibold  mb-8 text">
                  India's Largest Home Community</h1>
            <div 
              //  style={{ textShadow: "2px 2px white" }}

            className=" text-3xl font-bold md:flex md:justify-center md:space-x-6  ">
              <div className="mb-2 md:mb-0">
                <div className="text-black flex items-center">
                  <FaStar className="mr-2 text-yellow-400" />
                  Find Design
                </div>
                <p className="text-black text-sm">Discover stunning designs</p>
              </div>
              <div className="mb-2 md:mb-0">
                <div className="text-black flex items-center">
                  <FaStar className="mr-2 text-yellow-400" />
                  Find Professionals
                </div>
                <p className="text-black text-sm">Connect with experts</p>
              </div>
              <div className="mb-2 md:mb-0">
                <div className="text-black flex items-center">
                  <FaStar className="mr-2 text-yellow-400" />
                  Ask Queries
                </div>
                <p className="text-black text-sm">
                  Get answers to your questions
                </p>
              </div>
            </div>
          </div>
       }

        </div>
      </div>
    </>
  );
};

export default Login;
