import React, { useEffect, useState } from "react";
import userInstance from "../../../Axios/userAxios";
import ProfilePics from "../../clients/Profile/ProfilePics";
import { FaArrowLeft } from "react-icons/fa";
import { userAPI } from "../../../Constants/Api";

import { useRef } from "react";

const ProCards = ({ interstPro, setShow, requirementId, hiredPros }) => {
  const [requirement, setRequirement] = useState([]);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state,setState] =useState()

  const hireButtonRef = useRef(null);

const aa  = pros.filter((pro) => interstPro.includes(pro._id))
console.log(aa,'llllllllllllllp=====');
  useEffect(() => {
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
  }, []);

  const Hiring = async (userId) => {
    const reff = hireButtonRef.current
    if(reff){
        console.log('keeeririirriirrii')
        reff.classList.toggle('text-gray-900')
        reff.classList.toggle('text-red-900')

    }
  try {
    const response = await userInstance.post('/hiring', { userId, requirementId });

  } catch (error) {
    
  }
  };

  return (
    <div>
      {/* <section className="bg-white overflow-scroll h-screen"> */}
        <div className="container mx-auto">
          <button className="p-2" onClick={() => setShow(false)}>
            <FaArrowLeft /> Back
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-4">
            {pros
              .filter((pro) => interstPro.includes(pro._id))
              .map((item) => (
                <div key={item._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700">
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
                      {item.phone}
                    </span>
                    <div className="flex mt-4 space-x-3 md:mt-6" >
                      {!hiredPros.includes(item._id) ? (
                        <a
                          href="#"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800"
                          onClick={() => Hiring(item._id)}
                        >
                          Hire
                        </a>
                      ) : (
                        <a
                         ref={hireButtonRef}
                          href="#"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-green-800 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-700 dark:focus:ring-green-700"
                        >
                          Hired
                        </a>
                      )}
                      <a
                     
                        href="#"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      >
                        Message
                      </a>
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
