import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import { userAPI } from "../../../Constants/Api";
import ThreeDotButton from "./ThreeDotButton";
import Options from "./Options";
import Report from "./Report";
import { FaComment } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { Navigate, useNavigate } from "react-router-dom";


const MiddleContent = ({ Type, user, token, userID, saveduserID, saveds }) => {
  const [post, setPost] = useState([]);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);
  const [commentBoxes, setCommentBoxes] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [deleatedId, setDeleatedId] = useState("");
  const [openReport, setOpenReport] = useState(false);
  const [searchInput, SetSearchInput] = useState("");

  const navigate = useNavigate()

  const deleatTheComponent = (value) => {
    setDeleatedId(value);
  };

  const userId = user ? user._id : "";
  const userType = Type ? Type : "";

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

        if (userID) {
          console.log(userID, "00000000000000");
          const posteds = updatedPosts.filter(
            (item) => !item.isBanned && item.isActive && item.proId === user._id
          );
          console.log(posteds);
          setPost(posteds);
        }

        if (saveduserID) {
          console.log(saveduserID, "ppppppppp");
          const savedPost = updatedPosts.filter((obj1) =>
            saveds.some(
              (obj2) =>
                obj2.postId === obj1._id &&
                obj1.isBanned === false &&
                obj1.isActive
            )
          );
          setPost(savedPost);
        }

        setPros(response.data.pros);
        setComments(response.data.comments);
        setUsers(response.data.users);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [state, userID, user]);

  const handleLike = async (postId, userId = userId) => {
    if (state) {
      setState(false);
    } else {
      setState(true);
    }
    try {
      const updatedPosts = post.map((item) =>
        item._id === postId ? { ...item, liked: !item.liked } : item
      );
      setPost(updatedPosts);
      if (updatedPosts.find((item) => item._id === postId).liked) {
        const response = await userAxios.post(
          "/like",
          { postId, userId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // response();
        console.log(response.data, "Like successful");
      } else {
        console.log("unlike");
        // Handle unliking if needed
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const profile = "/images/user_149071.png";

  const check = () => {
    console.log(item._id, "111771111");
  };

  const hasLiked = (likes, userId) =>
    likes.some((like) => like.userId === userId && like.liked);
  //ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

  const LikeCount = (likes) => {
    likes.some((like) => {
      return like.liked;
    });
  };

  const proName = (proId) => {
    const foundPro = pros.find((pro) => pro._id === proId);
    return foundPro ? foundPro.name : false;
  };

  const proPic = (proId) => {
    const foundPro = pros.find((pro) => pro._id === proId);
    return foundPro ? foundPro.profilePic : false;
  };

  const userName = (userID) => {
    const foundUser = users.find((user) => user._id === userID);
    return foundUser ? foundUser.name : false;
  };

  const location = (proId) => {
    const foundPro = pros.find((pro) => pro._id === proId);
    return foundPro ? foundPro.location : "User Name";
  };

  const proCategory = (proId) => {
    const foundPro = pros.find((pro) => pro._id === proId);
    return foundPro ? foundPro.category : "User Name";
  };

  const details = (specificId) => {
    let idExists = pros.find((pro) => pro._id === specificId);
    const a = "";
    if (idExists) {
      return idExists.name;
    } else if (!idExists) {
      idExists = users.find((pro) => pro._id === specificId);
      if (idExists) {
        return idExists.name;
      }
    } else {
      return a;
    }
  };

  const commentDiv = (postId) => {
    setCommentBoxes((prevCommentBoxes) => ({
      ...prevCommentBoxes,
      [postId]: !prevCommentBoxes[postId],
    }));
  };

  const commentSubmit = async (e, postId) => {
    e.preventDefault();
    if (state) {
      setState(false);
    } else {
      setState(true);
    }
    try {
      const response = await userAxios.post(
        "/comment",
        { comment, postId, userId, userType },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const goProfile = (userID) => {
    navigate(`/professional/profile?id=${userID}&usertype='professional'`);
  }
  
  
  const datas = 
    post
  .filter((item) => {
    const locationMatch = location(item.proId)
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const categoryMatch = proCategory(item.proId)
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    return (
      item.isActive === true &&
      item.isBanned === false &&
      (locationMatch || categoryMatch)
    );
  });



  


  return (
    <div className="md:w-1/2   overflow-scroll h-screen ">
      {/* Create Post Section */}
      {!userID && !saveduserID ? (
        <SearchBar SetSearchInput={SetSearchInput} searchInput={searchInput} />
      ) : (
        ""
      )}
      {/* Post Content */}
      {datas
        .map((item) => (
          <div className="w-full h-fit relative">
            {/* <div className="w-fit h-fit absolute top-[-50%] right-[10%] md:top-[-50%] md:right-[50%]">
          <Report />
          </div> */}

            {deleatedId !== item._id ? (
              <div
                className="post-content bg-white  mt-4 rounded-lg shadow-lg"
                key={item._id}
              >
                {/* User Info */}
                <div className="post-container flex justify-start items-start mt-4 p-2">
                  {proPic(item.proId) ?
                  <img
                  onClick={()=>goProfile(item.proId)}
                  src={`${userAPI}/images/` + proPic(item.proId)}
                      alt="user"
                    className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600-600 p-0.5"
                  />
                  :
                  <img
                  onClick={()=>goProfile(item.proId)}
                    src={profile}
                    alt="user"
                    className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600-600 p-0.5"
                  />
                  }
                  <div className="flex justify justify-between w-full  post-detail ml-2 mb-2">
                    <div className="user-info">
                      <h5>
                        <a
                          href="timeline.html"
                          className="profile-link text-blue-500 font-semibold hover:underline"
                        >
                          {item.proId ? proName(item.proId) : "no name"}
                        </a>{" "}
                        <span className="following text-green-500">
                          {item.proId ? location(item.proId) : ""}
                        </span>
                      </h5>
                      <p className="text-muted">
                        {" "}
                        {item.proId ? proCategory(item.proId) : "no name"}
                      </p>
                    </div>

                    <div className="mt-4 ">
                      <Options
                        item={item}
                        user={user}
                        deleate={deleatTheComponent}
                        value={item._id}
                        Type={Type}
                      />
                    </div>
                  </div>
                </div>

                {/* {()=>check(item)} */}
                {/* Image or Video */}
                <div className="flex justify-center items-center">
                  {item.image[0] ? (
                    <img
                      src={`${userAPI}/images/` + item.image[0]}
                      alt="post-image"
                      className="img-responsive post-image w-full h-[400px] object-cover "
                    />
                  ) : (
                    <video
                      controls
                      src={`${userAPI}/images/` + item.video[0]}
                      type="video/mp4"
                      className="img-responsive post-image w-full h-[450px] object-cover "
                    />
                  )}
                </div>

                {/* Like and Post Text */}
                <div className="flex-col justify-center ">
                  <div className="reaction flex-  mt-2">
                    <div className="flex justify-items-start ml-2 ">
                      <div className="flex  mr-5">
                        <span>
                          <svg
                            onClick={() => handleLike(item._id, userId)}
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                              hasLiked(item.likes, userId)
                                ? "h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer"
                                : "h-7 w-7 text-gray-400 hover:text-red-400 transition duration-100 cursor-pointer"
                            }
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <a className="btn text-green-500 hover:underline">
                          <i className="icon ion-thumbsup"></i>{" "}
                          {item.likes.length}
                        </a>
                      </div>

                      <div className="flex">
                        <span>
                          <div
                            className="flex items-center "
                            onClick={() => commentDiv(item._id)}
                          >
                            <FaComment className="text-gray-400 text-2xl " />
                          </div>
                        </span>

                        <div className="ml-1">
                          <a className="btn text-red-500 hover:underline ">
                            <i className="fa fa-thumbs-down"></i>
                            {
                              comments.filter(
                                (item2) => item._id === item2.post
                              ).length
                            }
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    {commentBoxes[item._id] ? (
                      <div>
                        <form onSubmit={(e) => commentSubmit(e, item._id)}>
                          <label for="chat" className="sr-only">
                            Your message
                          </label>

                          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-white-700 md:w-[450px]">
                            <button
                              type="button"
                              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                            >
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 18"
                              >
                                <path
                                  fill="currentColor"
                                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                                />
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                />
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                                />
                              </svg>
                              <span className="sr-only">Upload image</span>
                            </button>
                            <button
                              type="button"
                              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                            >
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                                />
                              </svg>
                              <span className="sr-only">Add emoji</span>
                            </button>
                            <textarea
                              id="comment"
                              type="text"
                              name="comment"
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                              value={comment}
                              rows="1"
                              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Your message..."
                            ></textarea>
                            <button
                              type="submit"
                              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                            >
                              <svg
                                className="w-5 h-5 rotate-90"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20"
                              >
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                              </svg>
                              <span className="sr-only">Send message</span>
                            </button>
                          </div>
                        </form>

                        <div>
                          {comments.map((item1) => (
                            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-300">
                              {item._id === item1.post ? (
                                <li className="pt-5  pb-3 sm:pt-4">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="w-8 h-8 rounded-full"
                                        src="/docs/images/people/profile-picture-4.jpg"
                                        alt="Neil image"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-600 truncate dark:text-gray">
                                        {item.proId
                                          ? details(item1.userId)
                                          : ""}
                                      </p>
                                      <p className="text-sm text-black-500 truncate dark:text-black-400">
                                        {item._id === item1.post
                                          ? item1.content
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ) : (
                                " "
                              )}
                            </ul>
                          ))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="post-text p-2">
                    <p className="text-gray-700">{item.message}</p>
                  </div>
                </div>

                <div>
                  <div className="line-divider border-t-2 border-gray-300 my-4"></div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
    </div>
  );
};

export default MiddleContent;
