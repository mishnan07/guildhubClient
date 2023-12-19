import React, { useEffect, useState } from "react";
import CreateUserInstance from '../../../Axios/userAxios';
import CreateProInstance from "../../../Axios/proAxios";
import { userAPI } from "../../../Constants/Api";
import { FaDollarSign, FaMapMarkerAlt, FaThumbsUp, FaUser } from "react-icons/fa"; // Import icons
import {io} from 'socket.io-client'
import { userAPI } from "../../../Constants/Api";


const RequirementShow = ({
  Type,
  user,
  show,
  setInterstedPro,
  setRequirementId,
  setHiredPros,
  profileId,
  specific,
  setRequirementLength
}) => {
  const [requirement, setRequirement] = useState([]);
  const [users, setUsers] = useState([]);
  const userInstance = CreateUserInstance()
  const proInstance = CreateProInstance()
  const Axios = Type==='users'?userInstance:proInstance

  const socket = io.connect(userAPI)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/requirement");
        console.log(response.data.users);
        setRequirement(response.data.response);
        setUsers(response.data.users);

        if (specific) {
         
          const req=  response.data.response.filter((item) =>
            item.userId === specific
          );

          setRequirement(req)
          setRequirementLength(req.length)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  const userName = (userID) => {
    console.log(userID);
    const foundUser = users.find((user) => user._id === userID);
    return foundUser ? foundUser.name : false;
  };

  const location = (proId) => {
    const foundPro = users.find((pro) => pro._id === proId);
    return foundPro ? foundPro.location : "User Name";
  };

  const Interested = async (userId, requirementId) => {
    try {
      console.log(userId);
      const response = await Axios.post("/intersted", {
        userId,
        requirementId,
      });
      if(response.data.message  === 'Successful'){
        socket.emit('notification',response.data.recieverId,requirementId,userId,Type,'RequirementIntersted')
      }
    } catch (error) {}
  };

  const details = (pros, userId, requirementId, hiredPros) => {
    if (userId === user._id) {
      show(true);
      setInterstedPro(pros);
      setRequirementId(requirementId);
      setHiredPros(hiredPros);
    }
  };

  return (
    <div>
      {/* <section className="bg-white overflow-scroll h-screen"> */}
      <div className="container mx-auto z-50">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 p-4">
          {requirement.map((item) => (
            <div
              className="bg-gray-100 border border-gray-300 p-4 rounded-md shadow-md hover:shadow-lg"
              key={item._id}
            >
              {profileId ? <h1 className="text-green-800 text-">Hired</h1> : ""}
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                {item.requirement}
              </h2>

              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2">
                    <FaDollarSign className="text-gray-700" />
                    <p className="text-gray-700 text-md">
                      Budget: ${item.budget}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 ">
                    <FaMapMarkerAlt className="text-gray-700 text-md" />
                    <p className="text-gray-700">Location: {item.location}</p>
                  </div>
                </div>

                {item.image &&
                  <img
                    src={`${userAPI}/images/` + item.image}
                    alt={item._id}
                    className="max-h-20  rounded-lg mr-5"
                  />
               }
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <FaUser className="text-gray-700" />
                <p className="text-gray-700">
                  Posted by: {userName(item.userId)}
                </p>
                <p className="text-gray-700"> {location(item.userId)}</p>
              </div>
              <div className="mt-4">
                {Type === "users" ? (
                  <button
                    onClick={() =>
                      details(
                        item.interesteds,
                        item.userId,
                        item._id,
                        item.hired
                      )
                    }
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                  >
                    ❤️{item.interesteds.length} Professionals interested
                  </button>
                ) : (
                  ""
                )}
                {Type === "professional" ? (
                  <button
                    onClick={() => Interested(user._id, item._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                  >
                    ❤️ 
                I am interested
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* </section> */}
    </div>
  );
};

export default RequirementShow;
