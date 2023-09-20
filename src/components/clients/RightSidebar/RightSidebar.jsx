import React from 'react';


const RightSidebar = () => {
  const profile = "/images/user_149071.png";

  return (
    <div className="md:w-1/4">
      <div className="suggestions bg-gray-100 p-4 rounded-lg shadow-lg" id="sticky-sidebar">
      <h4 className="grey text-gray-700">Who to Follow</h4>
        <div className="follow-user flex items-center space-x-4">
          <img src={profile} alt="" className="profile-photo-sm w-12 h-12 rounded-full" />
          <div>
            <h5><a href="timeline.html" className="text-blue-500">Diana Amber</a></h5>
            <a href="#" className="text-green-500">Add friend</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
