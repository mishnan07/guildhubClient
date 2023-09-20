import React, { useEffect, useState } from "react";
import CustomModal from "../../../components/modal/CustomModal";
import CustomModals from "../../../components/modal/CustomModal";
import { userAPI } from "../../../Constants/Api";

import ImageUpload from "../../professionals/post/ImageUpload";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { proLogOut } from "../../../Redux/proAuth";
import PostUpload from "../../professionals/post/PostUpload";
import Question from "../question/Question";
import Requirements from "../requirement/Requirements";
const LeftSidebar = ({ Type, user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpens, setModalIsOpens] = useState(false);

  const profile = "/images/user_149071.png";


  const userType = user ? user : "";

  const userT = userType.experiance ? "professional" : "users";

  console.log(userT, "ppppppppppppsssssssssssssssssssq");

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
  console.log(modalIsOpen, "pppp pppp ppp");

  const hadleLogout = () => {
    dispatch(proLogOut());
    navigate("/professional/login");
  };
  return (
    <div className="md:w-1/4">
      <div className="profile-card  bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-lg">
       <div className="flex justify-center items-center">
        {user?.profilePic?(
       <img
       className=" w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
       src={`${userAPI}/images/` + user.profilePic}
       alt="profile"
      //  onClick={open}
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
      <ul className="nav-news-feed mt-6 space-y-2">
        <li className="flex items-center">
          <i className="icon ion-ios-paper text-blue-500"></i>
          <a
            href="newsfeed.html"
            className="text-blue-500 hover:underline ml-2"
          >
            Trending
          </a>
        </li>
        <li className="flex items-center">
          <i className="icon ion-ios-paper text-blue-500"></i>
          <a
            href="newsfeed.html"
            className="text-blue-500 hover:underline ml-2"
          >
            Category
          </a>
        </li>
        <li className="flex items-center">
          <i className="icon ion-ios-paper text-blue-500"></i>
          <a
            href="newsfeed.html"
            className="text-blue-500 hover:underline ml-2"
          >
            Videos
          </a>
        </li>
        {userT === "users" ? (
          <li className="flex items-center">
            <i className="icon ion-ios-paper text-blue-500"></i>
            <a href="#" className="text-blue-500 hover:underline ml-2">
              <span onClick={openModal}>Ask Experts</span>
            </a>
          </li>
        ) : (
          <li className="flex items-center">
            <i className="icon ion-ios-paper text-blue-500"></i>
            <a href="#" className="text-blue-500 hover:underline ml-2">
              <span onClick={openModal}>Crate Post</span>
            </a>
          </li>
        )}
        {userT === "users" ? (
          <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
            <Question user={user} />
          </CustomModal>
        ) : (
          <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
            <ImageUpload user={user} onClose={closeModal} />
          </CustomModal>
        )}
        {userT === "users" ? (
          <>
            <li className="flex items-center">
              <i className="icon ion-ios-people text-blue-500"></i>
              <a href="#" className="text-blue-500 hover:underline ml-2">
                <span onClick={openModals}> Create Requirement</span>
              </a>
            </li>
            <CustomModals isOpen={modalIsOpens} onClose={closeModals}>
              <Requirements user={user} onClose={closeModals} />
            </CustomModals>
          </>
        ) : (
          ""
        )}{" "}
        {/* Add more nav links */}
        {/* ... */}
      </ul>
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
          {/* Add more online users */}
          {/* ... */}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
