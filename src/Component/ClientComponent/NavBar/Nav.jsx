import React, { useState } from 'react';
import NavButton from './NavButton';

const Nav = ({setShow}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>

<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white shadow-lg py-2 text-gray-800 dark:bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-4">
          <div className='relative'>
            <a href="/" className="flex items-center text-gray-800 dark:text-black hover:text-gray-900">
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                alt="TE Logo"
                className="w-6 h-6 mr-2"
              />
              GuildHub
            </a>
          </div>
  

         
        
   
       <div
            className=" lg:flex lg:items-center"
            id="navbarSupportedContent4"
            data-te-collapse-item
          >
            <ul className="list-none lg:flex space-x-4">
             
            </ul>
            <div className="flex items-center space-x-4 ml-4">
              <button onClick={()=>setShow(true)}
                type="button"
                className="px-3 py-2 text-xs font-medium text-black uppercase bg-primary border-2 rounded hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-600 active:bg-primary-700"
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
