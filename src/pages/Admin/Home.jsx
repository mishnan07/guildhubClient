import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import adminAxios from '../../Axios/adminAxios'
import { useNavigate } from 'react-router-dom'
import Post from '../../components/professionals/post/Post'
import CustomModal from '../../components/modal/CustomModal'

import ImageUpload from '../../components/professionals/post/ImageUpload'
import CreateCategory from '../../components/admin/category/CreateCategory'
import { adminLogout } from '../../Redux/AdminAuth'
import Sidebar from '../../components/admin/sidebars/Sidebar'
import Header from '../../components/admin/Header/Header'
import Report from '../../components/clients/MiddleContent/Report'
import LocationSearchInput from '../../components/clients/LocationSearchInput'
import RequirementShow from '../../components/clients/requirement/RequirementShow'
import ChatMessages from '../../components/clients/chatMessage/ChatMessage'


const Home = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
   const token = useSelector((state)=>state.AdminAuth.Token)
   console.log(token,'loploplop');
    // useEffect(()=>{
    //   console.log(token,'vvvvvvvvvvv');
    //   if(token){
    //     console.log('sucessfull');
    //   }else{
    //     navigate('/admin/login')
    //   }
    // })
 

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
    const hadleLogout = () => {
      dispatch(adminLogout());
      navigate("/admin/login");
    };
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* <h1>admin home</h1> */}
      <div>
      {/* <h1>React Modal Example</h1>
      <button onClick={openModal}>Open Modal</button> */}
{/* 
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <ImageUpload />
      </CustomModal> */}
    </div>
   
 


    <Header />

    <Sidebar />
  


<ChatMessages/>


    </div>
  )
}

export default Home
