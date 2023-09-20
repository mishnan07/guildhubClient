import React, { useEffect, useState } from 'react';
import proAxios from '../../../Axios/proAxios';
import { userAPI } from '../../../Constants/Api';

const HireOptions = ({setShow,setCategoryName,Type}) => {
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    proAxios.get('/getCategory').then((res) => {
      const getCategory = res.data.category;
      setAllCategory(getCategory);
    });
  }, []);

  // Define an array of background colors
  const backgroundColors = [
    'bg-orange-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-purple-300',
  ];
  const detail = (categoryId) => {
    setShow(true);
    
    const filteredCategory = allCategory.filter((item) => categoryId === item._id);
  
    if (filteredCategory.length === 1) {
      const categoryName = filteredCategory[0].categoryName;
      setCategoryName(categoryName)
      console.log(categoryName, '==================oo');
    } else {
      console.log('Category not found or multiple categories match the ID.');
    }
  };
  

  return (
  


    <div>
<section className={Type === 'users' ? 'bg-white py-16' : 'py-16'}>        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
            {allCategory.map((item, index) => (
              <div
              onClick={()=>detail(item._id)}
                key={index}
                className={`${
                  backgroundColors[index % backgroundColors.length]
                } p-4 rounded-lg text-center shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105`}
              >
                <p className=" font-semibold mb-4">{item.categoryName}</p>
                <div className="w-1/2 mx-auto">
                  <img
                    src={`${userAPI}/category/` + item.image}
                    alt={item.categoryName}
                    className="max-h-40 rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireOptions;
