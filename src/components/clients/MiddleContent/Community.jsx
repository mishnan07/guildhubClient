import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import { userAPI } from "../../../Constants/Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OptionsIcon from "../Icon/OptionIcon";
import EmojiInput from "../InputEmoji/EmojiInput";
import CommentBox from "../CommentBox/CommentBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./SearchBar";
import PostNav from "./PostNav";
import LikeComment from "./LikeComment";
import PostText from "./PostText";

const Community = ({ Type, user }) => {
  const [post, setPost] = useState([]);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);
  const [commentBoxes, setCommentBoxes] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [searchInput, SetSearchInput] = useState("");

  const navigate = useNavigate();

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

  const details = (specificId, value) => {
    console.log(specificId, value, "ppppppppppp==");
    let idExists = pros.find((pro) => pro._id === specificId);
    console.log(idExists);
    const a = "";
    if (idExists) {
      if (value === "name") {
        console.log(idExists.name, "kkkkkkkkkkkkkkkkkkkk");
        return idExists.name;
      }
      if (value === "pic") {
        return idExists.profilePic;
      }
    } else if (!idExists) {
      idExists = users.find((pro) => pro._id === specificId);
      if (value === "name") {
        return idExists.name;
      }
      if (value === "pic") {
        return idExists.profilePic;
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

  const commentSubmit = async (postId, comment) => {
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

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  const goProfile = (userID) => {
    console.log(userID, "ddddddddd");
    navigate(`/profile?id=${userID}&usertype='users'`);
  };

  const deleteQuestion = async (id) => {
    console.log(id, "ppppppppppppppppppp");
    try {
      const response = await userAxios.post("/deleteQuestion", { id });
      if (response.status === 200) {
        showToastMessage(response.data.message);
        setState(!state);
      }
    } catch (error) {}
  };

  const proPic = (proId) => {
    const foundPro = users.find((pro) => pro._id === proId);
    return foundPro ? foundPro.profilePic : false;
  };

  const datas = post.filter((item) => {
    const locationMatch = location(item.userId)
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const name = userName(item.userId)
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    return item.isBanned === false && (locationMatch || name);
  });

  return (
    <div className="">
      <ToastContainer /> {/* Create Post Section */}
      <div className=" create-post bg-white p-4 rounded-lg shadow-md">
      <SearchBar SetSearchInput={SetSearchInput} searchInput={searchInput} />
      </div>
      {/* Post Content */}
      {datas.map((item) => (
        <div className="w-full h-fit relative">
          <div
            className="post-content bg-white  mt-4 rounded-lg shadow-lg"
            key={item._id}
          >
            {/* User Info */}
          

            <PostNav
              item={item}
              user={user}
              Type={Type}
              deleteQuestion={deleteQuestion}
              userId = {userId}
            />
                <PostText item={item} />


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
            <div className="flex-col justify-center w-full mt-3">
              {/* <div className="post-text">
                <p className="text-gray-700 line-clamp">{item.message}</p>
              </div> */}

              <LikeComment
                      item={item}
                      handleLike={handleLike}
                      hasLiked={hasLiked}
                      userId={userId}
                      commentDiv={commentDiv}
                      comments={comments}
                    />


              {/* <div className="reaction flex  mt-2">
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
              </div> */}

              {commentBoxes[item._id] ? (
                <div>
                  <div className="p-8">
                  <div className="px-16">
                    <EmojiInput send={commentSubmit} id={item._id} />
                    </div>
                  </div>
                
                  <CommentBox
                    comments={comments}
                    item={item}
                    details={details}
                  />
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
