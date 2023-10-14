import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProfilePic from "../ProfilePic/ProfilePic";


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
  const follower = user ? user.following:[]

  const profile = "/images/user_149071.png";

  const location = useLocation();
  const userType = location.pathname.includes("professional")
    ? "professional"
    : "users";
  const id = useSelector((state) =>
  userType === "users" ? state.ClientAuth.Id : state.proAuth.Id
  );

 




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
            <ul className="online-users w-full flex  list-inline ">
  {follower.map((item) => {

    return (
      
      <>
      <div className="relative  "   onClick={() => goMessage(item.followersId)}>
      <li   
       className="ml-3" key={item._id}>
        <ProfilePic UserId={item.followersId} value="pic" chat='chat'/>
        {/* Other content you want to render for each follower */}
      </li>
      <span className="absolute h-4 w-4  rounded-full border-2 border-white"></span>
                  </div>
                </>
    );
  })}
</ul>

          </div>
        </div>
      </div>
      {/* <LeftSidebar /> */}
    </>
  );
};

export default RightSidebar;
