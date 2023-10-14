import React, { useEffect, useState } from "react";
import CreateProInstance from "../../../Axios/proAxios";
import CreateUserInstance from "../../../Axios/userAxios";
import { userAPI } from "../../../Constants/Api";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";


const HireOptions = ({ setShow, setCategoryName, Type }) => {
  const [allCategory, setAllCategory] = useState([]);
  const proAxios = CreateProInstance()
  const userAxios = CreateUserInstance()
  const Axios = Type === 'users' ?userAxios:proAxios
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    Axios.get("/getCategory").then((res) => {
      const getCategory = res.data.category;
      setAllCategory(getCategory);
    });
    setIsLoading(false)

  }, []);

  // Define an array of background colors
  const backgroundColors = [
    "bg-orange-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-purple-300",
  ];
  const detail = (categoryId) => {
    setShow(true);

    const filteredCategory = allCategory.filter(
      (item) => categoryId === item._id
    );

    if (filteredCategory.length === 1) {
      const categoryName = filteredCategory[0].categoryName;
      setCategoryName(categoryName);
    } else {
      console.log("Category not found or multiple categories match the ID.");
    }
  };

  return (
    <div>
      <section className={Type === "users" ? "bg-white p-20" : ''}>
        {" "}
        {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={"container mx-auto  "}>
          <div className={Type === 'users' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4' :'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-4'}>
            {allCategory.map((item, index) => (
              <div
                onClick={() => detail(item._id)}
                key={index}
                className={`${
                  backgroundColors[index % backgroundColors.length]
                } p-4  rounded-lg text-center shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105`}
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
      )}
      </section>
    </div>
  );
};

export default HireOptions;
