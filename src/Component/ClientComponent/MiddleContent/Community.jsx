import React, { useEffect, useState } from "react";
import CreateUserInstance from '../../../Axios/userAxios';
import CreateProInstance from "../../../Axios/proAxios";
import { userAPI } from "../../../Constants/Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmojiInput from "../InputEmoji/EmojiInput";
import CommentBox from "../CommentBox/CommentBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./SearchBar";
import PostNav from "./PostNav";
import LikeComment from "./LikeComment";
import PostText from "./PostText";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const Community = ({ Type, user }) => {
  const [post, setPost] = useState([]);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);
  const [commentBoxes, setCommentBoxes] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [searchInput, SetSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  let token;
  if (Type === "users") {
    token = useSelector((state) => state.proAuth.Token);
  } else if ("professional") {
    token = useSelector((state) => state.proAuth.Token);
  }
  const userAxios = CreateUserInstance()
  const proAxios = CreateProInstance()
  const Axios = Type === 'users'?userAxios:proAxios


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const response = await Axios.get("/getQuestion", {
        });
        const updatedPosts = response.data.post.map((post) => ({
          ...post,
          liked: false,
        }));
        setPost(updatedPosts);
        setPros(response.data.pros);
        setComments(response.data.comments);

        setUsers(response.data.users);
        setIsLoading(false)
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [state]);


 
  const userId = user ? user._id : "";
  const id = useSelector((state) => (Type === 'users' ? state.ClientAuth.Id : state.proAuth.Id));

  const userType = Type ? Type : "";

  const handleLike = async (postId, userId = id) => {
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
          "/likeQuestion",
          { postId, userId },
        );
        response();
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



  const userName = (userID) => {
    const foundUser = users.find((user) => user._id === userID);
    return foundUser ? foundUser.name : false;
  };

  const location = (proId) => {
    const foundPro = users.find((pro) => pro._id === proId);
    return foundPro ? foundPro.location : "User Name";
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

  const commentSubmit = async (postId, comment) => {
    if (state) {
      setState(false);
    } else {
      setState(true);
    }
    try {
      const response = await Axios.post(
        "/questionComment",
        { comment, postId, userId, userType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

 

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };



  const deleteQuestion = async (id) => {
    try {
      const response = await Axios.post("/deleteQuestion", { id });
      if (response.status === 200) {
        showToastMessage(response.data.message);
        setState(!state);
      }
    } catch (error) {}
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
    <>
    
      
      <ToastContainer /> {/* Create Post Section */}
      <div className=" create-post bg-white p-4 rounded-lg shadow-md">
      <SearchBar SetSearchInput={SetSearchInput} searchInput={searchInput} />
      </div>
      {/* Post Content */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
    <div className="">
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
     )}
  </>
  );
};

export default Community;
