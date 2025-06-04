import React from 'react';

function Loader({ message = "Loading...", size = 48 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        style={{ marginBottom: '1rem' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#3498db"
          strokeWidth="5"
          strokeDasharray="90,150"
          strokeLinecap="round"
          transform="rotate(-90 25 25)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <span style={{ color: '#555', fontSize: '1.2rem' }}>{message}</span>
    </div>
  );
}

export default Loader;