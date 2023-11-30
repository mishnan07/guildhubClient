import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavButton = ({ Type, profile1 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="">
      <div onClick={() => setIsOpen(!isOpen)} className="text-lg cursor-pointer">
        <button
          type="button"
          className="px-3 py-2 text-xs font-medium text-black uppercase bg-primary border-2 rounded hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-600 active:bg-primary-700"
        >
          Sign up
        </button>
      </div>

      {/* Button to close the dropdown when clicking outside */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="h-full w-full fixed inset-0 cursor-default"
        ></button>
      )}
      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute right-1  w-32 bg-white rounded-lg shadow-lg py-2 mt-7">
          <a
            onClick={() => navigate('/professional/register')}
            className="block px-4 py-2 account-link hover:text-white cursor-pointer"
          >
            Professional
          </a>

          <a
            onClick={() => navigate('/register')}
            className="block px-4 py-2 account-link hover:text-white cursor-pointer"
          >
            Home owner
          </a>
        </div>
      )}
    </div>
  );
}

export default NavButton;
