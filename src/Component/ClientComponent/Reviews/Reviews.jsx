import React, { useEffect, useState } from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";
import RateAndReview from "./Review";
import CreateUserInstance from '../../../Axios/UserAxios';
import CreateProInstance from "../../../Axios/ProAxios";
import ProfilePic from "../ProfilePic/ProfilePic";

const Reviews = ({ LogedUserId, proId ,userType}) => {
  const [RateAndReviw, setRateAndReviw] = useState([]);
  const [isHired, setIsHired] = useState(false);
  const [state, setState] = useState(false);
  const userInstance = CreateUserInstance()
  const proInstance = CreateProInstance()

  const Axios = userType==='users'?userInstance:proInstance

  useEffect(() => {
    const getReteandReview = async () => {
      try {
        const response = await Axios.get(
          `/getReteandReview/${proId}/${LogedUserId}`
        );
        setRateAndReviw(response.data.RateAndReview);
        setIsHired(response.data.isHired);
      } catch (error) {}
    };
    getReteandReview();
  }, [state]);

  const formatTimestamp = (timestamp) => {
    const currentTime = new Date();
    const itemTime = new Date(timestamp);
    const timeDifference = Math.floor((currentTime - itemTime) / 1000); // Time difference in seconds

    if (timeDifference < 60) {
      return "a few seconds ago";
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(timeDifference / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div>
      {isHired && (
        <RateAndReview
          LogedUserId={LogedUserId}
          proId={proId}
          setState={setState}
        />
      )}

        <p className="text-2xl font-semibold text-gray-800 py-5">
          Reviews of Hired Home Owners
        </p>

      <div className="flex flex-col gap-3  mb-10 overflow-scroll max-h-96">
        <p></p>
       

        {RateAndReviw.map((item) => (
          <div key={item._id} className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="w-14 h-14 text-center rounded-full bg-red-500">
                  <ProfilePic UserId={item.userId} value="pic" />
                </div>
                <div className="felx flex-row">
                  <div>
                    {/* Assuming you want to display the user's name */}
                    <ProfilePic UserId={item.userId} value="name" />
                  </div>
                  <div>{formatTimestamp(item.timestamp)}</div>
                </div>
              </div>
              <div className="flex p-1 gap-1 text-orange-300">
                {/* Assuming you want to display the star rating */}
                {Array.from({ length: item.rating }).map((_, index) => (
                  <IoStar key={index} />
                ))}
                {item.rating % 1 !== 0 && <IoStarHalf />}
              </div>
            </div>

            <div>{item.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
