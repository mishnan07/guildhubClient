import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import professionalInstance from '../../../Axios/proAxios';
import { userAPI } from "../../../Constants/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePictureUpload = ({ user, Type, state, setState,changeState,close }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const userId = user ? user._id : '';
  const userType = Type ? Type : '';
  const states = state?state:''
  console.log(userId,state,userType,'ssssssssssssssssssss');

  const handleImageSubmit = async () => {
    try {
      if (selectedImage) {
        
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('userId', userId);
        formData.append('userType', userType);

        const response = await professionalInstance.post('/profilePic', formData);

        // Handle the response from the server (e.g., display a success message)
        console.log(response);

        if (response.status === 200) {
            changeState()
          showToastMessage(response.data.message);
        } else {
          showErrorMessage('Image upload failed');
        }
        close()


        // Clear the selected image
// setState(!state)     
 }
    } catch (error) {
      console.error('Error uploading image:', error);
      showErrorMessage('Image upload failed');
    }
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
    });
  };

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Upload Image
      </label>
      <div className="mb-4">
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="imageInput"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <FaCloudUploadAlt className="mr-2" />
          Choose File
        </label>
      </div>
      {selectedImage ? (
        <div className="flex justify-center text-center">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="flex justify-center text-center">
          <img
            className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
            src={`${userAPI}/images/` + user?.profilePic}
            alt="profile"
          />
        </div>
      )}

      <button onClick={handleImageSubmit} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded mt-4">
        Save
      </button>
      <div className="ml-14">
        <ToastContainer />{" "}
        {/* ToastContainer for showing success message */}
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
