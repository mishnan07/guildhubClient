import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../../Redux/AdminAuth.js';
import adminAxios from '../../../Axios/adminAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (email.trim().length === 0) {
      return showErrorMessage('Please enter email');
    } else if (!isValidEmail(email)) {
      return showErrorMessage('Please enter a valid email');
    } else if (password.length === 0) {
      return showErrorMessage('Please enter password');
    } else if (password.length < 6) {
      return showErrorMessage('Password should be at least 6 characters');
    }

    try {
      const response = await adminAxios.post('/login', { email, password });
      const { token, check } = response.data;

      if (check) {
        dispatch(adminLogin({ token: token }));
        navigate('/admin/home');
      } else {
        showErrorMessage('Unauthorized login');
      }
    } catch (error) {
      console.log('Error:', error);
      showErrorMessage('An error occurred during login');
    }
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
        <div>
          <ToastContainer /> {/* ToastContainer for showing success message */}
        </div>
      </div>
    </div>
  );
};

export default Signin;
