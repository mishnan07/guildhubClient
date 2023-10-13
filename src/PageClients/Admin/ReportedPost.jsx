import React, { useState } from 'react';
import Header from '../../Component/AdminComponent/Header/Header';
import Sidebar from '../../Component/AdminComponent/SideBars/Sidebar';
import ReportedPosts from '../../Component/AdminComponent/Posts/ReportedPost';
const ReportedPost = () => {
  return (
    <div>
    <Header />
    <div className='flex flex-col md:flex-row'>
      <Sidebar className='w-full md:w-1/4 lg:w-1/5' />
      <div className='w-full' >
      <ReportedPosts />
      </div>
    </div>
  </div>
  )
}

export default ReportedPost
