import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../Redux/AdminAuth';

const Header = () => {
  // Use state to control the visibility of the dropdown
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hadleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  return (
    <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
      <div className="w-1/2"></div>
      <div className="relative w-1/2 flex justify-end">
        {/* Button to toggle the dropdown */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
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
          <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 z-50">
            <a href="#" className="block px-4 py-2 account-link hover:text-white">
              Account
            </a>
            <a href="#" className="block px-4 py-2 account-link hover:text-white">
              Support
            </a>
            <a href="" className="block px-4 py-2 account-link hover:text-white" onClick={hadleLogout}>
              Sign Out
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
