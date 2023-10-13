import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import { useSelector } from "react-redux";


import Signin from '../Component/AdminComponent/Login/Signin'
import Home from '../PageClients/Admin/Home'
import Category from '../PageClients/Admin/Category';
import HomeOwners from '../PageClients/Admin/UserList'
import ReportedPost from '../PageClients/Admin/ReportedPost'

const AdminRoute = () => {
  const isAuth = useSelector((state) => state.AdminAuth.Token);
  return (
    <div>
        <Routes>
            <Route path='/login' element={isAuth?<Navigate to='/admin/home'/>:<Signin />} />
            <Route path='/home' element={isAuth?<Home />:<Navigate to='/admin/login'/>}/>
            <Route path='/category' element={isAuth?<Category />:<Navigate to='/admin/login'/>}/>
            <Route path='/homeOwners' element={isAuth?<HomeOwners />:<Navigate to='/admin/login'/>}/>
            <Route path='/reportedPost' element={isAuth?<ReportedPost />:<Navigate to='/admin/login'/>}/>
        </Routes>
       
      
    </div>
  )
}

export default AdminRoute
