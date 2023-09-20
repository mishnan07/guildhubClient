import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import proAxios from '../../../Axios/proAxios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ImageUpload = ({user,onClose}) => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
 
  const token = useSelector((state)=> state.proAuth.Token)

  const handleDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const handleUpload = async (event) => {
    event.preventDefault(); 

    try {

      if (files.length === 0) {
        // Validate that at least one image is selected
        console.log('llllllllllpppooopppp');
        return showErrorMessage("Please select at least one image.");
      }
      
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('image', file);
      });
      formData.append('message', message);
  
      formData.append('userId', user._id);
  
      const response = await proAxios.post('/upload', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Images uploaded successfully:', response.data);
      showToastMessage('Images uploaded successfully:')
      setTimeout(() => {
        onClose()
      }, 2000);
      setFiles([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000
    });
  };
  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000
    });
  };
  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md mt-20">
      <form method='POST' onSubmit={handleUpload}>
        <Dropzone onDrop={handleDrop} accept="image/*" multiple>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`p-4 border border-dashed ${
                isDragActive ? 'border-blue-400' : 'border-gray-300'
              } bg-gray-50 rounded-lg cursor-pointer`}
            >
              <input {...getInputProps()} />
              {files.length > 0 ? (
                <div className="flex flex-wrap -m-2">
                  {files.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${index}`}
                      className="w-16 h-16 object-cover m-2 rounded-lg border"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  {isDragActive ? (
                    <p className="text-blue-400">Drop the images here</p>
                  ) : (
                    <>
                      <p>Drag 'n' drop images here, or click to select</p>
                      <div className="w-full flex justify-center items-center mt-4">
                        <img
                          className="h-20 max-w-20"
                          src="/images/image.png"
                          alt="image description"
                        />
                      </div>
                      
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </Dropzone>

        <label
          htmlFor="message"
          className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          id="message"
          name='message'
          type='message'
          onChange={(e) => { setMessage(e.target.value) }}
          value={message}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>

        <button
          type='submit'
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          // disabled={files.length === 0}
        >
          Upload
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ImageUpload;
