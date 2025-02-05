import React from 'react';
import './CustomerSupport.css';

const CustomerSupport = () => {
  const handleClick = () => {
    // You can add your customer service action here
    // For example, open a chat window or redirect to support page
    console.log('Customer support clicked');
  };

  return (
    <div className="customer-support-button" onClick={handleClick}>
      <i className="fas fa-headset"></i>
    </div>
  );
};

export default CustomerSupport; 