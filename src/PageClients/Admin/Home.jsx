import React, { useEffect, useState } from 'react'




import Sidebar from '../../Component/AdminComponent/SideBars/Sidebar'
import Header from '../../Component/AdminComponent/Header/Header'
import Dashboard from '../../Component/AdminComponent/AdminDashboard/DashBoard'


const Home = () => {


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
