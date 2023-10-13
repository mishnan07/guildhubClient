import React from 'react';
import NavButton from './NavButton';

const Nav = ({setShow}) => {
  return (
    <>

<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white shadow-lg py-2 text-gray-800 dark:bg-neutral-600">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-4">
          <div>
            <a href="/" className="flex items-center text-gray-800 dark:text-neutral-200 hover:text-gray-900">
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                alt="TE Logo"
                className="w-6 h-6 mr-2"
              />
              GuildHub
            </a>
          </div>
          <button
            className="block lg:hidden text-gray-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent4"
            aria-controls="navbarSupportedContent4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className="hidden lg:flex lg:items-center"
            id="navbarSupportedContent4"
            data-te-collapse-item
          >
            <ul className="list-none lg:flex space-x-4">
             
            </ul>
            <div className="flex items-center space-x-4 ml-4">
              <button onClick={()=>setShow(true)}
                type="button"
                className="px-3 py-2 text-xs font-medium text-white uppercase bg-primary border rounded hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-600 active:bg-primary-700"
              >
                Login
              </button>
             
              <NavButton />
             



            </div>
          </div>
        </div>
      </div>
      
    </nav>
    
    
    
    </>


    
  );
};

export default Nav;
