import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userAPI } from '../../../Constants/Api';
import CreateUserInstance from '../../../Axios/userAxios';


const Question = ({value,id,questions}) => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState("");
  const [allCategory, setAllCAtegory] = useState([]);
  const [questionId,setQuestionId]=useState('')
  const userAxios = CreateUserInstance()

  const token = useSelector((state)=>state.ClientAuth.Token)
  const userId = useSelector((state)=>state.ClientAuth.Id)
 

  useEffect(() => {
    userAxios.get("/getCategory").then((res) => {
      const getCategory = res.data.category;
      setAllCAtegory(getCategory);
    });
    if(questions){
      setMessage(questions?.message)
      // setFiles(questions?.image[0])
      setCategory(questions?.category)
      setQuestionId(questions._id)
    }
  }, []);

  const handleDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const showToastMessage = () => {
    toast.success("Success!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  const handleUpload = async (event) => {
    event.preventDefault(); 
    if(message.trim() === ''){
      return showErrorMessage("Please enter question");

    }
  
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('image', file);
      });
      formData.append('message', message);

      formData.append('category', category);

  
      formData.append('userId', userId);

      if(questions){
        formData.append('questionId', questionId); 

      }

      let response
   if(value === 'create'){
       response = await userAxios.post('/quesionUpload', formData);
    }else if(value === 'edit'){
      response = await userAxios.post('/editeQuestion', formData);
    }
      showToastMessage(response.data.message)
      setCategory('')
      setMessage('')
      
      setFiles([])
      setFiles([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  
  

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md ">

      <form method='POST' onSubmit={handleUpload}>
        
      <div className=''>
            <ToastContainer />{" "}
          </div>
      <Dropzone onDrop={handleDrop} accept="image/*" multiple>
  {({ getRootProps, getInputProps, isDragActive }) => (
    <div
      {...getRootProps()}
      className={`p-4 border border-dashed ${
        isDragActive ? 'border-blue-400' : 'border-gray-300'
      } bg-gray-50 rounded-lg cursor-pointer`}
    >
      <input {...getInputProps()} />
      {files.length > 0 && (
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
      )}
      {!isDragActive && files.length === 0 && (
        <div className="text-gray-400">
          <p >upload image</p>
          <div className="w-full flex justify-center items-center mt-4">
            {questions && questions.image.length > 0?
            <img
              className="h-20 max-w-20"
              src={`${userAPI}/images/` + questions.image[0]}
              alt="image description"
              
            />
              :
              
              <img
              className="h-20 max-w-20"
              src="/images/image.png"
              alt="image description"
              
            />
              }
          </div>
        </div>
      )}
    </div>
  )}
</Dropzone>


        <label
          htmlFor="message"
          className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Question;
