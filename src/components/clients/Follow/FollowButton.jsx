import React from 'react'
import userInstance from '../../../Axios/userAxios';
import { useSelector } from 'react-redux';

const FollowButton = ({item,userId,userType,userDetail,token,setSuc,suce}) => {

    const following = async (followerId, followerType) => {

        

        try {
          const response = await userInstance.post(
            '/following',
            { userId, userType, followerId, followerType },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
    
          if (response.data.message === 'Follower added/removed successfully') {
            setSuc(suce + 1);
          }
    
          console.log(response.data.message);
        } catch (error) {
          console.log('Error occurred when following:', error);
        }
      };

      const isFollowed = (isFollowedId) => {
        const existingFollowIndex = userDetail[0]?.follow.findIndex(
          (follower) =>
            follower.followersId &&
            follower.followersId.toString() === isFollowedId
        );
    
        return existingFollowIndex !== -1 ? 'unfollow' : 'follow';
      };

  return (
    <div>
         <button
           className=''
            onClick={() =>
             following(item?._id,item.category? 'professional':'users')
                    }
                  >
            {isFollowed(item?._id) === 'follow' ? 'Follow' : 'Unfollow'}
         </button>
      
    </div>
  )
}

export default FollowButton
