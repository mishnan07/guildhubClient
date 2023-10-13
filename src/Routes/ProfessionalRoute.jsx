import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../Component/ClientComponent/Register/Register";
import Signin from "../Component/ClientComponent/SignIn/Login";
import { useSelector } from "react-redux";
import RequirementPage from "../PageClients/Professionals/RequirementPage";
import ChatMessages from "../Component/ClientComponent/chatMessage/ChatMessage";

import MainPages from "../PageClients/Clients/MainPages";
import Nodata from "../Component/ClientComponent/Nodata/Nodata";

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
            isAuth ? <MainPages /> : <Navigate to="/professional/login" />
          }
        />
       
        <Route
          path="/community"
          element={
            isAuth ? <MainPages /> : <Navigate to="/professional/login" />
          }
        />

        <Route
          path="/community"
          element={
            isAuth ? <MainPages /> : <Navigate to="/professional/login" />
          }
        />
         <Route
          path="/requirement"
          element={isAuth ? <RequirementPage/> : <Navigate to="/professional/login" />}
        />
         <Route
          path="/hire"
          element={isAuth ? <MainPages /> : <Navigate to="/professional/login" />}
        />

        <Route
          path="/message"
          element={isAuth ? <ChatMessages /> : <Navigate to="/professional/login" />}
        />

        <Route
          path="/notification"
          element={isAuth ? <MainPages />: <Navigate to="/professional/login" />}
        />

        <Route path="/404" element={<Nodata />} />

        <Route path="*" element={<Navigate to="/professional/404" />} />

      </Routes>

      
    </div>
  );
};

export default ProfessionalRoute;
