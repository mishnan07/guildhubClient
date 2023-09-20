import React, { useEffect, useState } from 'react';
import userAxios from '../../../Axios/userAxios'
import { userAPI } from '../../../Constants/Api';
const ComplexDiv = () => {
  const [imageUrl,setImageUrl] = useState('')
  const [message,setMessage] = useState('')

  const [post,setPost] = useState([])
  const [like,setLike] = useState (false)
  

  useEffect(() => {
    userAxios
      .get('/getPost')
      .then((res) => {
        console.log('Fetched image URL:', res.data.imageUrl);
        const aa = res.data.imageUrl
        const me = res.data.randomImage.message

        const post = res.data.post

        setPost(post)


        setImageUrl(aa);
        setMessage(me)
      })
      .catch((error) => {
        console.log('Error fetching image:', error);
      });
  }, []); // Empty dependency array means this effect runs only once on component mount

  const handleLike =(()=>{
     if(like){
      setLike(false)
     }else{
      setLike(true)
     }
  })
  return (
<>

<ul>
     {post.map((item)=>(
      <li key={item._id}>
        
<div className="h-auto ml-72 mt-20 flex justify-center items-center">
  <div className="max-w-[540px] max-h-[680px] mt-0  container  rounded-xl shadow-lg transform transition">
    <div classNameName='bg-white'>
      <div className="flex items-center space-x-2 ml-1 ">
        <img className="w-10  rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" />
          <h2 className="text-gray-800 font-bold cursor-pointer">llllll</h2>
      </div>
      <p className="ml-4 mt-1  text-gray-700 hover:underlinae cursor-pointer">{item.message}</p>
    </div>
    <img className="w-full  cursor-pointer" src={`${userAPI}/images/`+ item.image[0]} alt="" />
    <video className="w-full  cursor-pointer" src={`${userAPI}/images/`+ item.video[0]} alt="" />

    <div className="flex p-4 justify-between">
    
      <div className="flex space-x-2">
        
        <div className="flex space-x-1 items-center">
          <span>
            <svg onClick={handleLike} key={item._id} xmlns="http://www.w3.org/2000/svg" className={like?("h-7 w-7  text-red-500 hover:text-red-400 transition duration-100 cursor-pointer"):"h-7 w-7  text-gray-400 hover:text-red-400 transition duration-100 cursor-pointer"} viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
          </span>
          <span>20</span>
        </div>

        <div className="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </span>
          <span>22</span>
        </div>
      </div>
    </div>
  </div>
</div>
      </li>
     ))}
</ul>


  


</>

  );
};

export default ComplexDiv;