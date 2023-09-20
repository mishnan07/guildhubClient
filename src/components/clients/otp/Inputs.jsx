import React, { useState } from 'react';
import VerifyModal from './VerifyModal';

const Inputs = () => {
  const [verify, setVerify] = useState(false);
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);

  const handleSendOTP = () => {
    const modalCheckbox = document.getElementById("my_modal_6");
  modalCheckbox.checked = true;
    setOpen(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
      />
      <button
        onClick={handleSendOTP} // Corrected the onClick handler
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Send OTP
      </button>
     
          <VerifyModal mobile={setVerify} phoneno={phone} />
       
   
    </div>
  );
};

export default Inputs;
