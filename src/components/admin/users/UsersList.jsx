import React, { useEffect, useState } from "react";
import CreateAdminInstance from '../../../Axios/adminAxios';
import CreateUserInstance from "../../../Axios/userAxios";
import { useSelector } from "react-redux";
import SearchBar from '../../clients/MiddleContent/SearchBar';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const HomeOwners = ({ userType }) => {
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(false);
  const [searchInput, SetSearchInput] = useState("");
  const adminAxios = CreateAdminInstance()
  const userAxios = CreateUserInstance()



  const token = useSelector((state) => state.AdminAuth.Token);
  useEffect(() => {
    const usersAndpros = async () => {
      try {
        const response = await adminAxios.get("/usersAndpros");
        setPros(response.data.pros);
        setUsers(response.data.users);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    usersAndpros();
  }, [state]);

  const head =
    userType === "owner"
      ? ["name", "location", "phone", "action"]
      : ["name","location", "profession", "phone", "action"];
  const data = userType === "owner" ? users : pros;
 

  const blockUser = async(userID,userType)=>{
    setState(!state)
    try {
      const response = await adminAxios.post('/blockUser',{userID,userType})
      toast.success(response.data.message)

    } catch (error) {
      
    }
  }
  return (
    <div className="relative w-full p-2 overflow-x-auto shadow-md sm:rounded-lg">
            <ToastContainer />
              <div className=""> 
               <SearchBar SetSearchInput={SetSearchInput} searchInput={searchInput} />
               </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
        <thead className="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-200 dark:text-gray-400">
          <tr>
            {head.map((item) => (
              <th scope="col" key={item} className="px-6 py-3 text-black">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userType === "owner"
            ? users.filter((item1)=>item1.name. toLowerCase()
            .includes(searchInput.toLowerCase())).map((item) => (
                <tr className="bg-white border-b dark:bg-white dark:border-gray-300 text-gray-700">
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
                <tr className="bg-white border-b dark:bg-white dark:border-gray-300 text-gray-600">
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
