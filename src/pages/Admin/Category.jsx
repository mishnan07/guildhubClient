import React from 'react'
import Header from '../../components/admin/Header/Header'
import Sidebar from '../../components/admin/sidebars/Sidebar'
import CategoeyTable from '../../components/admin/category/CategoeyTable'


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
