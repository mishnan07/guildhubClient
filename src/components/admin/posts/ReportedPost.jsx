import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import adminAxios from "../../../Axios/adminAxios";
import { userAPI } from "../../../Constants/Api";
import CustomModal from "../../modal/CustomModal";
import { useSelector } from "react-redux";


const ReportedPost = () => {

    const [post, setPost] = useState([]);
    const [pros, setPros] = useState([]);
    const [users, setUsers] = useState([]);
    const [state, setState] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null); // To keep track of the selected post

    const token = useSelector((state) => state.AdminAuth.Token);


    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };


    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await userAxios.get("/getPost",
            {headers: { Authorization: `Bearer ${token}` }});
            const updatedPosts = response.data.post.map((post) => ({
              ...post,
              liked: false,
            }));
            setPost(updatedPosts);
            setPros(response.data.pros);
    
            setUsers(response.data.users);
          } catch (error) {
            console.log("Error fetching posts:", error);
          }
        };
    
        fetchPosts();
      }, [state]);

      const blockPost =async (postId)=>{
         try {
          const response = adminAxios.post('/blockPost',{postId})
         } catch (error) {
          
         }
      }

      const report = post.map((item)=>item.report)
      const reports = report.filter((item)=> item.length > 0)
      console.log(reports,'llllll');
      
      const postReported = post.filter((item)=> item.report.length >0)
      console.log(postReported,'pppppppppp');

      const handleDetailsClick = (post) => {
        setSelectedPost(post);
        openModal();
      };

      const name = (reportEntry) => {
        if (reportEntry.userType === 'professional') {
          const user = pros.find((item) => item._id === reportEntry.userId);
          if (user) {
            return user.name;
          }
        } else if (reportEntry.userType === 'users') {
          const user = users.find((item) => item._id === reportEntry.userId);
          if (user) {
            return user.name;
          }
        }
        return 'User not found'; // Handle cases where the user is not found
      };

      const proPic = (reportEntry) => {
        if (reportEntry.userType === 'professional') {
          const user = pros.find((item) => item._id === reportEntry.userId);
          if (user) {
            return user.profilePic;
          }
        } else if (reportEntry.userType === 'users') {
          const user = users.find((item) => item._id === reportEntry.userId);
          if (user) {
            return user.profilePic;
          }
        }
        return 'User not found'; // Handle cases where the user is not found
      };
      
  return (
    <>
      <div className="relative w-full p-2 overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-6 py-3">posts</th>
        <th className="px-6 py-3">description</th>
       
        <th className="px-6 py-3">Details</th>
        <th className="px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody>
    {postReported.map((item)=>(

        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" >
            
          <td className="px-6 py-4">
          {item.image[0] ? (
              <img
                src={`${userAPI}/images/` + item.image[0]}
                alt="post-image"
                className="img-responsive post-image w-[90px] h-[80px] object-cover rounded-lg"
              />
            ) : (
              <video
                controls
                src={`${userAPI}/images/` + item.video[0]}
                type="video/mp4"
                className="img-responsive post-image w-[90px] h-[80px] object-cover rounded-lg"
              />
            )}</td>
          <td className="px-6 py-4">{item.message}</td>
       
          <td className="px-6 py-4">
            <a
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => handleDetailsClick(item)}  >
              details
            </a>
            <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        {selectedPost && selectedPost.report && selectedPost.report.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedPost.report.map((reportEntry) => (
                  <tr
                    className="bg-white border-b dark:bg-white-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white-600"
                    key={reportEntry._id}
                  >
                    {console.log(reportEntry,'ppppooiioo')}
                    <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {proPic(item.proId) ?
                  <img
                  // onClick={()=>goProfile(item.proId)}
                  src={`${userAPI}/images/` + proPic(reportEntry)}
                      alt="user"
                    className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600-600 p-0.5"
                  />
                  :
                  <img
                  // onClick={()=>goProfile(item.proId)}
                    src={profile}
                    alt="user"
                    className="profile-photo-md float-left w-14 h-14 rounded-full border-2 border-purple-600-600 p-0.5"
                  />
                  }
                      <div className="pl-3">
                        <div className=" text-gray-500 font-semibold">{name(reportEntry)}</div>
                        <div className="font-normal text-gray-500">{reportEntry.userType === 'users'?'HomeOwners':'professionals'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{reportEntry.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No reports available for this post.</p>
        )}
      </CustomModal>
          </td>

          <td className="px-6 py-4">
            {item.isBanned === true? 
 <a
 href="#"
 className="text-yellow-600"
>
 Blocked
</a>            :
  <a
    href="#"
    className="text-red-600"
    onClick={() => blockPost(item._id)} // Wrap blockPost in an anonymous function
  >
    Block
  </a>
}
</td>


        </tr>
      ))}

    </tbody>
  </table>
</div>
      
    </>
  )
}

export default ReportedPost
