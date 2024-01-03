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
      <div className="content CenterDiv">
        <img src="emp-det-1.png" alt="Image" draggable="false" />
        <img src="emp-det-2.png" alt="Image" draggable="false" />

      </div>
    </div>
  );
};

export default ResizableWindow;
