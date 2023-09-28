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

const HirePage = ({Type}) => {
    const [show, setShow] = useState(false);
    const [categoryName,setCategoryName] = useState('')



   
    return (
      <>
          {!show ? (
            <>
           
              
                <HireOptions setShow={setShow}  setCategoryName={setCategoryName} Type={Type}/>
            </>
          ) : (
            <ProsCard setShows={setShow}  categoryName={categoryName}/>
          )}
    </>
    
    );
}

export default HirePage;
