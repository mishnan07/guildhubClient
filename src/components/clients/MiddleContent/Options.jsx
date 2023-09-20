import React, { useState } from 'react';
import ThreeDotButton from './ThreeDotButton';
import userAxios from '../../../Axios/userAxios';
import Report from './Report';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Options = ({ item, user ,deleate, value, Type}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reportOpen,setReportOpen] = useState(false)

  let token
 if( Type === 'users'){
    token = useSelector((state)=>state.proAuth.Token)
 }else if('professional')  {
    token = useSelector((state)=>state.proAuth.Token)
 }

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000
    });
  };

  const showErrorMessage = (emessage) => {
    toast.error(emessage, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000
    });
  };




  const open = (postId) => {
    setIsOpen(!isOpen);
  };

  const deletePost = async (item)=>{
    try {
        const response = await userAxios.post('/deletePost',{postId:item._id},
        {headers:  {Authorization: `Bearer ${token}` } , }     
        )
        console.log(response.data.message);
    } catch (error) {
        console.log('post not deleted');
    }
  }

  const save = async (postId)=>{
    try {
        const response = await userAxios.post('/savePost',{postId ,userId:user._id,Type},
        {headers:  {Authorization: `Bearer ${token}` } , }     
        )
        console.log(response.data.message,'ppppppppppp');
        if(response.data.isTrue===true){
            showToastMessage(response.data.message)
        }else{
            showErrorMessage(response.data.message)
        }
    } catch (error) {
        
    }
}


  return (
    <div className="relative w-full">

      <div className=''  onClick={() => open(item._id)}>
       <div>
       <ThreeDotButton />
       </div>
        {reportOpen?
        <div className=" mr-[8rem] md:mr-4 lg:mr-[5rem] ">
          <Report item={item} user={user} Type={Type} setReportOpen={setReportOpen}  />
          </div>
         :''}
        {/* {reportOpen?
        <div className="w-fit  h-fit absolute bg-blue-700 right-[50%] md:top-[100%] sm:right-28">
          <Report item={item} user={user} Type={Type} setReportOpen={setReportOpen}  />
          </div>
         :''} */}
      </div>
      {isOpen && (
        // <div className='bg-slate-600'>
        <div className="absolute   top-8 right-0.5 h-14 text-start rounded w-28 shadow-lg shadow-black bg-white">
          {user._id === item.proId ? ( 
            <p className="ml-2 text-gray-600"
            onClick={() =>{ deletePost(item); deleate(value)}}
            
            >delete</p>
          ) : (
            <>
              <p className="ml-2 text-gray-600"
              onClick={()=>setReportOpen(!reportOpen)}
              >report</p>
              <p className=" ml-2 text-gray-600"
              onClick={()=>save(item._id)}
              >save</p>
            </>
          )}

        </div>
        // </div>
        
      )}
                          <ToastContainer /> {/* ToastContainer for showing success message */}

    </div>
  );
};

export default Options;
