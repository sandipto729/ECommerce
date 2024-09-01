import React from 'react';
import './Spinner.css'; // Import CSS for styling

const BlinkingLoader = () => {
  return (
    <div className="blinking-overlay">
      <div className="blinking-dot"></div>
      <p>Loading...</p>
    </div>
  );
};

export default BlinkingLoader;
