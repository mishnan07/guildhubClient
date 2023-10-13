import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";


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




  return (
    <>
      <div className="md:w-1/5">
        <div
          className="suggestions  bg-white p-1 rounded-lg shadow-lg"
          id="sticky-sidebar"
        >
      

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
