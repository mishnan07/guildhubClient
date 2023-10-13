import React, { useState } from 'react';
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Modal, Ripple });

const Confirm = ({}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };


  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>

<div>
      <button onClick={openModal} className="">
       open
      </button>

      {/* Conditional rendering based on the state */}
      {isModalOpen && (
        <div>
      <div
        data-te-modal-init
        data-te-backdrop="false"
        className="fixed inset-0 flex items-center justify-center z-50"
        id="exampleModalComponents"
        tabIndex="-1"
        aria-labelledby="exampleModalComponentsLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="relative w-full max-w-md mx-auto my-7"
        >
          <div className="rounded-md border-none bg-white bg-clip-padding shadow-lg dark:bg-purple-400">
            <div className="flex items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-opacity-50">
              <h5 className="text-xl font-medium text-neutral-800 dark:text-neutral-200" id="exampleModalComponentsLabel">
                Modal title
              </h5>
              <button
              onClick={closeModal}
                type="button"
                className="rounded-none border-none hover:opacity-75 focus:opacity-100 focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="relative flex-auto p-4" data-te-modal-body-ref>
              Modal body text goes here.
            </div>
            <div className="flex items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 py-2.5 text-xs font-medium uppercase text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Close
              </button>
              <button
                type="button"
                className="ml-1 inline-block rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase text-white shadow-[0 4px 9px -4px #3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0 8px 9px -4px rgba(59,113,202,0.3),0 4px 18px 0 rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0 8px 9px -4px rgba(59,113,202,0.3),0 4px 18px 0 rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0 8px 9px -4px rgba(59,113,202,0.3),0 4px 18px 0 rgba(59,113,202,0.2)] dark:shadow-[0 4px 9px -4px rgba(59,113,202,0.5)] dark:hover:shadow-[0 8px 9px -4px rgba(59,113,202,0.2),0 4px 18px 0 rgba(59,113,202,0.1)] dark:focus:shadow-[0 8px 9px -4px rgba(59,113,202,0.2),0 4px 18px 0 rgba(59,113,202,0.1)] dark:active:shadow-[0 8px 9px -4px rgba(59,113,202,0.2),0 4px 18px 0 rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      </div>
      )}
    </div>


    </div>
  );
};

export default Confirm;
