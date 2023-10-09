import React, { useEffect, useState } from "react";
import Hire from '../../components/clients/hire/Hire';
import Navbar from '../../components/clients/navbar/Navbar';
import CreateUserInstance from "../../Axios/userAxios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HireOptions from "../../components/clients/hire/HireOptions";
import ProsCard from "../../components/professionals/proCards/ProsCard";
import LeftSidebar from "../../components/clients/LeftSidebar/LeftSidebar";

const HirePage = () => {
    const Type = 'users';
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const [categoryName,setCategoryName] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.ClientAuth.Token);
    const userAxios = CreateUserInstance()


    useEffect(() => {
        if (token) {
            const fetchUserDetails = async () => {
                try {
                    const response = await userAxios.get('/clientDetails', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const userDetail = response.data.user;
                    setUser(userDetail);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchUserDetails();
        } else {
            navigate('/login');
        }
    }, [token]);
    return (
      <>
      <Navbar Type={Type} user={user} />
      <div className="container mt-20 ">
      <div className="flex flex-col md:flex-row  justify-evenly sm:mr-16 sm:px-20">
        <div></div>
        <LeftSidebar Type={Type} user={user} />
        
        {/* Left Sidebar */}
       
    
        <div className=" overflow-scroll h-screen md:w-2/3 ">
          {!show ? (
            <>
              <Hire />
              <HireOptions setShow={setShow} setCategoryName={setCategoryName} Type={Type} />
            </>
          ) : (
            <div className="w-full overflow-scroll h-screen ">
            <ProsCard setShows={setShow} categoryName={categoryName} />
            </div>
          )}
  
        </div>
      </div>
      </div>
    </>
    
    
    );
}

export default HirePage;
