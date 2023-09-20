import React, { useEffect, useState } from "react";
import Hire from '../../components/clients/hire/Hire';
import Navbar from '../../components/clients/navbar/Navbar';
import userAxios from "../../Axios/userAxios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HireOptions from "../../components/clients/hire/HireOptions";
import RequirementShow from "../../components/clients/requirement/RequirementShow";
import ProCards from "../../components/professionals/proCards/ProCards";
import ProsCard from "../../components/professionals/proCards/ProsCard";

const HirePage = () => {
    const Type = 'professional';
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const [categoryName,setCategoryName] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state)=>state.proAuth.Token)

    useEffect(() => {
        if (token) {
            const fetchUserDetails = async () => {
                try {
                    const response = await userAxios.get('/userDetails', {
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
      <div className="mt-16 flex flex-col md:flex-col items-center justify-center">
        <div className="w-full md:w-1/2">
          {!show ? (
            <>
            {Type==='users'?
        
              <Hire />
              :''}
              
                <HireOptions setShow={setShow}  setCategoryName={setCategoryName} Type={Type}/>
            </>
          ) : (
            <ProsCard setShows={setShow}  categoryName={categoryName}/>
          )}
        </div>
      </div>
    </>
    
    );
}

export default HirePage;
