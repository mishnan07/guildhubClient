import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateUserInstance from '../../../Axios/userAxios';
import { useNavigate } from 'react-router-dom';


const ResetPass = ({phone,value}) => {
    const [newPassword,setNewPassword] = useState('')
    const [repeatePassword,setRepeatePassword] = useState('')
    const userAxios = CreateUserInstance()
    const navigate = useNavigate()

    const resetPassword = async () => {
        try {
       
    
          const response = await userAxios.post('/resetPassword', { phone, newPassword });
          if (response.data.success) {
            toast.success('Password changed successfully');
            navigate('/login')
          }
        } catch (error) {
          console.error('Error resetting password:', error);
          toast.error('An error occurred while resetting the password');
        }
      };
   
  return (
    <div>
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
      <ToastContainer />

        <h2 className="text-2xl font-semibold mb-4">{value}</h2>
        <input
          type="text"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
        />

         <input
          type="text"
          placeholder="Repeate password"
          value={repeatePassword}
          onChange={(e) => setRepeatePassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
        />
        <button
          onClick={()=>resetPassword()}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          save
        </button>
        </div>
        /</div>
    </div>
  )
}

export default ResetPass
