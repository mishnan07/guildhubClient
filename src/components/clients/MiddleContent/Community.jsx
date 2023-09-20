import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import { userAPI } from "../../../Constants/Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OptionsIcon from "../Icon/OptionIcon";

const Community = ({ Type, user }) => {
  const [post, setPost] = useState([]);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);
  const [commentBoxes, setCommentBoxes] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const navigate = useNavigate()

  let token;
  if (Type === "users") {
    token = useSelector((state) => state.proAuth.Token);
  } else if ("professional") {
    token = useSelector((state) => state.proAuth.Token);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await userAxios.get("/getQuestion", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updatedPosts = response.data.post.map((post) => ({
          ...post,
          liked: false,
        }));
        setPost(updatedPosts);
        setPros(response.data.pros);
        setComments(response.data.comments);

        setUsers(response.data.users);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [state]);

  const userId = user ? user._id : "";
  const userType = Type ? Type : "";

  const handleLike = async (postId, userId = userId) => {
    console.log(postId, userId, "pppppppppppppppk");
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
      console.log(updatedPosts, "oooooooooooo");

      if (updatedPosts.find((item) => item._id === postId).liked) {
        console.log("yesssssssss");
        const response = await userAxios.post(
          "/likeQuestion",
          { postId, userId },
          { headers: { Authorization: `Bearer ${token}` } }
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

  const userName = (userID) => {
    const foundUser = users.find((user) => user._id === userID);
    return foundUser ? foundUser.name : false;
  };

  const location = (proId) => {
    const foundPro = users.find((pro) => pro._id === proId);
    return foundPro ? foundPro.location : "User Name";
  };

  const details = (specificId) => {
    console.log(specificId, "questionComment==============");
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
        "/questionComment",
        { comment, postId, userId, userType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const goProfile = (userID) => {
    console.log(userID,'ddddddddd');
    navigate(`/profile?id=${userID}&usertype='users'`);
  }

  return (
    <div className="md:w-1/2   overflow-scroll h-screen ">
      {/* Create Post Section */}
      <div className=" create-post bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-row items-center">
          <div className="w-10 h-10">
            <img
              src="images/users/user-1.jpg"
              alt=""
              className="profile-photo-md w-full h-full rounded-full"
            />
          </div>
          <div className="flex-1 ml-2">
            <textarea
              name="texts"
              id="exampleTextarea"
              cols="30"
              rows="1"
              className="form-control bg-gray-200 p-2 rounded-md resize-none focus:outline-none focus:bg-white w-full"
              placeholder="What's on your mind?"
            ></textarea>
          </div>
          <div className="flex-none ml-2">
            <ul className="publishing-tools flex list-none">
              <li className="mr-2">
                <a href="#" className="text-blue-500">
                  <i className="ion-compose"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500">
                  <i className="ion-images"></i>
                </a>
              </li>
              {/* Add more tools */}
              {/* ... */}
            </ul>
            <button className="btn btn-primary bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      {post.map((item) => (
         <div className="w-full h-fit relative">
        <div
          className="post-content bg-white  mt-4 rounded-lg shadow-lg"
          key={item._id}
        >
          {/* User Info */}
          <div className="post-container  mt-4 p-2">
          <img
                  onClick={()=>goProfile(item.userId)}
                  
                    src={profile}
                    alt="user"
                    className="profile-photo-md float-left w-10 h-10 rounded-full"
                  />
            <div className="post-detail ml-16">
              <div className="user-info flex justify-between">
                <div>
                <h5>
                  <a
                    href="timeline.html"
                    className="profile-link text-blue-500 font-semibold hover:underline"
                  >
                    {item.userId ? userName(item.userId) : "no name"}
                  </a>{" "}
                  <span className="following text-green-500">
                    {item.userId ? location(item.userId) : "no location"}
                  </span>
                </h5>
                <p className="text-muted">
                  {" "}
                  {item.userId
                    ? new Date(item.createdAt).toLocaleString()
                    : "no name"}
                </p>
                </div>
                <div className="p-3">
                <OptionsIcon />
                </div>

              </div>
            </div>
          </div>
          {/* {()=>check(item)} */}

          {/* Image or Video */}
          <div className="flex justify-center ">
            {item.image[0] ? (
              <img
                src={`${userAPI}/images/` + item.image[0]}
                alt="post-image"
                className="img-responsive post-image w-full h-[350px] object-cover "
                />
            ) : (
              ""
            )}
          </div>

          {/* Like and Post Text */}
          <div className="flex-col justify-center ml-14">
            <div className="post-text">
              <p className="text-gray-700 line-clamp">{item.message}</p>
            </div>
            <div className="reaction flex  mt-2">
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
                <i className="icon ion-thumbsup"></i> {item.likes.length}
              </a>

              <span className="ml-4">
                <svg
                  onClick={() => commentDiv(item._id)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-7v2H9v-2h2zm4 0v2h-2v-2h2z" />
                </svg>
              </span>

              <div>
                <a className="btn text-red-500 hover:underline">
                  <i className="fa fa-thumbs-down"></i>
                  {comments.filter((item2) => item._id === item2.post).length}
                </a>
              </div>
            </div>

            {commentBoxes[item._id] ? (
              <div>
                <form onSubmit={(e) => commentSubmit(e, item._id)}>
                  <label for="chat" className="sr-only">
                    Your message
                  </label>

                  <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-white-700 md:w-[400px]">
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
                                {item.userId ? details(item1.userId) : ""}
                              </p>
                              <p className="text-sm text-black-500 truncate dark:text-black-400">
                                {item._id === item1.post ? item1.content : ""}
                              </p>
                            </div>
                            {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $367
         </div> */}
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

          <div>
            <div className="line-divider border-t-2 border-gray-300 my-4"></div>
          </div>
        </div>
        </div>

      ))}
    </div>
  );
};

export default Community;
