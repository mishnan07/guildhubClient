import React, { useEffect, useState } from 'react';
import CreateUserInstance from '../../../Axios/UserAxios';
import CreateProInstance from '../../../Axios/ProAxios';
import { ClientLogout } from "../../../Redux/ClientAuth";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfilePic from '../ProfilePic/ProfilePic';
import SearchBar from '../MiddleContent/SearchBar';
import FollowButton from './FollowButton';

const Follow = () => {
  const [userDetail, setUserDetail] = useState([]);
  const [suce, setSuc] = useState(1);
  const [seto, setSeto] = useState(false);
  const [pros, setPros] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [searchInput, SetSearchInput] = useState("");
  const userAxios = CreateUserInstance()
  const proAxios = CreateProInstance()
  const [all,setAll] = useState([])


  const location = useLocation();
  const Type = location.pathname.includes('professional') ? 'professional' : 'users';

  const token = useSelector((state) =>
    Type === 'users' ? state.ClientAuth.Token : state.proAuth.Token
  );
  const id = useSelector((state) => (Type === 'users' ? state.ClientAuth.Id : state.proAuth.Id));

  const Axios = Type === 'users' ? userAxios :proAxios
  useEffect(() => {
    if(token){
     const fetchUserDetails = async () => {
         try {
          let response
          if(Type === 'users'){
              response = await Axios.get('/clientDetails');
          }else if(Type === 'professional'){
              response = await Axios.get('/userDetails');

          }
          
           const userDetail= response.data.user;

           if(userDetail.isBanned){
            hadleLogout()
          }else{
            setUser(userDetail);

          }
           } catch (error) {
           console.log(error);
         }
       };
       console.log('successful');
       fetchUserDetails();
         }else{
      Type === 'users'? navigate('/login'): navigate('/professional/login')
    }
     }, [token,suce]);

  const fetchPosts = async () => {
    try {
      const response = await Axios.get('/usersAndpros');
      setPros(response.data.pros);
      setUsers(response.data.users);
      const combinedArray = [...response.data.pros, ...response.data.users];
      setAll(combinedArray);
      
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

  
 

  const userName = (specificId, value) => {
    let idExists = pros.find((pro) => pro._id === specificId);

    if (!idExists) {
      idExists = users.find((user) => user._id === specificId);
    }

    if (idExists) {
        return idExists.name;
    }
     

    return "";
  }

  const datas = all.filter((item) => {
    const name = userName(item._id)
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    return item.isBanned === false && name;
  });


  console.log(userr, 'uuuuuu');

  return (
    <div className="">
      <div
        id="dropdownUsers"
        className="z-10 bg-white rounded-lg shadow w-full h-full dark:bg-white-700 mt-8"
      >
              <SearchBar SetSearchInput={SetSearchInput} searchInput={searchInput} />

        <ul
          className="h-full py-2 overflow-y-auto text-black-700 dark:text-black-200 ml-4"
          aria-labelledby="dropdownUsersButton"
        >
          {datas.map((item) => (
            <li
              className="hover:bg-gray-100 border-b border-gray-300 py-4 transition duration-300 ease-in-out transform hover:scale-105"
              key={item._id}
            >
              <div className="flex items-center space-x-4">
                <div className="flex w-full items-center justify-evenly">
                 <ProfilePic UserId={item._id} value='pic'/>
                  <h5>
                    <a href="#" className="text-blue-500">
                      {item.name}
                    </a>
                  </h5>
                  <p href="#" className="text-yellow-400 text-xs">
                    {item.category?item.category:'Home Owners'}
                  </p>
                 {console.log(userDetail,'userDetailuserDetailuserDetail')}
                 <div   className="bg-white border border-gray-500 px-10 py-2 rounded-full shadow-lg max-w-sm">

                 <FollowButton item={item} userId={userId} userType={userType} userDetail={userDetail} token={token} setSuc={setSuc} suce={suce}/>
                 </div>
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
