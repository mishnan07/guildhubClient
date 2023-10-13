import React from 'react';
import { FaComment, FaThumbsUp, FaBookmark } from 'react-icons/fa'; // Import icons

const LikeComment = ({ item, handleLike, hasLiked, userId, commentDiv, comments ,save}) => {

  return (
    <div className="reaction flex items-center ml-2">
      {/* Like Button */}
      <div className="flex items-center space-x-2">
        <span
          onClick={() => handleLike(item._id, userId)}
          className={`cursor-pointer ${
         hasLiked &&   hasLiked(item.likes, userId)
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-blue-600 transition duration-100'
          }`}
        >
          <FaThumbsUp className="text-lg" />
        </span>
        <a className="btn text-gray-600 font-semibold hover:underline">
          {item.likes.length}
        </a>
      </div>

      {/* Comment Button */}
      <div className="flex items-center space-x-2 ml-4">
        <span
          className="cursor-pointer"
          onClick={() => commentDiv(item._id)}
        >
          <FaComment className="text-lg text-gray-600 hover:text-blue-600 transition duration-100" />
        </span>
        <a className="btn text-gray-600 font-semibold hover:underline">
          {comments && comments.filter((item2) => item._id === item2.post).length}
        </a>
      </div>

      {/* Save Button */}
      <div className="ml-auto px-2">
        <button onClick={()=>save(item._id)} className="btn text-blue-600 font-semibold hover:underline">
          <FaBookmark className="text-lg " />
        </button>
      </div>
    </div>
  );
};

export default LikeComment;
