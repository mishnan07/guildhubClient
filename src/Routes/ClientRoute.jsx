import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate for conditional routing
import Register from "../components/clients/register/Register.jsx";
import Signin from "../components/clients/signin/Signin.jsx";
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
import ChatMessages from "../components/clients/chatMessage/ChatMessage.jsx";
import Notification from "../components/clients/notification/Notification.jsx";
import NotificationPage from "../pages/Clients/NotificationPage.jsx";
import MainPage from "../pages/Clients/MainPage.jsx";
import UserProfile from "../components/clients/Profile/UserProfile.jsx";
import VideoRoom from "../components/clients/VideoCall/VideoRoom.jsx";
import Nodata from "../components/clients/Nodata/Nodata.jsx";

function ClientRoute() {
  const isAuth = useSelector((state) => state.ClientAuth.Token);
  const isAuth1 = useSelector((state) => state.ClientAuth.Token);




  return (
    <div>
      <Routes>
       
        <Route
          path="/home"
          element={isAuth ? <MainPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/community"
          element={isAuth ? <MainPage /> : <Navigate to="/login" />}
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

   

          <Route path="/404" element={<Nodata />} />

          <Route path="*" element={<Navigate to="/404" />} />



         <Route
          path="/message"
          element={isAuth ? <ChatMessages />: <Navigate to="/login" />}
        />
        
        <Route
          path="/notification"
          element={isAuth ? <NotificationPage />: <Navigate to="/login" />}
        />

         <Route
          path="/profilePage"
          element={ <UserProfile />}
        />

         <Route
          path="/videocall"
          element={ <VideoRoom />}
        />

        
        
      </Routes>
      
      
    </div>
  );
}

export default ClientRoute;
