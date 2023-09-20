import React from 'react'
import { FaDollarSign, FaMapMarkerAlt, FaUser } from "react-icons/fa"; // Import icons


const ProfilePics = () => {
  // Function to get a consistent color for the avatar
  const getConsistentColor = () => {
    return '#FF5733'; // You can change this color code to your desired color
  };

  // Get the background color for the avatar (consistent color)
  const backgroundColor = getConsistentColor();

  return (
    <div className="bg-blue-700 w-12 h-12 flex items-center justify-center rounded-full">
    <FaUser className="text-white text-2xl" />
  </div>
  );
};

export default ProfilePics;
