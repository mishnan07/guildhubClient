import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';
import CreateUserInstance from '../../../Axios/userAxios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reviews = ({ LogedUserId, proId, setState }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviewsList, setReviewsList] = useState([]);

  const userInstance = CreateUserInstance()


  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating === 0) {
      toast.error("Please add a rating in stars.");
      return;
    }

    if (review.trim() === '') {
      toast.error("Please enter a review.");
      return;
    }

    try {
      const newReview = {
        rating,
        review,
        LogedUserId,
        proId
      };

      // Assuming you have a userInstance.post('/RateAndReview') method to submit the review
      const response = await userInstance.post('/RateAndReview', { newReview });

      setReviewsList([...reviewsList, newReview]);
      setRating(0);
      setReview('');
      setState(true);
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("An error occurred while submitting the review.");
    }
  };

  return (
    <div>
      {/* Rating and Review Input Form */}
      <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-md">
        <ToastContainer />

        <div className="mb-3">
          <label htmlFor="rating" className="block text-black">Rating:</label>

          <div className="flex p-1 gap-1 text-orange-300 cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <IoStar
                key={star}
                onClick={() => setRating(star)}
                className={`text-${rating >= star ? 'yellow' : 'gray'}-400 text-2xl`}
              />
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="review" className="block text-black">Review:</label>
          <textarea
            id="review"
            name="review"
            value={review}
            onChange={handleReviewChange}
            className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none w-full"
          />
        </div>
        <button type="submit" className="p-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60 text-white">
          Submit
        </button>
      </form>

      {/* Display Reviews */}
    </div>
  );
};

export default Reviews;
