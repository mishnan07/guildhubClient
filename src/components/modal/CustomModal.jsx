import React, { useState } from 'react';
import Modal from 'react-modal';
import ImageUpload from '../professionals/post/ImageUpload';

// Make sure to bind to your app element (for screen reader accessibility)
Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '60%',
          maxWidth: '500px',
          margin: 'auto',
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '5px',
        },
      }}
    >
      {console.log(children,'kkkkkkkkk')}
      {children}
      <button onClick={onClose}>Close</button>


    </Modal>
  );
};

export default CustomModal;
