import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate for conditional routing
import Register from "../components/clients/register/Register.jsx";
import Signin from "../components/clients/signin/Signin.jsx";
import Home from "../pages/Clients/Home.jsx";
import { useSelector } from "react-redux";
import HomePage from "../pages/Clients/HomePage.jsx";
import CommunityPage from "../pages/Clients/CommunityPage.jsx";
import ProfilePages from "../pages/Clients/ProfilePage.jsx";
import HirePage from "../pages/Clients/HirePage.jsx";
import RequirementShow from "../components/clients/requirement/RequirementShow.jsx";
import RequirementPage from "../pages/Clients/RequirementPage.jsx";
import FollowPage from "../pages/Clients/FollowPage.jsx";
import PhoneSignin from "../components/clients/signin/PhoneSignin.jsx";
import OtpLogin from "../components/clients/signin/OtpLogin.jsx";
import ForgetPass from "../components/clients/signin/ForgetPass.jsx";
// import Chat from "../components/clients/Chat/Chat.jsx";

function ClientRoute() {
  const isAuth = useSelector((state) => state.ClientAuth.Token);
 



  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/community"
          element={isAuth ? <CommunityPage /> : <Navigate to="/login" />}
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
          path="/profile"
          element={isAuth ? <ProfilePages /> : <Navigate to="/login" />}
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
          path="/follow"
          element={isAuth ? <FollowPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/otpLogin"
          element={isAuth ? <Navigate to="/login" /> : <OtpLogin />}
        />

        <Route
          path="/forgetPass"
          element={isAuth ? <Navigate to="/forgetPass" /> : <ForgetPass />}
        />

        {/* <Route
          path="/chat"
          element={isAuth ? <Chat /> : <Navigate to="/login" />}
        /> */}
        
      </Routes>
      
      
    </div>
  );
}

export default ClientRoute;
