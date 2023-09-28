import React, { useState } from 'react';
import { FaEllipsisV, FaTimes } from 'react-icons/fa';
import Modal from '../../professionals/Modal/Modal';
import Question from '../question/Question';

function OptionsIcon({id,item,deleteQuestion}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);


  const close = () => {
    setIsOpen1(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-8 w-8 h-8 rounded-full overflow-hidden"
      >
        <FaEllipsisV className='text-gray-700' onClick={() => setIsOpen(!isOpen)} />
      </button>

      {isOpen && (
        <>
          <button
            onClick={() => setIsOpen(false)}
            className="h-full w-full fixed inset-0 cursor-default"
          ></button>

          <div className="absolute right-0 w-32 bg-white rounded-lg shadow-lg py-2  ">
            <a onClick={()=>setIsOpen1(true)} href='#' className="block px-4 py-2 account-link hover:bg-gray-100">
              Edit 
            </a>
            <a onClick={()=>deleteQuestion(id)} href="#" className="block px-4 py-2 account-link hover:bg-gray-100">
              Delete
            </a>
          </div>
        </>
      )}

       <Modal isOpen={isOpen1} onClose={()=>setIsOpen1(false)}>
      <button className="p-2" onClick={() => setIsOpen1(false)}>
              <FaTimes /> 
      </button>


       <Question value='edit' id={id} questions={item}/>
      </Modal >
    </div>
  );
}

export default OptionsIcon;
