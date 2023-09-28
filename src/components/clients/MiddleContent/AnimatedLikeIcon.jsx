import React from 'react';
// import './AnimatedLikeIcon.css'; // Import CSS for styling

const AnimatedLikeIcon = () => {
  return (
    <div className="animated-like-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="200px"
        height="200px"
      >
        <g className="ldl-scale">
          <g className="ldl-ani">
            <g className="ldl-layer">
              <g
                className="ldl-ani"
                style={{
                  animation: 'breath 1.11111s linear -0.833333s infinite normal forwards running',
                }}
              >
                <path
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3"
                  stroke="#323232"
                  fill="none"
                  d="M78.522 40.11H59.531V26.198c0-7.353-5.049-13.527-11.869-15.243-1.949-.49-3.848.95-3.848 2.96v15.756c0 7.352-5.96 13.31-13.311 13.31h0c-1.147 0-2.077.93-2.077 2.077v36.04c0 3.75 3.04 6.791 6.791 6.791h34.442c6.45 0 12.099-4.324 13.783-10.551l6.155-22.762c1.971-7.292-3.521-14.466-11.075-14.466z"
                  style={{ stroke: 'rgb(50, 50, 50)' }}
                />
              </g>
            </g>
            <g className="ldl-layer">
              <g
                className="ldl-ani"
                style={{
                  animation: 'breath 1.11111s linear -1.11111s infinite normal forwards running',
                }}
              >
                <path
                  d="M10 40.805h18.424v48.336H10z"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3"
                  stroke="#323232"
                  fill="none"
                  style={{ stroke: 'rgb(50, 50, 50)' }}
                />
                
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedLikeIcon;
