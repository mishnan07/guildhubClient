import React, { useState } from 'react';
import Header from '../../Component/AdminComponent/Header/Header';
import Sidebar from '../../Component/AdminComponent/SideBars/Sidebar';
import UsersList from '../../Component/AdminComponent/users/UsersList';

const HomeOwners = () => {
    const [userType,setUserType] = useState('owner')
    const handleUser =(user)=>{
          setUserType(user)
    }
return(
  <div>
    <Header />


    <div className='flex flex-col md:flex-row'>
      <Sidebar className='w-full md:w-1/4 lg:w-1/5' />
      <div className='w-full' >
        <div className='flex justify-center p-1 '>
            <button className='bg-zinc-50 rounded p-1 mr-3' onClick={()=>handleUser('owner')}>Home Owners</button>
            <button className='bg-zinc-50 rounded p-1' onClick={()=>handleUser('pro')}>Professionals</button>
        </div>
      <UsersList userType={userType}  className='w-full md:w-3/4 lg:w-4/5' />

      </div>
    </div>
  </div>
);
}
export default HomeOwners;
