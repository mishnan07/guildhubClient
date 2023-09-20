import React, { useEffect, useState } from 'react';
import userAxios from '../../../Axios/userAxios';
import { useSelector } from 'react-redux';

const Follow = ({ Type, user }) => {
  const [userDetail, setUserDetail] = useState([]);
  const [suce, setSuc] = useState(1);
  const [seto, setSeto] = useState(false);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);

  let token;

  if (Type === 'users') {
    token = useSelector((state) => state.proAuth.Token);
  } else if (Type === 'professional') {
    token = useSelector((state) => state.proAuth.Token);
  }

  const fetchPosts = async () => {
    try {
      const response = await userAxios.get('/getPost', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPros(response.data.pros);
      setUsers(response.data.users);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [suce]);

  const profile = '/images/user_149071.png';

  const client = users ? users : '';
  const pro = pros ? pros : '';
  const userType = Type ? Type : '';
  const userr = user ? user : '';
  const userId = user ? user._id : '';

  useEffect(() => {
    setUserDetail([userr]);
  }, [userr, seto]);

  const following = async (followerId, followerType, setSeto) => {
    setSeto(!seto);

    try {
      const response = await userAxios.post(
        '/following',
        { userId, userType, followerId, followerType },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchPosts();
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

  console.log(userr, 'uuuuuu');

  return (
    <div className="">
      <div
        id="dropdownUsers"
        className="z-10 bg-white rounded-lg shadow w-full h-full dark:bg-white-700"
      >
        <ul
          className="h-full py-2 overflow-y-auto text-black-700 dark:text-black-200 ml-4"
          aria-labelledby="dropdownUsersButton"
        >
          {pro.map((item) => (
            <li
              className="hover:bg-gray-100 border-b border-gray-300 py-4 transition duration-300 ease-in-out transform hover:scale-105"
              key={item._id}
            >
              <div className="flex items-center space-x-4">
                <div className="flex w-full items-center justify-evenly">
                  <img
                    src={profile}
                    alt=""
                    className="profile-photo-sm w-12 h-12 rounded-full"
                  />
                  <h5>
                    <a href="#" className="text-blue-500">
                      {item.name}
                    </a>
                  </h5>
                  <p href="#" className="text-yellow-400 text-xs">
                    {item.category}
                  </p>
                  <button
                    className={`bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 ease-in-out`}
                    onClick={() =>
                      following(item._id, 'professional', setSeto)
                    }
                  >
                    {isFollowed(item._id) === 'follow' ? 'Follow' : 'Unfollow'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <ul
          className="h-full py-2 overflow-y-auto text-black-700 dark:text-black-200 ml-4"
          aria-labelledby="dropdownUsersButton"
        >
          {client.map((item) => (
            <li
              className="hover:bg-gray-100 border-b border-gray-300 py-4 transition duration-300 ease-in-out transform hover:scale-105"
              key={item._id}
            >
              <div className="flex items-center space-x-4">
                <div className="flex w-full items-center justify-evenly">
                  <img
                    src={profile}
                    alt=""
                    className="profile-photo-sm w-12 h-12 rounded-full"
                  />
                  <h5>
                    <a href="timeline.html" className="text-blue-500">
                      {item.name}
                    </a>
                  </h5>
                  <p href="#" className="text-yellow-400 text-xs">
                    HOME OWNER
                  </p>
                  <button
                    className={`bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 ease-in-out`}
                    onClick={() => following(item._id, 'users', setSeto)}
                  >
                    {isFollowed(item._id) === 'follow' ? 'Follow' : 'Unfollow'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Follow;
