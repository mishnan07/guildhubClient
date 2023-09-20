import React, { useState } from 'react';
import CustomModal from '../../modal/CustomModal';
import ImageUpload from './ImageUpload';

const Post = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
  return (
    <>
    Custo
    <div>
      <h1>React Modal Example</h1>
      <button onClick={openModal}>Open Modal</button>

      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>Modal Content</h2>
        {/* <p>This is the content of the modal.</p> */}

        <ImageUpload />
      </CustomModal>
    </div>
    </>
  );
}

export default Post;
