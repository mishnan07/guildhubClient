import React from 'react'
import { FaSearch } from 'react-icons/fa'; // You can choose a different icon from 'react-icons/fa' if you prefer


const SearchBar = ({SetSearchInput,searchInput}) => {
  return (
    <div>
       <div className=" create-post bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-row items-center">
          <div className="w-10 h-10">
          <div className="search-icon">
      <FaSearch className="search-icon-svg w-full h-full text-gray-300" />
    </div>
            {/* <img
              src="images/users/user-1.jpg"
              alt=""
              className="profile-photo-md w-full h-full rounded-full"
            /> */}
          </div>
          <div className="flex-1 ml-2">
            <input
            value={searchInput} onChange={(e)=>SetSearchInput(e.target.value)}
              name="texts"
              id="exampleTextarea"
              type='search'
              cols="30"
              rows="1"
              className="form-control bg-gray-200 p-2 rounded-md resize-none focus:outline-none focus:bg-white w-full"
              placeholder="What's on your mind?"
            />
          </div>
          <div className="flex-none ml-2">
            <ul className="publishing-tools flex list-none">
              <li className="mr-2">
                <a href="#" className="text-blue-500">
                  <i className="ion-compose"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500">
                  <i className="ion-images"></i>
                </a>
              </li>
              {/* Add more tools */}
              {/* ... */}
            </ul>
            {/* <button className="btn btn-primary bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
              Publish
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
