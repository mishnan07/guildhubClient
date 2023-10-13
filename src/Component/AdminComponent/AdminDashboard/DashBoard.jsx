import React from 'react';
import LineChartComponent from './LineChartComponent';
import { FaHardHat, FaUser, FaUserTie } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-3 md:grid-cols-3 gap-4 p-4'>
        {/* Total Users */}
        <div className='bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center'>
          <FaUser className='text-7xl mb-2' />
          <h2 className='text-xl font-bold mb-2'>Total Users</h2>
          <p className='text-3xl font-extrabold'>500</p>
        </div>

        {/* Homeowners */}
        <div className='bg-green-500 text-white p-4 rounded-lg shadow-lg text-center'>
          <FaUserTie className='text-7xl mb-2' />
          <h2 className='text-xl font-bold mb-2'>Homeowners</h2>
          <p className='text-3xl font-extrabold'>250</p>
        </div>

        {/* Professionals */}
        <div className='bg-yellow-500 text-white p-4 rounded-lg shadow-lg text-center'>
          <FaHardHat className='text-7xl mb-2' />
          <h2 className='text-xl font-bold mb-2'>Professionals</h2>
          <p className='text-3xl font-extrabold'>250</p>
        </div>
      </div>
      
      <div className=' sm:w-1/2 md:w-full'>
        <h3 className='py-10 ml-10'>New Users</h3>
      <LineChartComponent />
      
      </div>
    </div>
  );
}

export default Dashboard;
