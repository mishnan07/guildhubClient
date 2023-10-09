import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/professionals/register/Register";
import Post from "../components/professionals/post/Post";
import ImageUpload from "../components/professionals/post/ImageUpload";
import Signin from "../components/professionals/login/Signin";
import HomePage from "../pages/Professionals/HomePage";
import ProfilePages from "../pages/Professionals/ProfilePages";
import CommunityPage from "../pages/Professionals/CommunityPage";
import { useSelector } from "react-redux";
import RequirementPage from "../pages/Professionals/RequirementPage";
import HirePage from "../pages/Professionals/HirePage";
import ChatMessages from "../components/clients/chatMessage/ChatMessage";
import Notification from "../components/clients/notification/Notification";
import NotificationPage from "../pages/Clients/NotificationPage";
import MainPage from "../pages/Clients/MainPage";
import Nodata from "../components/clients/Nodata/Nodata";

const ProfessionalRoute = () => {
  const isAuth = useSelector((state) => state.proAuth.Token);
  const isAuth1 = useSelector((state) => state.ClientAuth.Token);

  return (
    <div>
      <Routes>
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/professional/home" /> : <Register />}
        />
       
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/professional/home" /> : <Signin />}
        />
    
        <Route
          path="/home"
          element={
            isAuth ? <MainPage /> : <Navigate to="/professional/login" />
          }
        />
        <Route
          path="/profile"
          element={
            isAuth || isAuth1 ?( <ProfilePages /> ):( <Navigate to="/professional/login" />)
          }
        />
        <Route
          path="/community"
          element={
            isAuth ? <MainPage /> : <Navigate to="/professional/login" />
          }
        />

        <Route
          path="/community"
          element={
            isAuth ? <MainPage /> : <Navigate to="/professional/login" />
          }
        />
         <Route
          path="/requirement"
          element={isAuth ? <RequirementPage/> : <Navigate to="/professional/login" />}
        />
         <Route
          path="/hire"
          element={isAuth ? <MainPage /> : <Navigate to="/professional/login" />}
        />

        <Route
          path="/message"
          element={isAuth ? <ChatMessages /> : <Navigate to="/professional/login" />}
        />

        <Route
          path="/notification"
          element={isAuth ? <MainPage />: <Navigate to="/professional/login" />}
        />

        <Route path="/404" element={<Nodata />} />

        <Route path="*" element={<Navigate to="/professional/404" />} />

      </Routes>

      
    </div>
  );
};

export default ProfessionalRoute;
