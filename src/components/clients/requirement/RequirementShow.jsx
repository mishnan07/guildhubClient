import React, { useEffect, useState } from "react";
import userInstance from "../../../Axios/userAxios";
import { userAPI } from "../../../Constants/Api";
import { FaDollarSign, FaMapMarkerAlt, FaUser } from "react-icons/fa"; // Import icons
import proAxios from "../../../Axios/proAxios";
const RequirementShow = ({
  Type,
  user,
  show,
  setInterstedPro,
  setRequirementId,
  setHiredPros,
  profileId,
}) => {
  const [requirement, setRequirement] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get("/requirement");
        console.log(response.data.users);
        setRequirement(response.data.response);
        setUsers(response.data.users);

        if (profileId) {
          setRequirement(
            response.data.response.filter((item) =>
              item.hired.includes(profileId)
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(Type, "=========================0");

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
      const response = await proAxios.post("/intersted", {
        userId,
        requirementId,
      });
      console.log(response.data.message, "===========");
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
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-4">
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

                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-700 text-md" />
                    <p className="text-gray-700">Location: {item.location}</p>
                  </div>
                </div>

                {item.image ? (
                  <img
                    src={`${userAPI}/images/` + item.image}
                    alt={item._id}
                    className="max-h-20 rounded-lg"
                  />
                ) : (
                  ""
                )}
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
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full"
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
                    ❤️ I am interested
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
