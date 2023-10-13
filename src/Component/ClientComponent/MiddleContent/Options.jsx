import React, { useState } from "react";
import ThreeDotButton from "./ThreeDotButton";
import CreateUserInstance from "../../../Axios/userAxios";
import CreateProInstance from "../../../Axios/proAxios";
import Report from "./Report";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../Modal/Modal";
import { FaEllipsisV, FaTimes } from "react-icons/fa";
import ImageUpload from "../PostUplod/ImageUpload";

const Options = ({ item, user, deleate, value, Type, setState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [q, s] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const userAxios = CreateUserInstance();
  const proAxios = CreateProInstance();
  const Axios = Type === "users" ? userAxios : proAxios;
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
    });
  };

  const showErrorMessage = (emessage) => {
    toast.error(emessage, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
    });
  };

  const open = (postId) => {
    setIsOpen(!isOpen);
  };

  const deletePost = async (item) => {
    try {
      const response = await Axios.post("/deletePost", { postId: item._id });
      console.log(response.data.message);
    } catch (error) {
      console.log("post not deleted");
    }
  };

  const save = async (postId) => {
    try {
      const response = await Axios.post("/savePost", {
        postId,
        userId: user._id,
        Type,
      });
      if (response.data.isTrue === true) {
        showToastMessage(response.data.message);
      } else {
        showErrorMessage(response.data.message);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-8 w-8 h-8 rounded-full overflow-hidden"
        >
          <FaEllipsisV
            className="text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          />
        </button>

        {isOpen && (
          <>
            <button
              onClick={() => setIsOpen(false)}
              className="h-full w-full fixed inset-0 cursor-default"
            ></button>

            <div className="absolute right-0 w-32 bg-white rounded-lg shadow-lg py-2  ">
              {user._id === item.proId ? (
                <>
                  {/* If the user is the owner of the item */}
                  <a
                    onClick={() => setIsOpen1(true)}
                    href="#"
                    className="block px-4 py-2 account-link hover:bg-gray-100"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    onClick={() => {
                      deletePost(item);
                      deleate(value);
                    }}
                    className="block px-4 py-2 account-link hover:bg-gray-100"
                  >
                    Delete
                  </a>
                </>
              ) : (
                <>
                  {/* If the user is not the owner of the item */}
                  <a
                    href="#"
                    onClick={() => setReportOpen(!reportOpen)}
                    className="block px-4 py-2 account-link hover:bg-gray-100"
                  >
                    Report
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 account-link hover:bg-gray-100"
                  >
                    Share
                  </a>
                </>
              )}
            </div>

            {reportOpen && (
              <div className=" ">
                <Report
                  item={item}
                  user={user}
                  Type={Type}
                  setReportOpen={setReportOpen}
                />
              </div>
            )}
          </>
        )}

        <Modal isOpen={isOpen1} onClose={() => setIsOpen1(false)}>
          <button className="p-2" onClick={() => setIsOpen1(false)}>
            <FaTimes />
          </button>

          <ImageUpload
            user={user}
            onClose={closeModal}
            value="edit"
            editData={item}
            setState={setState}
            setIsOpen1={setIsOpen1}
          />
        </Modal>
      </div>

      {q && (
        <div className="relative w-full">
          <div className="" onClick={() => open(item._id)}>
            <div>
              <ThreeDotButton />
            </div>
          </div>
          {isOpen && (
            // <div className='bg-slate-600'>
            <div className="absolute   top-8 right-0.5 h-14 text-start rounded w-28 shadow-lg shadow-black bg-white">
              {user._id === item.proId ? (
                <p
                  className="ml-2 text-gray-600"
                  onClick={() => {
                    deletePost(item);
                    deleate(value);
                  }}
                >
                  delete
                </p>
              ) : (
                <>
                  <p
                    className="ml-2 text-gray-600"
                    onClick={() => setReportOpen(!reportOpen)}
                  >
                    report
                  </p>

                  <p
                    className=" ml-2 text-gray-600"
                    onClick={() => save(item._id)}
                  >
                    save
                  </p>
                </>
              )}
            </div>
            // </div>
          )}
          <ToastContainer /> {/* ToastContainer for showing success message */}
        </div>
      )}
    </>
  );
};

export default Options;
