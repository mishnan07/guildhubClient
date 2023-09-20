import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import ProfilePics from "../../clients/Profile/ProfilePics";
import { FaArrowLeft } from "react-icons/fa";
import { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userAPI } from "../../../Constants/Api";



const ProsCard = ({setShows,categoryName}) => {
    const [post, setPost] = useState([]);
    const [pros, setPros] = useState([]);
    const [requirement, setRequirement] = useState([]);
    const [users,setUsers] = useState([]);
    const [state, setState] = useState(false);
    const [posted,setPosted] = useState([])
    const [main,setMain] = useState([])
    const [saved,setSaved] = useState([])
    const [deleatedId, setDeleatedId] = useState('');
    const [show,setShow] = useState(false)

    const token = useSelector((state)=>state.ClientAuth.Token)
    const navigate = useNavigate()


   
    
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await userAxios.get("/getPost",
                        {headers: { Authorization: `Bearer ${token}` }});
        const updatedPosts = response.data.post.map((post) => ({
          ...post,
          liked: false,
        }));


        setPost(updatedPosts);
        setPros(response.data.pros);
        setUsers(response.data.users)  
        
        const response2 = await userAxios.get("/requirement");
        setRequirement(response2.data.response);
        
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };



    fetchPosts();

    
  }, [state]);

 

  const postSize = (userId)=>{
    const posteds =  post.filter(item => !item.isBanned &&item.isActive && item.proId === userId);
     return posteds.length
  }
  const HiredSize = (userId) => {
    console.log(requirement,'llllllllll===');
    const matchingRequirements = requirement.filter((requirements) => requirements.hired.includes(userId));
    return matchingRequirements.length;
  }

  const filteredPros = pros.filter((item1) => item1.category === categoryName);
console.log(filteredPros,'000000000000000000000');

const goProfile = (userID) => {
  console.log(userID,'ooopopo');
  navigate(`/professional/profile?id=${userID}&usertype='professional'`);
}
  
  return (
    <div>
      {/* <section className="bg-white overflow-scroll h-screen"> */}
        <div className="container mx-auto">
          <button className="p-2" onClick={() => setShows(false)}>
            <FaArrowLeft /> Back
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-4">
            {filteredPros
              .map((item) => (
                <div  key={item._id}  
                onClick={()=>goProfile(item._id)}
                >
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700">
                  <div className="flex justify-end px-4 pt-4"></div>
                  <div className="flex flex-col items-center pb-10">
                    {item.profilePic ? (
                      <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={`${userAPI}/images/` + item.profilePic}                        alt="Bonnie image"
                      />
                    ) : (
                      <ProfilePics />
                    )}
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">
                      {item.name}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.location}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.phone}
                    </span>
                   
                  </div>
                  <div className="flex justify-evenly pb-3">
                    <div>
                    <p className="text-center">{postSize(item._id)}</p>
                    <p>posts</p>
                    </div>
                    <div>
                        <p className="text-center">{item.following.length}</p>
                    <p>followers</p>
                    </div>
                    <div>
                    <p className="text-center">0</p>
                    <p>Reviews</p>
                    </div>
                    <div className="">
                    <p className="text-center">{HiredSize(item._id)}</p>
                    <p>Hire</p>
                    </div>
                   
                  </div>
                </div>
                </div>
              ))}
          </div>
        </div>
      {/* </section> */}
    </div>
  );
};

export default ProsCard;
