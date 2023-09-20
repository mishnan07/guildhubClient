import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center w-full justify-center z-50">
      <div className="modal-overlay fixed inset-0 w-full bg-black opacity-50"> </div>
      <div className="modal-container bg-white  w-full max-w-xl mx-auto rounded shadow-lg z-50">
        <div className="modal-close absolute top-0 right-8 m-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="modal-content p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
