import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate for conditional routing
import Register from "../Component/ClientComponent/SignUp/Register.jsx";
import Signin from "../Component/ClientComponent/SignIn/Login.jsx"
import { useSelector } from "react-redux";
import HirePage from "../PageClients/Clients/HirePage.jsx";
import RequirementPage from "../PageClients/Clients/RequirementPage.jsx";
import OtpLogin from '../Component/ClientComponent/SignIn/OtpLogin.jsx'
import ForgetPass from '../Component/ClientComponent/SignIn/ForgetPass.jsx'
import ChatMessages from "../Component/ClientComponent/ChatMessage/ChatMessage.jsx";
import MainPages from "../PageClients/Clients/MainPages.jsx";
import UserProfile from "../Component/ClientComponent/Profile/UserProfile.jsx";
import Nodata from "../Component/ClientComponent/Nodata/Nodata.jsx";

function ClientRoute() {
  const isAuth = useSelector((state) => state.ClientAuth.Token);
  const isAuth1 = useSelector((state) => state.ClientAuth.Token);




  return (
    <div>
      <Routes>
       
        <Route
          path="/home"
          element={isAuth ? <MainPages /> : <Navigate to="/login" />}
        />
        <Route
          path="/community"
          element={isAuth ? <MainPages /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/home" /> : <Signin />}
        />
    
         <Route
          path="/hire"
          element={isAuth ? <HirePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/requirement"
          element={isAuth ? <RequirementPage /> : <Navigate to="/login" />}
        />
    
        <Route
          path="/otpLogin"
          element={isAuth ? <Navigate to="/login" /> : <OtpLogin />}
        />

        <Route
          path="/forgetPass"
          element={isAuth ? <Navigate to="/forgetPass" /> : <ForgetPass />}
        />

   

          <Route path="/404" element={<Nodata />} />

          <Route path="*" element={<Navigate to="/404" />} />



         <Route
          path="/message"
          element={isAuth ? <ChatMessages />: <Navigate to="/login" />}
        />
        
        <Route
          path="/notification"
          element={isAuth ? <MainPages />: <Navigate to="/login" />}
        />

         <Route
          path="/profilePage"
          element={ <UserProfile />}
        />

        
        
        
      </Routes>
      
      
    </div>
  );
}

export default ClientRoute;
