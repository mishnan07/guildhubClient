import React, { useState } from 'react';
import CreateUserInstance from '../../../Axios/userAxios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PhoneSignin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationSid, setVerificationSid] = useState(null);
  const userInstance = CreateUserInstance()
  const sendOtp = async () => {
    try {
      const response = await userInstance.post('/sendOtp', {
        phoneNumber: phoneNumber,
      });
      if (response.data.success) {
        setVerificationSid(response.data.otpResponse.sid);
        toast.success('OTP sent successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await userInstance.post('/verifyOtp', {
        verificationSid: verificationSid,
        otp: otp,
        phoneNumber: phoneNumber,
      });
      if (response.data.success) {
        toast.success('OTP verified successfully');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error verifying OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4">OTP Login</h2>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
        />
        <button
          onClick={sendOtp}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Send OTP
        </button>
        {verificationSid && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 my-4"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Verify OTP
            </button>
          </>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default PhoneSignin;
