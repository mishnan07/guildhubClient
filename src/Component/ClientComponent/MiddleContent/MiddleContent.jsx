import React, { useEffect, useState } from "react";
import CreateUserInstance from '../../../Axios/UserAxios';
import CreateProInstance from "../../../Axios/ProAxios";
import SearchBar from "./SearchBar";
import { Navigate, useNavigate } from "react-router-dom";
import EmojiInput from "../InputEmoji/EmojiInput";
import CommentBox from "../CommentBox/CommentBox";
import { io } from "socket.io-client";
import LikeComment from "./LikeComment";
import NoDataFound from "../../NoDataFound/NoDataFound";
import PostText from "./PostText";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostNav from "./PostNav";

const MiddleContent = ({ Type, user, token, userID, saveduserID, saveds,specificPost }) => {
  const [post, setPost] = useState([]);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);
  const [commentBoxes, setCommentBoxes] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [deleatedId, setDeleatedId] = useState("");
  const [opennewMessageReport, setOpenReport] = useState(false);
  const [searchInput, SetSearchInput] = useState("");
  const [newMessages, setNewMessage] = useState("");
  const userAxios = CreateUserInstance()
  const proAxios = CreateProInstance()

 const Axios = Type==='users'?userAxios:proAxios
  const navigate = useNavigate();

  const deleatTheComponent = (value) => {
    setDeleatedId(value);
  };

  const userId = user ? user._id : "";
  const userType = Type ? Type : "";
//----=====///////////
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get("/getPost");
        const updatedPosts = response.data.post.map((post) => ({
          ...post,
          liked: false,
        }));
        setPost(updatedPosts);

        if(specificPost){
          const specificPosts = updatedPosts.filter(
            (item)=>
            item._id === specificPost
            )
          setPost(specificPosts)
        }

        if (userID) {
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

  const socket = io.connect("http://localhost:3000");

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
        const response = await Axios.post(
          "/like",
          { postId, userId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200 && response.data.action === "like") {
          socket.emit(
            "notification",
            response.data.proId,
            postId,
            userId,
            userType,
            "PostLike"
          );
        }
      } else {
        console.log("unlike");
        // Handle unliking if needed
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const profile = "/images/user_149071.png";

 
  const hasLiked = (likes, userId) =>
    likes.some((like) => like.userId === userId && like.liked);

 

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

  const details = (specificId, value) => {
    let idExists = pros.find((pro) => pro._id === specificId);
    const a = "";
    if (idExists) {
      if (value === "name") {
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

  const commentSubmit = async (postId, text) => {
    if (state) {
      setState(false);
    } else {
      setState(true);
    }

    try {
      const response = await Axios.post(
        "/comment",
        {
          text,
          postId,
          userId,
          userType,
        },
      );

      if (response.status === 200) {
        setText("");
      } else {
        console.error("Failed to submit comment:", response);
      }
    } catch (error) {
      console.error("Error while submitting comment:", error);
    }
  };

 
  const datas = post.filter((item) => {
    const locationMatch = location(item.proId)
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const name = proName(item.proId)
      .toLowerCase()
      .includes(searchInput.toLowerCase());

      const categoryMatch = proCategory(item.userId)
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    return (
      item.isActive === true &&
      item.isBanned === false &&
      (locationMatch || name || categoryMatch)
    );
  });

  const save = async (postId) => {
    try {
      const response = await Axios.post(
        "/savePost",
        { postId, userId: user._id, Type }, );
      if (response.data.isTrue === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };

  return (
    <div className="">
      {/* Create Post Section */}
      <ToastContainer />

      {!specificPost &&
            <div className=" create-post bg-white p-4 rounded-lg shadow-md">
        <SearchBar SetSearchInput={SetSearchInput} searchInput={searchInput} />
        </div>

    }
      {/* Post Content datas */}
      {(datas.length === 0 && <NoDataFound />) ||
        datas
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .map((item) => (
            <div className="w-full h-fit relative">
        

              {deleatedId !== item._id ? (
                <div
                  className="post-content bg-white  mt-4 rounded-lg shadow-lg"
                  key={item._id}
                >
                  {/* User Info */}
                 
                  <PostNav item={item} user ={user} deleatTheComponent={deleatTheComponent} Type={Type} setState={setState}/>

                  {/* Image or Video */}
                  <div className="flex justify-center items-center">
                    {item.image[0] ? (
                      <img
                        src={item.image[0]}
                        alt="post-image"
                        className="img-responsive post-image w-full h-[400px] object-cover "
                      />
                    ) : (
                      <video
                        controls
                        src={ item.video[0]}
                        type="video/mp4"
                        className="img-responsive post-image w-full h-[450px] object-cover "
                      />
                    )}
                  </div>

                  {/* Like and Post Text */}
                  <div className="flex-col justify-center w-full mt-3">
                 

                    <LikeComment
                      item={item}
                      handleLike={handleLike}
                      hasLiked={hasLiked}
                      userId={userId}
                      commentDiv={commentDiv}
                      comments={comments}
                      save={save}
                    />

                    <div className="">
                      {commentBoxes[item._id] ? (
                        <div className="p-8">
                          <div className="px-16">
                            <EmojiInput send={commentSubmit} id={item._id} />
                          </div>
                          <div></div>
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
                    <PostText item={item} />
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
