import React, { useState } from 'react';
import './ResizableWindow.css';

const ResizableWindow = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleWindow = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`window CenterDiv ${isExpanded ? "expanded" : ""}`}
      onClick={toggleWindow}
    >
      <div className="top-right-arrow"></div>
      <div className="content">
        <img src="logo192.png" alt="Image" />
      </div>
    </div>
  );
};

export default ResizableWindow;
