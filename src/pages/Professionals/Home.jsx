import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClientLogout } from "../../Redux/ClientAuth";
import userAxios from "../../Axios/userAxios";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/professionals/navbar/Navbar";
import Sidebar from "../../components/professionals/sidebar/Sidebar";
import ComplexDiv from "../../components/professionals/home/ComplexDiv";
import professionalInstance from "../../Axios/proAxios";
import RightSideBar from "../../components/professionals/rightSideBar/RightSideBar";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const token = useSelector((state)=>state.proAuth.Token)
 const email = useSelector((state)=>state.proAuth.Email)

  useEffect(() => {
 if(token){
    console.log('sucessfull',email);
 }else{
    navigate('/professional/login')
 }
  }, [token]);


const data = 'i am data'

  return (
    <div>
      <div>
        <div>
          <Navbar />
        </div>
        <div className="flex justify-center">
          {/* Sidebar component */}
          <Sidebar email ={email}/>
          <ComplexDiv />

          <RightSideBar />


          <div className="">{/* First content section */}</div>

          <div className="">{/* Second content section */}</div>
        </div>
      </div>

    </div>
  );
};

export default Home;
