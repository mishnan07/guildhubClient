import React, { useState } from 'react';

const PostText = ({ item }) => {
  const [showMore, setShowMore] = useState(false);
  const charLimit = 130; // Character limit to show initially

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const message = item.message;
  const displayMessage = showMore ? message : message.slice(0, charLimit);

  return (
    <div className="post-text p-2">
      <p className="text-gray-700">{displayMessage}</p>
      {message.length > charLimit && (
        <button className="text-blue-500" onClick={toggleShowMore}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default PostText;
