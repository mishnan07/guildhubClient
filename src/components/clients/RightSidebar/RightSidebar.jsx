import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Modal from "../../professionals/Modal/Modal";
import ImageUpload from "../../professionals/post/ImageUpload";
import { FaTimes } from "react-icons/fa";
import LeftSidebar from "../LeftSidebar/LeftSidebar";

const RightSidebar = ({ user }) => {
  const [likedUsers, setLikedUsers] = useState([]);
  const [msg, setMsg] = useState("");

  const [notification, setNotification] = useState([]);
  const [onlineUser,setOnlineUser] = useState([])

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpens, setModalIsOpens] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const locations = useLocation();
  const userT = locations.pathname.includes("professional")
    ? "professional"
    : "users";

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

  const Requirement = () => {
    if (userT === "users") {
      navigate("/requirement");
    } else if (userT === "professional") {
      navigate("/professional/requirement");
    }
  };

  const profile = "/images/user_149071.png";

  const location = useLocation();
  const senderType = location.pathname.includes("professional")
    ? "professional"
    : "users";
  const id = useSelector((state) =>
    senderType === "users" ? state.ClientAuth.Id : state.proAuth.Id
  );

  const socket = io.connect("http://localhost:3000");



  // socket.on(id, (LikesUser, senderId, senderType, text) => {
  //   setLikedUsers([...likedUsers, LikesUser]);
  //   console.log("recived msg user like============", LikesUser.name);
  //   const newNotifications = {
  //     text: text,
  //     senderType: senderType,
  //     senderId: senderId,
  //     timestamp: Date.now(),
  //   };
  //   setMsg(`${LikesUser.name} liked your post`);
  //   setNotification([...notification, newNotifications]);
  // });

  // console.log(likedUsers, "ppppppppppp00");

  return (
    <>
      <div className="md:w-1/5">
        <div
          className="suggestions  bg-white p-1 rounded-lg shadow-lg"
          id="sticky-sidebar"
        >
          {/* <h4 className="grey text-gray-700">notification</h4>
        <div className="follow-user flex items-center space-x-4">
          <img src={profile} alt="" className="profile-photo-sm w-12 h-12 rounded-full" />
          <div>
            <h5><a href="timeline.html" className="text-blue-500">Diana Amber</a></h5>
            <a href="#" className="text-green-500">{msg?msg:''}</a>
          </div>
          {likedUsers.map((item)=>{
            <p>{`${item.name} liked your post`}</p>
          })}
        </div> */}

          <div id="chat-block" className="mt-6">
            <div className="title text-blue-500 font-semibold mb-2">
              Chat online
            </div>
            <ul className="online-users list-inline space-x-2">
              <li className="grid grid-cols-4">

                <a href="newsfeed-messages.html" title="Linda Lohan">
                  <div className="relative flex flex-shrink-0 items-end">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://i.pravatar.cc/300"
                    />
                    <span className="absolute h-4 w-4 bg-green-400 rounded-full border-2 border-white"></span>
                  </div>
                  <span className="online-dot bg-green-500"></span>
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
      {/* <LeftSidebar /> */}
    </>
  );
};

export default RightSidebar;
