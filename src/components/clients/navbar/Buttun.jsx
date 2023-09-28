import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClientLogout } from '../../../Redux/ClientAuth';
import { proLogOut } from '../../../Redux/proAuth';
import ProfilePic from '../ProfilePic/ProfilePic';
const Buttun = ({Type,profile1}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const id = useSelector((state) => (Type === 'users' ? state.ClientAuth.Id : state.proAuth.Id));


        const hadleLogout = () => {
            if(Type === 'users'){
                dispatch(ClientLogout());
                navigate("/login");
            }else if (Type === 'professional'){
                dispatch(proLogOut());
                navigate("/professional/login");
            }
  
        }
   
  return (
    <div>
      <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-8 h-8 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
        >
          <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" alt="User Profile" />
        </button>

         {/* Button to close the dropdown when clicking outside */}
         {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="h-full w-full fixed inset-0 cursor-default"
          ></button>
        )}
        {/* Dropdown content */}
        {isOpen && (
          <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-10 mr-4">
            {/* <a href="#" className="block px-4 py-2 account-link hover:text-white">
              Account
            </a> */}
            <a  className="block px-4 py-2 account-link hover:text-white">
              <ProfilePic UserId={id} value='pic'/>
              Profile
            </a>
            <a href="" className="block px-4 py-2 account-link hover:text-white" onClick={hadleLogout}>
              Sign Out
            </a>
          </div>
        )}
    </div>
  )
}

export default Buttun
