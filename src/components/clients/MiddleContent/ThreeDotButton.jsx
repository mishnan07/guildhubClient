import React from 'react';

const ThreeDotButton = () => {
  const buttonStyle = {
    position: 'relative',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  };

  const dotStyle = {
    width: '4px',
    height: '4px',
    backgroundColor: '#333',
    borderRadius: '50%',
    margin: '4px 0px 0px -8px',
  };

  const lastDotStyle = {
    marginBottom: '0',
  };

  return (
    <div style={buttonStyle}>
      <div style={dotStyle}></div>
      <div style={dotStyle}></div>
      <div style={{ ...dotStyle, ...lastDotStyle }}></div>
    </div>
  );
};

export default ThreeDotButton;
