import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/professionals/register/Register";
import Post from "../components/professionals/post/Post";
import ImageUpload from "../components/professionals/post/ImageUpload";
import Signin from "../components/professionals/login/Signin";
import Home from "../pages/Professionals/Home.jsx";
import HomePage from "../pages/Professionals/HomePage";
import ProfilePages from "../pages/Professionals/ProfilePages";
import CommunityPage from "../pages/Professionals/CommunityPage";
import { useSelector } from "react-redux";
import RequirementPage from "../pages/Professionals/RequirementPage";
import HirePage from "../pages/Professionals/HirePage";

const ProfessionalRoute = () => {
  const isAuth = useSelector((state) => state.proAuth.Token);

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
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/professional/login" />}
        />
        <Route
          path="/home"
          element={
            isAuth ? <HomePage /> : <Navigate to="/professional/login" />
          }
        />
        <Route
          path="/profile"
          element={
            isAuth ? <ProfilePages /> : <Navigate to="/professional/login" />
          }
        />
        <Route
          path="/community"
          element={
            isAuth ? <CommunityPage /> : <Navigate to="/professional/login" />
          }
        />

        <Route
          path="/community"
          element={
            isAuth ? <CommunityPage /> : <Navigate to="/professional/login" />
          }
        />
         <Route
          path="/requirement"
          element={isAuth ? <RequirementPage /> : <Navigate to="/professional/login" />}
        />
         <Route
          path="/hire"
          element={isAuth ? <HirePage /> : <Navigate to="/professional/login" />}
        />
      </Routes>

      
    </div>
  );
};

export default ProfessionalRoute;
