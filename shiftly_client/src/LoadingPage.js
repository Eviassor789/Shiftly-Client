import React from 'react';
import './LoadingPage.css'; // Assuming the CSS file is named LoadingPage.css

function LoadingPage({msg}) {
  return (
    <>
      <div id="Login_upper_background"></div>
      <div className="loading-container">
        <div className="spinner"></div>
        <h1 className="loading-message">{msg ? msg : "Please wait while we find a solution for you..."}</h1>
      </div>
    </>
  );
}

export default LoadingPage;
