import React from 'react';

const ErrorPopup = ({ errorMessage, onClose }) => {
  return (
    <div className='error-popup'>
      <p>{errorMessage}</p>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default ErrorPopup;