import React from 'react'
import Header from '../../Component/AdminComponent/Header/Header'
import Sidebar from '../../Component/AdminComponent/SideBars/Sidebar'
import CategoeyTable from '../../Component/AdminComponent/Category/CategoeyTable'


const Category = () => {


  return (
    <div>
      <Header />
      <div className='flex  '>
      <Sidebar />
        <div className='w-full p-3'>
        <CategoeyTable />
        </div>
      </div>
      
    </div>
  )
}

export default Category
