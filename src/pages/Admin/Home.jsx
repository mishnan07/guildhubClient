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
import { FaChartArea } from 'react-icons/fa'
import Dashboard from '../../components/admin/Dashboard/Dashboard'


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
<Header />
<div className='flex  '>
<Sidebar />
  <div className='w-full p-3'>
  <Dashboard />
  </div>
</div>

</div>
  )
}

export default Home
