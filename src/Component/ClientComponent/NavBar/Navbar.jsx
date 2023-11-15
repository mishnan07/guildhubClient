import React, { useEffect, useState } from "react";
import Follow from "../Follow/Follow";
import CustomModal from "../../ClientComponent/Modal/CustomModal";
import { useSelector } from "react-redux";
import Buttun from "./Buttun";
import { FaBell } from "react-icons/fa";


const Navbar = ({Type,user}) => {

const [modalIsOpen, setModalIsOpen] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const userId = useSelector((state)=>  Type ==='users' ?state.ClientAuth.Id : state.proAuth.Id)



let token
let home
let community
let profile1
let hire
let message
let goNotificaion
 if( Type === 'users'){
    // token = useSelector((state)=>state.proAuth.Token)
    home ='/home'
    community='/community'
    profile1='/profile'
    hire = '/hire'
    message='/message'
    goNotificaion='/notification'
 }else if('professional')  {
    // token = useSelector((state)=>state.proAuth.Token)
    home = '/professional/home'
    community='/professional/community'
    profile1='/professional/profile'
    hire='/professional/hire'
    message='/professional/message'
    goNotificaion='/professional/notification'

 }
 

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

    const profile = '/images/user_149071.png'


  return (
   
    <div>

           
<nav 
className="  dark:bg-purple-500 fixed w-full z-20 top-0 left-0 border-b border-gray-200  bg-gradient-to-r from-blue-500 to-purple-500">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4  from-purple-500 to-purple-500">
  <a href="" className="flex items-center">
      {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"/> */}
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GUILD HUB</span>
  </a>
  <div className="flex md:order-2">
      {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button> */}
      <button
  data-collapse-toggle="navbar-sticky"
  type="button"
  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  aria-controls="navbar-sticky"
  aria-expanded={menuOpen}
  onClick={() => setMenuOpen(!menuOpen)} // Toggle the menuOpen state
>        
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
   <a href={goNotificaion}> <FaBell size={24} color="blue" className="mr-3" /> </a>

    <Buttun Type={Type} profile1={profile1}/>
    {/* <img src={notification} className="h-8 mr-3" alt="Flowbite Logo"/> */}
    {/* <a href={profile1}><img onClick={profile1} src={profile} className="h-8 mr-3" alt="Flowbite Logo"/></a> */}
  </div>
  <div className={`items-center justify-between ${!menuOpen?'hidden':''}    w-full md:flex md:w-auto md:order-1" id="navbar-sticky`}>
    <ul className="flex flex-col  text-black-900 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
      <li>
      <a  href={home} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white-700 md:p-0 md:dark:hover:text-white-500 dark:text-slate-950 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
      </li>
      <li>
        <a href={community} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white-700 md:p-0 md:dark:hover:text-white-500 dark:text-slate-950 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Community</a>
      </li>
      <li>
        <a href={hire} className="block py-2 pl-3 pr-4 text-gray-900 rounded  dark:text-slate-950 md:hover:bg-transparent md:hover:text-white-700 md:p-0 md:dark:hover:text-white-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">HirePros</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded  dark:text-slate-950 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white-700 md:p-0 md:dark:hover:text-white-500  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"  onClick={openModal}>Follow</a>
      </li>
      <li>
        <a href={message} className="block py-2 pl-3 pr-4 text-gray-900 rounded  dark:text-slate-950 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white-700 md:p-0 md:dark:hover:text-white-500  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Message</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
<CustomModal isOpen={modalIsOpen} onClose={closeModal}>
       <Follow />
</CustomModal>   

   
    </div>
    
  )
}

export default Navbar
