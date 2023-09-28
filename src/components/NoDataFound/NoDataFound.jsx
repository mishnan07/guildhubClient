import React from "react";

const NoDataFound = () => {
    const NoData = 'images/nodataImage.png'

  return (
    <div className="relative flex flex-col items-center justify-center h-full text-gray-500">

        <img src={NoData} alt="No item found" className=" " />

      <p className="absolute mt-5 z-8 text-lg text-gray-400 from-neutral-100  ">No Data Found</p>
    </div>
  );
};

export default NoDataFound;
