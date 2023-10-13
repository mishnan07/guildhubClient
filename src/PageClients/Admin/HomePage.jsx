import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/admin/sidebars/Sidebar'
import Header from '../../components/admin/Header/Header'



const HomePage = () => {


  return (
   


<div>
<Header />
<div className='flex  '>
<Sidebar />
  <div className='w-full p-3'>
  </div>
</div>

</div>
  )
}

export default HomePage
