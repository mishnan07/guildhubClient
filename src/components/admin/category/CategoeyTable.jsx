import React, { useEffect, useState } from 'react';
import proAxios from '../../../Axios/proAxios';
import { userAPI } from "../../../Constants/Api";
import SearchBar from '../../clients/MiddleContent/SearchBar';
import adminAxios from '../../../Axios/adminAxios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confirm from '../../modal/Confirm';
import Pagination from '../pagination/PAgination';

const CategoeyTable = () => {
  const [allCategory, setAllCAtegory] = useState([]);
  const [searchInput, SetSearchInput] = useState("");
  const [state,setState] = useState(false)
  const [confirm,setConfirm] = useState(false)
  const [isOpen,setIsopn] = useState(false)



  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Calculate the index range for items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCategory.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    proAxios.get('/getCategory')
      .then((res) => {
        const getCategory = res.data.category;
        console.log(getCategory, 'lll++==');
        setAllCAtegory(getCategory);
      });
  }, [state]);

  const deleteCategory = async(categoryId)=>{
    try {
      const response = await adminAxios.post('/deleteCategory',{categoryId})
      if(response.data.success){
        toast.success(response.data.message);
        setState(!state)
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full overflow-x-auto'>
      <div className="w-full">
      <ToastContainer />
     {/* <Confirm /> */}
        <div className=''>
          <SearchBar SetSearchInput={SetSearchInput} searchInput={searchInput} />
        </div>
        <table className="w-full mt-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="w-1/3 lg:w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">si no</th>
              <th className="w-1/3 lg:w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">category name</th>
              <th className="w-1/3 lg:w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.filter((item1) => item1.categoryName.toLowerCase()
              .includes(searchInput.toLowerCase())).map((item, index) => (
                <tr className="bg-white border-b text-gray-300 dark:bg-gray-900 dark:border-gray-700" key={item._id}>
                  <th className="w-1/3 lg:w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">{index + 1}</th>
                  <th className="w-1/3 lg:w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">{item.categoryName}</th>
                  <th
                  onClick={()=>deleteCategory(item._id)}
                  className="w-1/3 lg:w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">delete</th>
                 
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allCategory.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />

      
      </div>
    </div>
  );
};

export default CategoeyTable;
