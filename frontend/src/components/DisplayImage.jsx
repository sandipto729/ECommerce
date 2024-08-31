import React from 'react';
import './DisplayImage.css';
const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="display-image-overlay flex justify-center items-center" onClick={onClose}>
     <div className="display-image flex justify-center items-center">
        <img src={imgUrl} alt="Product Image" style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
      </div>
    </div>
  );
};

export default DisplayImage;
