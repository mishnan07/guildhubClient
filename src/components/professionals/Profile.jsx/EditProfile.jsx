import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import proAxios from "../../../Axios/proAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePictureUpload from "./ProfilePictureUpload";
import userInstance from "../../../Axios/userAxios";

const EditProfile = ({ user, Type }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [category, setCategory] = useState("");

  const [allCategory, setAllCAtegory] = useState([]);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    proAxios.get("/getCategory").then((res) => {
      const getCategory = res.data.category;
      console.log(getCategory, "lll++==");
      setAllCAtegory(getCategory);
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setLocation(user.location);
      setExperience(user.experiance);
      setCategory(user.category);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = (email) => {
      // Basic email format validation using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const phoneAsString = String(phone).trim();
    if (name.trim().length === 0) {
      return showErrorMessage("Please enter your name");
    } else if (email.trim().length === 0) {
      return showErrorMessage("Please enter email");
    } else if (!isValidEmail(email)) {
      return showErrorMessage("Please enter a valid email");
    } else if (phoneAsString.trim().length === 0) {
      return showErrorMessage("Please enter phone number");
    } else if (!/^\d{10}$/.test(phoneAsString)) {
      return showErrorMessage("Please enter a valid 10-digit phone number");
    } else if (!/^[0-9]+$/.test(phoneAsString)) {
      return showErrorMessage(
        "Please enter a valid phone number (numbers only)"
      );
    } else if (location.trim().length === 0) {
      return showErrorMessage("Please enter location");
    } else
      userInstance
        .post("/editProfile", {
          name,
          email,
          phone,
          location,
          category,
          experience,
          Type,
        })
        .then((res) => {
            console.log(res.data);
            showToastMessage(res.data.message)
            console.log("registered sucesssssss");
          
        }).catch(()=>{
            setErrMsg("something went wrong");
        })
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
    });
  };
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000
    });
  };

  const backgroundImageUrl = "/images/model-house-project-blueprints.jpg"; // Path to your image

  return (
    <>
      <div className="h-screen md:flex justify-center items-center">
        {/* <div style={{ backgroundImage: `url('${backgroundImageUrl}')` }}></div> */}

        {/* <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div></div>
          <div className="flex flex-col md:flex-row justify-between items-center py-8 px-16 bg-gradient-to-r from-blue-800 to-purple-700">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-white font-bold text-4xl font-sans mb-4">
                India's Largest Home Community
              </h1>
              <div className="flex flex-row items-center">
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2l1.596 5.178H19.3l-4.297 3.316 1.596 5.177L12 13.156l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2zm0 18l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2l1.596 5.178h5.704l-4.297 3.316 1.596 5.177L12 13.156z"
                    />
                  </svg>
                </div>
                <p className="text-white">Find Design</p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2l1.596 5.178H19.3l-4.297 3.316 1.596 5.177L12 13.156l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2zm0 18l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2l1.596 5.178h5.704l-4.297 3.316 1.596 5.177L12 13.156z"
                    />
                  </svg>
                </div>
                <p className="text-white">Find Professionals</p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2l1.596 5.178H19.3l-4.297 3.316 1.596 5.177L12 13.156l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2zm0 18l-4.598 3.515 1.596-5.177-4.297-3.316h5.704L12 2l1.596 5.178h5.704l-4.297 3.316 1.596 5.177L12 13.156z"
                    />
                  </svg>
                </div>
                <p className="text-white">Ask Queries</p>
              </div>
            </div>
            <div className="md:w-1/2"></div>
          </div>

          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div> */}

        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form onSubmit={handleSubmit} method="POST" className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1"></h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Edit Profile
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type="text"
                id="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="Full name"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="email"
                id="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                placeholder="Email"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2zm4 0v16"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type="text"
                id="phone"
                name="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                placeholder="Phone"
              />
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 22s8-10 8-14a8 8 0 10-16 0c0 4 8 14 8 14z"
                />
                <circle cx="12" cy="10" r="3" />
              </svg>

              <input
                className="pl-2 outline-none border-none"
                type="text"
                id="location"
                name="location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                value={location}
                placeholder="Location"
              />
            </div>
            {Type === "professional" ? (
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4m6 0h-2m-2 0V1a1 1 0 00-1-1H8a1 1 0 00-1 1v2m10 0V1a1 1 0 00-1-1h-2a1 1 0 00-1 1v2m-7 9a3 3 0 113-3 3 3 0 01-3 3zm0 0h2m2 0h2m-2 0a5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5 5 5 0 01-5 5z"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  id="experience"
                  name="experience"
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                  value={experience}
                  placeholder="Number of experience"
                />
              </div>
            ) : (
              ""
            )}
            {Type === "professional" ? (
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <select
                  className="pl-2 outline-none border-none"
                  id="category"
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">Select a category</option>
                  {allCategory.map((item) => (
                    <option key={item._id} value={item.categoryName}>
                      {item.categoryName}
                    </option>
                  ))}

                  {/* Add more options as needed */}
                </select>
              </div>
            ) : (
              ""
            )}
            <div className="ml-14">
              <ToastContainer />{" "}
              {/* ToastContainer for showing success message */}
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
