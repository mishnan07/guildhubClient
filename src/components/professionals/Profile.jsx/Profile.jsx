import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import { userAPI } from "../../../Constants/Api";
import "./Profile.css";
import Options from "../../clients/MiddleContent/Options";
import RequirementShow from "../../clients/requirement/RequirementShow";
import MiddleContent from "../../clients/MiddleContent/MiddleContent";
import { useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";
import Register from "../register/Register";
import EditProfile from "./EditProfile";
import CustomModal from "../../modal/CustomModal";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { FaArrowLeft } from "react-icons/fa";

const Profile = ({ Type, Uuser, token }) => {
  const [post, setPost] = useState([]);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);
  const [posted, setPosted] = useState([]);
  const [main, setMain] = useState([]);
  const [saved, setSaved] = useState(false);
  const [deleatedId, setDeleatedId] = useState("");
  const [show, setShow] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const changeState = ()=>{
      setState(!state)
  }

  const profile = "/images/user_149071.png";

  // const [selection,setSelection] =useState([])

  // Inside your component...
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const usertype = queryParams.get("usertype");

  const postImage = "/images/model-house-project-blueprints.jpg";

  const deleatTheComponent = (value) => {
    setDeleatedId(value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await userAxios.get("/getPost", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const updatedPosts = response.data.post.map((post) => ({
          ...post,
          liked: false,
        }));
        
        setPost(updatedPosts);
        setPros(response.data.pros);
        setUsers(response.data.users);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [state]);

  let userID;
  let user;

  if (usertype) {
    
    userID = queryParams.get("id");
    const USERR = pros.filter((item) => item._id === userID);
    console.log(USERR[0], "usrrrrrrrrrrrrrr");
    user = USERR[0];
    console.log(USERR[0]);
    console.log(Uuser);
  } else {
    userID = Uuser ? Uuser._id : "";
    user = Uuser;
  }

  console.log(userID, "pppppppppppppppl");

  const proId = user ? user._id : "";
  const saveds = user ? user.savedPost : "";
  const posteds = post.filter(
    (item) => !item.isBanned && item.isActive && item.proId === user._id
  );
  const savedPost = post.filter((obj1) =>
    saveds.some((obj2) => obj2.postId === obj1._id && obj1.isBanned === false)
  );
  console.log(savedPost, "ppoopp");

  //   setMain(posteds)
  //   setPosted(posteds)
  //  setSaved(savedPost)

  const handleShowPosts = () => {
    setShow(false);
    setSaved(false);
    setMain(posteds);
  };

  const handleShowSaved = () => {
    // setShow(false)
    setSaved(true);
    setMain(savedPost);
  };

  const handleHire = () => {
    setShow(false);
    setSaved(false);
    setShow(true);
  };

  const open = () => {
    if (!usertype) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              {user?.profilePic ? (
                // Render the profile information when user is available
                <div>
                  <img
                    className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                    src={`${userAPI}/images/` + user.profilePic}
                    alt="profile"
                    onClick={open}
                  />
                  {/* Render other user information here */}
                </div>
              ) : (
                // Render a loading indicator or placeholder when user is null or undefined
                <img
                  className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                         border-2 border-pink-600 p-1"
                  src={profile}
                  alt="profile"
                  onClick={open}
                />
              )}
            </div>
            <Modal isOpen={isOpen} onClose={close}>
              <button className="p-2" onClick={() => setIsOpen(false)}>
                <FaArrowLeft /> Back
              </button>
              {console.log(state,'a')}
              <ProfilePictureUpload user={user} Type={Type} state={state} setState={setState} changeState={changeState} close={close}/>
            </Modal>

            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0 text-cyan-500">
                  {user ? user.name : ""}
                </h2>

                <span
                  className="inline-block fas fa-certificate fa-lg text-blue-500 
                                   relative mr-6 text-xl transform -translate-y-2"
                  aria-hidden="true"
                >
                  <i
                    className="fas fa-check text-white text-xs absolute inset-x-0
                                   ml-1 mt-px"
                  ></i>
                </span>

                {!usertype ? (
                  <a
                    href="#"
                    onClick={openModal}
                    className="bg-blue-500 px-2 py-1 
                            text-white font-semibold text-sm rounded  text-center 
                            sm:inline-block block"
                  >
                    Edite
                  </a>
                ) : (
                  <a
                    href="#"
                    className="bg-blue-500 px-2 py-1 
                      text-white font-semibold text-sm rounded  text-center 
                      sm:inline-block block"
                  >
                    Follow
                  </a>
                )}
              </div>
              <div className="">
                <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                  {/* Content of your modal */}
                  {/* <button
      onClick={closeModal}
      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mt-4"
    >
      Close Modal
    </button> */}
                  <div className="-mt-16 -mb-20">
                    <EditProfile user={user} Type={Type} />
                  </div>
                </CustomModal>
              </div>

              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold mr-1">
                    {post
                      ? post.filter((item) => item.proId === user._id).length
                      : "0"}
                  </span>
                  posts
                </li>

                <li>
                  <span className="font-semibold mr-1">
                    {user ? user.following.length : ""}
                  </span>
                  followers
                </li>
                <li>
                  <span className="font-semibold mr-1">
                    {user ? user.follow.length : ""}
                  </span>
                  following
                </li>
              </ul>

              <div className="hidden md:block">
                <h1 className="font-semibold">{user ? user.category : ""}</h1>
                {Type === "professional" ? (
                  <p className="">
                    {user ? user.experiance : ""} year of experiance
                  </p>
                ) : (
                  <p>HomeOwner</p>
                )}
                <span>{user ? user.location : ""}</span>
                <p>{user ? user.phone : ""}</p>
              </div>
            </div>

            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">{user ? user.category : ""}</h1>
              <p className="">
                {user ? user.experiance : ""} year of experiance
              </p>

              <span>{user ? user.location : ""}</span>
              <p>{user ? user.phone : ""}</p>
            </div>
          </header>

          <div className="flex items-center justify-center  py-4 md:py-8 flex-wrap">
            <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
              onClick={handleShowPosts}
            >
              Posts
            </button>
            {Type === "professional" ? (
              <>
                <button
                  type="button"
                  className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                  onClick={handleHire}
                >
                  Hires
                </button>
                <button
                  type="button"
                  className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                >
                  Answeres
                </button>
                <button
                  type="button"
                  className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                >
                  Reviews
                </button>
              </>
            ) : (
              ""
            )}
            <button
              type="button"
              className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
              onClick={handleShowSaved}
            >
              Saved
            </button>
          </div>
          {!show && !saved ? (
            <div className="w-full flex justify-center items-center mt-8 md:mt-0">
              {console.log(userID, "ppppppppppppppppp===aa22")}
              <MiddleContent
                Type={Type}
                user={user}
                token={token}
                userID={userID}
              />
            </div>
          ) : (
            ""
          )}
          {show && !saved ? (
            <div className="grid-flow-col grid-cols-2">
              <RequirementShow profileId={proId} />
            </div>
          ) : (
            ""
          )}

          {saved ? (
            <div className="w-full flex justify-center items-center mt-8 md:mt-0">
              <MiddleContent
                Type={Type}
                user={user}
                token={token}
                saveduserID={userID}
                saveds={saveds}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;
