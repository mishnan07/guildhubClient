// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { proLogin, ProId } from "../../../Redux/proAuth.js";
// import CreateProInstance from "../../../Axios/proAxios.js";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Signin = () => {
//   const backgroundImageUrl = "/images/model-house-project-blueprints.jpg"; // Path to your image
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const proAxios = CreateProInstance()

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const isValidEmail = (email) => {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return emailRegex.test(email);
//     };

//     if (email.trim().length === 0) {
//       return showErrorMessage('Please enter email');
//     } else if (!isValidEmail(email)) {
//       return showErrorMessage('Please enter a valid email');
//     } else if (password.length === 0) {
//       return showErrorMessage('Please enter password');
//     } else if (password.length < 6) {
//       return showErrorMessage('Password should be at least 6 characters');
//     }

//     proAxios
//       .post("/login", { email, password })
//       .then((res) => {
//         const result = res.data.userSignUp;
//         if (result.status === true) {
//           const token = result.token;
//           const id = result.id
//           dispatch(proLogin({ token: token }));
//           dispatch(ProId({ id: id }));
//           navigate("/professional/home");
//         } else {
//           showErrorMessage(result.message);
//         }
//       })
//       .catch((res) => {
//         showErrorMessage("User not found");
//       });
//   };

//   const showToastMessage = () => {
//     toast.success("Success!", {
//       position: toast.POSITION.BOTTOM_CENTER,
//       autoClose: 3000,
//     });
//   };

//   const showErrorMessage = (message) => {
//     toast.error(message, {
//       position: toast.POSITION.BOTTOM_CENTER,
//       autoClose: 1000,
//     });
//   };

//   return (
//     <div
//       className="bg-cover bg-center bg-fixed h-screen flex justify-between items-center overflow-hidden"
//       style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
//     >
//       <div className="ml-[4rem] p-8 rounded-lg shadow-lg backdrop-blur-2xl bg-opacity-30 bg-white w-3/5 md:w-2/5 lg:w-[23%]">
//         <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
//           Login to GuildHub
//         </h1>
//         <form method="POST" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               className="block font-semibold text-gray-700 mb-2"
//               htmlFor="email"
//             >
//               Email Address
//             </label>
//             <input
//               className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               type="text"
//               id="email"
//               name="email"
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//               placeholder="Enter your email address"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block font-semibold text-gray-700 mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               type="password"
//               id="password"
//               name="password"
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//               placeholder="Enter your password"
//             />
//             <a
//               className="text-gray-600 hover:text-gray-800"
//               href="/professional/register"
//             >
//               new user? sign up
//             </a>
//           </div>
//           <div>
//             <ToastContainer />{" "}
//             {/* ToastContainer for showing success message */}
//           </div>

//           <div className="mb-6">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//               type="submit"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* <div className=" "> */}

//       <div className="flex flex-col items-center mb-64 mr-56 justify-center h-screen relative ">
//         <div className="text-center text-black text-opacity-80 text-5xl font-semibold leading-[21px] mb-8 md:mb-12">
//           India's Largest <br /> <br></br> Home Community
//         </div>
//         <div className="text-center text-black text-opacity-80 text-xl font-bold leading-[21px] md:flex md:justify-center md:space-x-6">
//           <div className="mb-2 md:mb-0">Find Design</div>
//           <div className="mb-2 md:mb-0">Find Professionals</div>
//           <div className="mb-2 md:mb-0">Ask Queries</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;


<div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" >
<ToastContainer />{" "}

  <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
    <div className="text-white">
      <div className="mb-8 flex flex-col items-center">
        <img src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg" width="150" alt="" srcset="" />
        <h1 className="mb-2 text-2xl">Instagram</h1>
        <span className="text-gray-300">Enter Login Details</span>
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="mb-4 text-lg">
          <input  type="text"
                    id="email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }} className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" placeholder="id@email.com" />
        </div>

        <div className="mb-4 text-lg">
          <input    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }} className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" placeholder="*********" />
        </div>
        <Link to="/forgetPass">
                    <div className="text-xs text-end">
                      <p className="text-red-700">forget password</p>
                    </div>
                  </Link>
        <div className="mt-8 flex justify-center text-lg text-black">
          <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
          <Link to="/otpLogin">
                  <div className="text-xs ">
                    <p>sign in with phone</p>
                  </div>
                </Link>

                <div className="flex justify-center mt-4">
                <Google />
              </div>
        </div>
      </form>
    </div>
  </div>
</div>