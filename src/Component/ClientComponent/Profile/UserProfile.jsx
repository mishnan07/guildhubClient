import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CreateUserInstance from '../../../Axios/userAxios';
import CreateProInstance from "../../../Axios/proAxios";
import { userAPI } from "../../../Constants/Api";
import FollowButton from "../Follow/FollowButton";
import Modal from "../Modal/Modal";
import { FaTimes } from "react-icons/fa";
import ProfilePictureUpload from '../../ClientComponent/Profile/ProfilePictureUpload'
import CustomModal from "../../ClientComponent/Modal/CustomModal";
import EditProfile from "../../../Component/ClientComponent/Profile/EditProfile";
import Reviews from "../Reviews/Reviews";
import RequirementShow from "../Requirement/RequirementShow";
import Navbar from "../NavBar/Navbar";
import MiddleContent from "../MiddleContent/MiddleContent";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const[postedLength,setPostedLength] = useState('')
  const [RequirementLength,setRequirementLength] = useState('')
  const [type,setType] = useState('')
  const [suce, setSuc] = useState(0);
  const [userDetail, setUserDetail] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPost,setShowPost] = useState(true)
  const [Requirement,setRequirement] = useState(true)
  const [showReviw,setShowReviw] = useState(false)
  const [show,setShow] = useState(1)
  const [isOpen1, setIsOpen1] = useState(false);
  const [specificPost,setSpecificPost] = useState('')
  const userInstance = CreateUserInstance()
  const proInstance = CreateProInstance()


  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const changeState = () => {
    setState(!state);
    setIsOpen(false);
    setIsModalOpen(false);
  };

  const queryParams = new URLSearchParams(location.search);

  const profile = "/images/user_149071.png";
  const userType = queryParams.get("LogedUserType");
  const userId = queryParams.get("userId");

  const fetchUserDetails = async () => {
    try {
      const userId = queryParams.get("userId");
      const response = await Axios.get(`/detailsUserPro/${userId}`);
      setUser(response.data.user);
      const type = response.data.user.category ? "professional" : "users";
      setType(type);
    } catch (error) {}
  };

  const Axios = userType ==='users'?userInstance:proInstance

  const token = useSelector((state) =>
    userType === "users" ? state.ClientAuth.Token : state.proAuth.Token
  );

  const LogedUser = useSelector((state) =>
    userType === "users" ? state.ClientAuth.Id : state.proAuth.Id
  );

  useEffect(() => {
    fetchUserDetails();
  }, [suce, state]);

  const setting = async () => {
    try {
      let userdetails;

      if (LogedUser) {
        const response = await Axios.get(`/detailsUserPro/${LogedUser}`);
        userdetails = response.data.user;

        if (userdetails) {
          setUserDetail([userdetails]);
        } else {
          console.log("User details not found");
        }
      } else {
        console.log("LogedUser is not defined");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setting();
  }, [suce]);


  useEffect(() => {
     const  getPostPosteds = async()=>{
      try {
        const response = await Axios.get(`/getPostPosted/${userId}`)
        const updatedPosts = response.data.post.map((post) => ({
            ...post,
            liked: false,
          }));
          console.log(updatedPosts,'pppppp');
        setPost(updatedPosts)
        setPostedLength(updatedPosts.length)
      } catch (error) {
        
      }
     }
     getPostPosteds()
  }, []);

  const goMessage = (receiverId, name) => {
    if (userType === "professional") {
      navigate(
        `/professional/message?id=${receiverId}&goMessage='goMessage'&name=${name}`
      );
    } else if (userType === "users") {
      navigate(`/message?id=${receiverId}&name=${name}`);
    }
  };

  const open = () => {
    if(LogedUser===userId){
        setIsOpen(true);
    }else{
        setIsOpen(false);
    }
  };



  

  const getSavedPost= async()=>{
    setShowReviw(false)
    setShowPost(true)
    setRequirement(false)
    setShow(2)
    try {
        const response = await Axios.get(`/getSavedPost/${userId}/${type}`)
        const updatedPosts = response.data.savedPosts.map((post) => ({
            ...post,
            liked: false,
          }));
        setPost(updatedPosts)
    } catch (error) {
        
    }
  }

const getPostPosted = async()=>{
    setShowReviw(false)
    setShowPost(true)
    setShow(1)
    try {
        if(type === 'professional'){
        const response = await Axios.get(`/getPostPosted/${userId}`)
        const updatedPosts = response.data.post.map((post) => ({
            ...post,
            liked: false,
          }));
        setPost(updatedPosts)
        setPostedLength(updatedPosts.length)
        }else if (type === 'users'){
            setShowPost(false)
            setRequirement(true)
        }
    } catch (error) {
        
    }
}

const Review =()=>{
setShowPost(false)
setShowReviw(true)
setShow(3)
}

const getPost = (postId)=>{
    setSpecificPost(postId)
    setIsOpen1(true)
}

  return (
    <div>
      {/* Notification and ChatPage */}
      <Navbar Type={userType} />
      <div className="max-w-2xl mx-auto mt-20">
        <div className="px-3 py-2">
          <div className="flex flex-col justify-center items-center gap-1 text-center">
            {user?.profilePic ? (
              <img
                className=" w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                src={`${userAPI}/images/` + user.profilePic}
                alt="profile"
                onClick={open}
              />
            ) : (
              <img
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                 border-2 border-pink-600 p-1"
                src={profile}
                alt="profile"
                onClick={open}
              />
            )}

            <Modal isOpen={isOpen} onClose={close}>
              <button className="p-2" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>

              <ProfilePictureUpload
                user={user}
                Type={userType}
                state={state}
                setState={setState}
                changeState={changeState}
                close={close}
                
              />
            </Modal>
            <p className="font-serif font-semibold">{user?.name}</p>
            {user?.category && (
              <span className="text-sm text-gray-400">
                {user?.category} -{user?.experiance} year of experiance
              </span>
            )}
            <span className="text-sm text-gray-400">
              {user?.location} {user?.phone}
            </span>
          </div>
          <div className="flex justify-center items-center gap-2 my-3">
            <div className="font-semibold text-center mx-4">
              <p className="text-black">
                {" "}
                {type==='professional'
                  ? postedLength
                  : RequirementLength}
              </p>
              <span className="text-gray-400">Posts</span>
            </div>
            <div className="font-semibold text-center mx-4">
              <p className="text-black">
                {" "}
                {user ? user?.following.length : "0"}
              </p>
              <span className="text-gray-400">Followers</span>
            </div>
            <div className="font-semibold text-center mx-4">
              <p className="text-black">{user ? user?.follow.length : "0"}</p>
              <span className="text-gray-400">Following</span>
            </div>
          </div>
  
  <div>
  </div>

          <div className="flex justify-center gap-2 my-5">
            {LogedUser === user?._id ? (
              <>
                <button
                  onClick={openModal}
                  className="bg-pink-500 px-10 py-2 rounded-full text-white shadow-lg"
                >
                  Edit
                </button>

                <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                  <div className="-mt-16 -mb-20">
                    <EditProfile
                      user={user}
                      Type={userType}
                      changeState={changeState}
                    />
                  </div>
                </CustomModal>
              </>
            ) : (
              <>
                {console.log(
                  "====",
                  userDetail,
                  "====userDetailuserDetailuserDetail"
                )}
                <div className="bg-pink-500 px-10 py-2 rounded-full text-white shadow-lg">
                  <FollowButton
                    item={user}
                    userId={LogedUser}
                    userType={userType}
                    userDetail={userDetail}
                    token={token}
                    setSuc={setSuc}
                    suce={suce}
                  />
                </div>
                {/* className="bg-pink-500 px-10 py-2 rounded-full text-white shadow-lg" */}

                <button
                  onClick={() => goMessage(user?._id, user?.name)}
                  className="bg-white border border-gray-500 px-10 py-2 rounded-full shadow-lg"
                >
                  Message
                </button>
              </>
            )}
          </div>

          <div className="flex ">
            {/* {type === 'professional'&& */}
            <button
            className={`w-full py-2 border-b-2 border-${show === 1  ? 'yellow-400' : ''}`}
            onClick={getPostPosted}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012-2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              posts
            </button> 
            {/* } */}
            <button
            className={`w-full py-2 border-b-2 border-${show === 2  ? 'yellow-400' : ''}`}
            onClick={getSavedPost}
            >
                
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012-2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              saved

            </button>


            {type === 'professional' &&
            <button 
            className={`w-full py-2 border-b-2 border-${show === 3  ? 'yellow-400' : ''}`}
            onClick={Review}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Review
            </button>}
          </div>


          
          {Requirement && type === 'users' &&
           <div className="grid-flow-col grid-cols-2">
           <RequirementShow specific={userId} setRequirementLength={setRequirementLength}/>
         </div>
          }


          <div className="grid grid-cols-3 gap-5 my-3">
            {showPost && post && post
              .filter(
                (item1) =>
                  item1.isActive === true &&
                  item1.isBanned === false 
                 
              )
              .map((item) => (
                <div key={item._id} className="relative group"
                onClick={()=>getPost(item._id)}
                >
                  {item.image[0] ? (
                    <img
                      src={ item.image[0]}
                      alt="post-image"
                      className="img-responsive post-image w-full h-[200px] object-cover cursor-pointer"
                    />
                  ) : (
                    <video
                      controls
                      src={item.video[0]}
                      type="video/mp4"
                      className="img-responsive post-image w-full h-[200px] object-cover cursor-pointer"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 flex justify-center items-center opacity-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white cursor-pointer group-hover:opacity-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 3.293a1 1 0 011.414 0L10 7.586l3.293-3.293a1 1 0 111.414 1.414L11.414 9l3.293 3.293a1 1 0 11-1.414 1.414L10 10.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 9 5.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ))}



          </div>

          <Modal isOpen={isOpen1} onClose={()=>setIsOpen1(false)}>
  <button className="p-2" onClick={() => setIsOpen1(false)}>
          <FaTimes /> 
  </button>
  <div className='px-10 ml-5'>
  <MiddleContent
                Type={userType}
                user={user}
                token={token}
                specificPost={specificPost}
              />
  </div>
    </Modal>
    


     {showReviw&&  <Reviews LogedUserId={LogedUser} proId={userId} userType={userType} /> }
     

        </div>

        {/* <div className="flex justify-between items-center bg-yellow-600 bg-opacity-20 px-10 py-5 rounded-full text-gray-500">
          <button className="p-2 rounded-full bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-pink-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;
