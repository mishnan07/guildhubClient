import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateUserInstance from '../../../Axios/UserAxios';
import CreateProInstance from "../../../Axios/ProAxios";
import { userAPI } from "../../../Constants/Api";

const ProfilePic = ({ UserId, value }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const userType = location.pathname.includes('professional') ? 'professional' : 'users';
  const userInstance = CreateUserInstance()
  const proInstance = CreateProInstance()
 
  const Axios = userType === 'users' ?userInstance :proInstance
  const token = useSelector((state) =>
    userType === 'users' ? state.ClientAuth.Token : state.proAuth.Token
  );

  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const profile = "/images/user_149071.png";

  const fetchPosts = async () => {
    try {
      const response = await Axios.get('/usersAndpros');
      setPros(response.data.pros);
      setUsers(response.data.users);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const details = (specificId, value) => {
    let idExists = pros.find((pro) => pro._id === specificId);

    if (!idExists) {
      idExists = users.find((user) => user._id === specificId);
    }

    if (idExists) {
      if (value === "name") {
        return idExists.name;
      }
      if (value === "pic") {
        return idExists.profilePic;
      }
      if(value === 'location'){
        return  idExists.location;
      }
      if(value === 'category'){
        if(idExists.category){
            return  idExists.category;
        }else{
            return 'Home Owner'
        }
      }
    }
    return "";
  };

  const goProfile = (userId)=>{
    console.log(userId,'kkkkk');
    navigate(`/profilePage?userId=${userId}&LogedUserType=${userType}`)
  }

  return (
    <>
      {value === 'pic' ? (
        <div
        onClick={()=>goProfile(UserId)}
        >
          {details(UserId, value) ? (
            <img
              src={`${userAPI}/images/` + details(UserId, value)}
              alt="user"
              className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600 p-0.5"
            />
          ) : (
            <img
              src={profile}
              alt="user"
              className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600 p-0.5"
            />
          )}
        </div>
      ) : (
        details(UserId, value)
      )}
    </>
  );
};

export default ProfilePic;
