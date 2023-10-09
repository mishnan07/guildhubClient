import React, { useEffect, useState } from "react";
import CustomModal from "../../../components/modal/CustomModal";
import CustomModals from "../../../components/modal/CustomModal";
import { userAPI } from "../../../Constants/Api";

import ImageUpload from "../../professionals/post/ImageUpload";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { proLogOut } from "../../../Redux/proAuth";
import PostUpload from "../../professionals/post/PostUpload";
import Question from "../question/Question";
import Requirements from "../requirement/Requirements";
import Modal from "../../professionals/Modal/Modal";
import { FaTimes } from "react-icons/fa";
const LeftSidebar = ({ Type, user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpens, setModalIsOpens] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2,setIsOpen2] = useState(false)



  const profile = "/images/user_149071.png";


  const userType = user ? user : "";
  
  const location = useLocation();
  const senderType = location.pathname.includes('professional') ? 'professional' : 'users';

  const userT = senderType


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const openModals = () => {
    setModalIsOpens(true);
  };
  const closeModals = () => {
    setModalIsOpens(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const Requirement = ()=>{
    if(userT==='users'){
      navigate('/requirement')
    }else if(userT === 'professional'){
      navigate('/professional/requirement')
    }
  }

  const hadleLogout = () => {
    dispatch(proLogOut());
    navigate("/professional/login");
  };
  return (
    <div className="md:w-1/5">
      {user&&
      <div
       className="profile-card  bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-lg">
       <div className="flex justify-center items-center">
        {user?.profilePic?(
       <img
       className=" w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
       src={`${userAPI}/images/` + user.profilePic}
       alt="profile"
     />
        ):(
          <img
          className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                 border-2 border-pink-600 p-1"
          src={profile}
          alt="profile"
          // onClick={open}
        />)}
      </div>
        <h5 className="text-2xl font-semibold text-center">
          <a href="timeline.html" className="hover:underline">
            {user ? user.name : ""}
          </a>
        </h5>
        <p className="text-center text-sm">
          <a href="#" className="text-white hover:underline">
            <i className="ion ion-android-person-add"></i>
            {user ? user.following.length : ""} followeres
          </a>
        </p>
      </div>
}


{user&&
      <ul className="nav-news-feed  space-y-2 p-5 bg-white mt-6 text-purple-800 rounded-md shadow-lg ">
        <li className="flex items-center border-b">
          <i className="icon ion-ios-paper text-blue-500"></i>
          <p  className=" cursor-pointer ml-2"
          onClick={Requirement}
            href="#"
          >
            Requirement
          </p>
        </li>
      
        {userT === "users" ? (
          <li className="flex items-center border-b">
            <i className="icon ion-ios-paper text-blue-500"></i>
            <p  className=" cursor-pointer ml-2">
              <span onClick={()=>setIsOpen2(true)}>Ask Experts</span>
            </p>
          </li>
        ) : (
          <li className="flex items-center border-b">
            <i className="icon ion-ios-paper text-blue-500 "></i>
            <a href="#" className=" hover:underline ml-2">
              <span onClick={()=>setIsOpen1(true)}>Crate Post</span>
            </a>
          </li>
        )}
        {userT === "users" ? (
          <Modal isOpen={isOpen2} onClose={()=>setIsOpen2(false)}>
          <button className="p-2" onClick={() => setIsOpen2(false)}>
                  <FaTimes /> 
          </button>
            <Question value='create'/>
            </Modal>
        ) : (
          <Modal isOpen={isOpen1} onClose={()=>setIsOpen1(false)}>
          <button className="p-2" onClick={() => setIsOpen1(false)}>
                  <FaTimes /> 
          </button>           
           <ImageUpload user={user} onClose={closeModal} />
          </Modal>
        )}
        {userT === "users" ? (
          <>
            <li className="flex items-center border-b">
              <i className="icon ion-ios-people text-blue-500"></i>
              <p  className=" cursor-pointer ml-2">
                <span  onClick={()=>setIsOpen1(true)}> Create Requirement</span>
              </p>
            </li>
            <Modal isOpen={isOpen1} onClose={()=>setIsOpen1(false)}>
          <button className="p-2" onClick={() => setIsOpen1(false)}>
                  <FaTimes /> 
          </button>
          
                <Requirements user={user} onClose={closeModals} setIsOpen1={setIsOpen1}/>
            </Modal>
          </>
        ) : (
          ""
        )}{" "}
        {/* Add more nav links */}
        {/* ... */}
      </ul>
}

      {user &&
      <div id="chat-block" className="mt-6">
        <div className="title text-blue-500 font-semibold mb-2">
          Chat online
        </div>
        <ul className="online-users list-inline space-x-2">
          <li>
            <a href="newsfeed-messages.html" title="Linda Lohan">
              <img
                src="images/users/user-2.jpg"
                alt="user"
                className="img-responsive profile-photo w-12 h-12 rounded-full"
              />
              <span className="online-dot bg-green-500"></span>
            </a>
          </li>
        
        </ul>
      </div>
}
    </div>
  );
};

export default LeftSidebar;
