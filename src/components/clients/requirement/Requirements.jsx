import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import proAxios from '../../../Axios/proAxios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userAxios from '../../../Axios/userAxios';

const Requirements = ({ user, onClose }) => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [budget, setbudget] = useState('');
  const [location, setlocation] = useState('');

  const token = useSelector((state) => state.proAuth.Token);

  const handleDrop = (acceptedFiles) => {
    // Ensure that only one file is selected
    if (acceptedFiles.length > 0) {
      setFiles([acceptedFiles[0]]);
    }
  };
console.log(user,'=====================');
  const handleUpload = async (event) => {
    event.preventDefault();

    try {
      if (message.trim() === '') {
        return showErrorMessage('Please fill a requirement.');
      }

      if (location.trim() === '') {
        return showErrorMessage('Please enter a location.');
      }

      const formData = new FormData();

      if (files.length > 0) {
        const file = files[0];
        formData.append('image', file);
      }

      formData.append('message', message);
      formData.append('budget', budget); 
      formData.append('location', location); 

      formData.append('userId', user._id);

      const response = await proAxios.post('/uploadRequirement', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Images uploaded successfully:', response.data);
      showToastMessage('Images uploaded successfully:');
      setTimeout(() => {
        onClose();
      }, 2000);
      setFiles([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md ">
      <form method="POST" onSubmit={handleUpload}>
        <Dropzone onDrop={handleDrop} accept="image/*">
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`p-4 border border-dashed ${
                isDragActive ? 'border-blue-400' : 'border-gray-300'
              } bg-gray-50 rounded-lg cursor-pointer`}
            >
              <input {...getInputProps()} />
              {files.length > 0 ? (
                <div>
                  <img
                    src={URL.createObjectURL(files[0])}
                    alt={`Selected image`}
                    className="w-32 h-32 object-cover m-auto rounded-lg border"
                  />
                </div>
              ) : (
                <div className="text-center">
                  {isDragActive ? (
                    <p className="text-blue-400">Drop the image here</p>
                  ) : (
                    <>
                      <p className='text-gray-400 text-left'>upload image</p>
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
          name="message"
          type="message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>

        {/* Input 1 */}
        <label
          htmlFor="budget"
          className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Input 1
        </label>
        <input
          id="budget"
          name="budget"
          type="text"
          onChange={(e) => {
            setbudget(e.target.value);
          }}
          value={budget}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="budget type eg:(1000 to 2000)"
        />

        {/* Input 2 */}
        <label
          htmlFor="location"
          className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Input 2
        </label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={(e) => {
            setlocation(e.target.value);
          }}
          value={location}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="enter location"
        />

        <button
          type="submit"
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

export default Requirements;
