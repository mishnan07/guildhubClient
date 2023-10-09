import React, { useState } from 'react';
import CreateUserInstance from '../../../Axios/userAxios';
import CreateProInstance from '../../../Axios/proAxios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";


const Report = ({item,user,Type,setReportOpen}) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [errMsg,setErrMsg] = useState('')
  

  const reportedReasons = [
    'Spam',
    'Inappropriate Content',
    'Misinformation',
    'Harassment',
    'Violence',
    'Fake Account',
    'Other',
  ];

  const postId = item?item._id:''
  const userId = user?user._id:''
  const userType = Type?Type:''

  const showToastMessage = () => {
    toast.success("Success!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000
    });
  };
  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000
    });
  };


   
let token
if( Type === 'users'){
   token = useSelector((state)=>state.proAuth.Token)
}else if('professional')  {
   token = useSelector((state)=>state.proAuth.Token)
}

const userAxios = CreateUserInstance()
const proAxios = CreateProInstance()

const Axios = Type === 'users'?userAxios:proAxios
  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const submitReport = async()=>{
try {
    if(selectedReason.length === 0){
       return showErrorMessage('plese select anyone')
    }
   const response = await Axios.post('/report',
                   {postId,userId,userType,selectedReason},
                   )
   showToastMessage(response.data.message)
   setTimeout(() => {
    setReportOpen(false);
  }, 2000);
} catch (error) {
    console.log('erooor');
}
  }

  console.log('sel',selectedReason);

  return (
    <div className="relative">
 
      <div
        className="z-10 bg-white divide-y divide-gray-200 rounded-lg shadow w-60 dark:bg-white-700 dark:divide-white-600 absolute right-0 mt-2 md:mt-0 lg:right-10 -bottom-8"
        style={{
          transform: 'translate3d(0, 100%, 0px)',
        }}
      >
        <ul className="p-3 space-y-2  text-sm text-black-700 dark:text-gray-200">
          {reportedReasons.map((reason, index) => (
            <li
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-white-600 p-2 rounded cursor-pointer"
            >
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportedReason"
                  value={reason}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                  checked={selectedReason === reason}
                  onChange={handleReasonChange}
                />
                <span className="font-medium text-gray-900 dark:text-gray-700">
                  {reason}
                </span>
              </label>
              {/* Add any additional details or instructions here */}
            </li>
          ))}
        </ul>

        <button
        onClick={submitReport}
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 ml-4 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Submit
        </button>

        <button
        onClick={()=>    setReportOpen(false)
        }
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 ml-4 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Cancel
        </button>

        {/* <ToastContainer />  */}

      </div>
    </div>
  );
};

export default Report;
