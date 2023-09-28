import React, { useEffect, useState } from "react";
import userInstance from "../../../Axios/userAxios";
import ProfilePics from "../../clients/Profile/ProfilePics";
import { FaArrowLeft } from "react-icons/fa";
import { userAPI } from "../../../Constants/Api";
import {io} from 'socket.io-client'
import { useRef } from "react";
import ProfilePic from "../../clients/ProfilePic/ProfilePic";
import { useLocation, useNavigate } from "react-router-dom";

const ProCards = ({ interstPro, setShow, requirementId, no }) => {
  const [requirement, setRequirement] = useState([]);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);
  const [resId, setResId] = useState("");
  const [hiredPros, setHiredPros] = useState([]);
  const [change,setChange] = useState(false)

  const navigate = useNavigate()
  const location = useLocation();
  const Type = location.pathname.includes('professional') ? 'professional' : 'users';


  const socket = io.connect('http://localhost:3000')
  socket.emit('connected','hiringggggg')

  const aa = pros.filter((pro) => interstPro.includes(pro._id));
  const Hire = async () => {
    try {
      const response = await userInstance.get(`/hiredPros/${requirementId}`);
      if (response.status === 200) {
        setHiredPros(response.data.hiredPro);
        setIsOpen1(true);
      }
    } catch (error) {}
  };
  useEffect(() => {
    console.log(aa, "llllllllllllllp=====");

    Hire();
    const fetchData = async () => {
      try {
        const response = await userInstance.get("/requirement");
        setRequirement(response.data.response);
        setUsers(response.data.users);
        setPros(response.data.pros);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [state]);

  const Hiring = async (userId) => {
    socket.emit('some','cccccccccccccc')
     const ttype='users'
    try {
      const response = await userInstance.post("/hiring", {
        userId,
        requirementId,
      });
      if (response.status === 200) {

        socket.emit('notification',userId,requirementId,response.data.senderId,ttype,'Hiring')
        setResId(userId);
        setState(!state);

      }
    } catch (error) {
      console.log(error,'errrrrrrrrr---');
    }
  };

  const goMessage = (receiverId,name)=>{

    if(Type === 'professional'){
      navigate(`/professional/message?id=${receiverId}&goMessage='goMessage'&name=${name}`);
    }else if(Type === 'users'){
      navigate(`/message?id=${receiverId}&name=${name}`);
    }
  }

  return (
    <div>
      {/* <section className="bg-white overflow-scroll h-screen"> */}
      <div className="container mx-auto">
        {no !== "no" && (
          <button className="p-2" onClick={() => setShow(false)}>
            <FaArrowLeft /> Back
          </button>
        )}
        <div
          className={
            no !== "no" &&
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-4"
          }
        >
          {pros
            .filter((pro) => interstPro.includes(pro._id))
            .map((item) => (
              <div
                key={item._id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700"
              >
                <div className="flex justify-end px-4 pt-4"></div>
                <div className="flex flex-col items-center pb-10">
                  {item.profilePic ? (
                    <ProfilePic UserId={item._id} value="pic" />
                  ) : (
                    <ProfilePic UserId={item._id} value="pic" />
                  )}
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">
                    {item.name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.phone}
                  </span>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    {hiredPros?.includes(item._id) ? (
                      <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-green-800 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-700 dark:focus:ring-green-700">
                        Hired
                      </button>
                    ) : (
                      <button
                        onClick={() => Hiring(item._id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800"
                      >
                        Hire
                      </button>
                    )}

                    <button
                    onClick={()=>goMessage(item._id,item.name)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    >
                      Message
                    </button>
                    <button  >
                     
                    </button>
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

export default ProCards;
