import React, { useState } from "react";
import CreateUserInstance from "../../../Axios/userAxios.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClientLogin, ClientId } from "../../../Redux/ClientAuth.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Google from "../Google/Google.jsx";
import { FaPaintBrush, FaQuestion, FaStar, FaUsers } from "react-icons/fa";
import Nav from "../NavBar/Nav.jsx";
import CreateProInstance from "../../../Axios/proAxios.js";
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
    console.log('usrrrrrrrrrr');
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
    }else{
      showErrorMessage(result.message);

    }
  }
       
      
    } catch (error) {
      showErrorMessage("User not found");

    }

   
  };
  const gradientTextStyles = {
    backgroundImage: "linear-gradient(45deg, #ffff, #ffff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
    textShadow: "2px 2px black", // Adding text shadow
    letterSpacing: "2px", // Adjusting letter spacing
    fontStyle: "italic", // Adding italic style
    fontSize: "100px", // Changing font size
    fontFamily: "Arial, sans-serif", // Specifying font family
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
          className="bg-cover bg-center bg-fixed flex justify-evenly bg-[url('/images/plans-house.jpg')] bg-opacity-10  h-full overflow-hidden"
          // style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        >
          {show&&
          <div className="flex flex-col h-screen w-full items-center justify-center bg-cover bg-no-repeat" >
          <ToastContainer />{" "}
          <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-2 mb-2 shadow-lg backdrop-blur-md max-sm:px-8 space-x-3 text-white">
            
          <input onClick={() => setUserType('users')} type="radio" id="radio1" name="radioGroup" value="option1"/>
          <label for="radio1">Home Owner</label>
          
          <input onClick={() => setUserType('professional')} type="radio" id="radio2" name="radioGroup" value="option2"/>
          <label for="radio2">Professional</label>
          
          
          
          
            
            </div>
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
              <div className="text-white">
                <div className="mb-8 flex flex-col items-center">
          
                  <h1 className="mb-2 text-2xl">GuildHub</h1>
                  <span className="text-gray-300">Enter Login Details</span>
                </div>
                <form method="POST" onSubmit={handleSubmit}>
                  <div className="mb-4 text-lg">
                    <input  type="text"
                              id="email"
                              name="email"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }} className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" placeholder="id@email.com" />
                  </div>
          
                  <div className="mb-4 text-lg">
                    <input    type="password"
                              id="password"
                              name="password"
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }} className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" placeholder="*********" />
                  </div>
          
                         
                  
                  <div className="mt-8 flex justify-center text-lg text-black">
                    <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
                   
          
                  </div>
                  <div className="rounded-3xl border-none px-6 py-2 text-center text-inherit outline-none ">
                  <Google />
          
                  </div>
                  <div className="flex justify-evenly">
                          <Link to="/forgetPass">
                              <div className="text-xs text-end">
                                <p className="text-white">forget password</p>
                              </div>
                            </Link>
          
                            <Link to="/otpLogin">
                            <div className="text-xs ">
                              <p>sign in with phone</p>
                            </div>
                          </Link>
                    </div>
          
                </form>
              </div>
            </div>
          </div>}

          {/* <div className=" "> */}
         {!show&&
     <div className="bg-cover bg-center bg-fixed flex justify-center items-center bg-[url('your-background-image.jpg')]">
     <div className="text-black text-center">
       <h1 style={gradientTextStyles} className="text-6xl  mb-8 text-shadow-md shadow-2xl">
         India's Largest Home Community
       </h1>
       <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
         <div className="rounded-xl bg-white bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 duration-300 transform hover:scale-105">
           <div className="flex  justify-center text-green-400 text-5xl mb-2 transform hover:scale-110 transition-transform duration-300">
             <FaPaintBrush />
           </div>
           <h2 className="text-xl font-bold">Find Design</h2>
           <p className="text-lg">Discover stunning designs</p>
         </div>
   
         <div className="rounded-xl bg-white bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 duration-300 transform hover:scale-105">
           <div className="flex  justify-center text-yellow-400 text-5xl mb-2 transform hover:scale-110 transition-transform duration-300">
             <FaUsers />
           </div>
           <h2 className="text-xl font-bold">Find Professionals</h2>
           <p className="text-lg">Connect with experts</p>
         </div>
   
         <div className="rounded-xl bg-white bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 duration-300 transform hover:scale-105">
           <div className= "flex  justify-center text-orange-400  text-5xl mb-2 transform hover:scale-110 transition-transform duration-300">
             <FaQuestion />
           </div>
           <h2 className="text-xl font-bold">Ask Queries</h2>
           <p className="text-lg">Get answers to your questions</p>
         </div>
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
