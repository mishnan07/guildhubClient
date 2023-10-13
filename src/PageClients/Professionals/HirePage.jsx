import React, { useEffect, useState } from "react";

import HireOptions from "../../Component/ClientComponent/HIrePros/HireOptions";

import ProsCard from "../../Component/ClientComponent/ProList/ProsCard";

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
