import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClientLogout } from "../../Redux/ClientAuth";
import userAxios from "../../Axios/userAxios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/clients/navbar/Navbar";
import Sidebar from "../../components/clients/sidebar/Sidebar";
import ComplexDiv from "../../components/clients/home/ComplexDiv";
import RightSideBar from "../../components/professionals/rightSideBar/RightSideBar";

const Home = () => {
  const token = useSelector((state) => state.ClientAuth.Token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const Type = 'user'



  useEffect(() => {
    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await userAxios.get('/userDetails', {Type,
            headers: { Authorization: `Bearer ${token}` },
          });
          const userDetail= response.data.user;
          setUser(userDetail);
        } catch (error) {
          console.log(error);
        }
      };
      console.log('successful');
      fetchUserDetails();
    } else {
      navigate('/login');
    }
  }, [token]);

  // console.log(user.name,'=================');

  return (
    <div>
      <div>
        <div>
          <Navbar />
        </div>
        <div className="flex justify-center">
          {/* Sidebar component */}
          <Sidebar user={user}/>
          <ComplexDiv />

          <RightSideBar />

          <div className="">{/* First content section */}</div>

          <div className="">{/* Second content section */}</div>
        </div>
      </div>



      <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 md:static">
          {/* Left Sidebar Content */}
          {/* ... */}
          <Sidebar user={user}/>
        </div>
        <div className="md:w-7/12 mx-auto">
          {/* Middle Content */}
          {/* ... */}
          <ComplexDiv />
        </div>
        <div className="md:w-1/4 md:static">
          {/* Right Sidebar Content */}
          {/* ... */}
          <RightSideBar />
        </div>
      </div>
    </div>

    </div>

    
  );
};

export default Home;
