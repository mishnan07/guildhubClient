import React, { useEffect, useState } from "react";
import userAxios from "../../../Axios/userAxios";
import adminAxios from "../../../Axios/adminAxios";
import { useSelector } from "react-redux";
import SearchBar from '../../clients/MiddleContent/SearchBar';



const HomeOwners = ({ userType }) => {
  const [post, setPost] = useState([]);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);
  const [searchInput, SetSearchInput] = useState("");


  const token = useSelector((state) => state.AdminAuth.Token);
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

  userType ? console.log(userType, "+++====") : "";
  const head =
    userType === "owner"
      ? ["name", "location", "phone", "action"]
      : ["name","location", "profession", "phone", "action"];
  const data = userType === "owner" ? users : pros;
 

  const blockUser = async(userID,userType)=>{
    setState(!state)
    try {
      const response = await adminAxios.post('/blockUser',{userID,userType})

    } catch (error) {
      
    }
  }
  return (
    <div className="relative w-full p-2 overflow-x-auto shadow-md sm:rounded-lg">
              <div className=""> 
               <SearchBar SetSearchInput={SetSearchInput} searchInput={searchInput} />
               </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {head.map((item) => (
              <th scope="col" key={item} className="px-6 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userType === "owner"
            ? users.filter((item1)=>item1.name. toLowerCase()
            .includes(searchInput.toLowerCase())).map((item) => (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  {console.log(item.isBanned, "kklkl")}

                  <td className="px-6 py-4">{item.name}</td>

                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4">{item.phone}</td>

                
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => blockUser(item._id,'users')}
                    >
                    {item.isBanned === false ? "Block" : "UnBlock"}
                    </a>
                  </td>
                </tr>
              ))
            : pros.filter((item1)=>item1.name. toLowerCase()
            .includes(searchInput.toLowerCase())).map((item) => (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  {console.log(item.isBanned, "kklkl")}

                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.phone}</td>

                
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => blockUser(item._id,'professional')}
                    >
                    {item.isBanned === false ? "Block" : "UnBlock"}
                    </a>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeOwners;
