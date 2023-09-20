import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import { useSelector } from "react-redux";


import AddCategory from '../components/admin/category/AddCategory'
import Signin from '../components/admin/login/Signin'
import Home from '../pages/Admin/Home'
import Category from '../pages/Admin/Category'
import HomeOwners from '../pages/Admin/UserList'
import ReportedPost from '../pages/Admin/ReportedPost'

const AdminRoute = () => {
  const isAuth = useSelector((state) => state.AdminAuth.Token);
console.log(isAuth,'issssssssssssss');
  return (
    <div>
        <Routes>
            <Route path='/addCategory' element={isAuth?<AddCategory />:<Navigate to='/admin/login'/>}   />
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
