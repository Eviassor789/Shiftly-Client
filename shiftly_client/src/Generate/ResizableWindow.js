import React, { useState } from 'react';
import './ResizableWindow.css';

const ResizableWindow = ({step}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleWindow = () => {
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <img src="emp-det-1.png" alt="emp-det-1" draggable="false" />
            <img src="emp-det-2.png" alt="emp-det-2" draggable="false" />
          </>
        );

      case 2:
        return (
          <>
            <img className="req-images" src="req-det-1.png" alt="req-det-1" draggable="false" />
            <img className="req-images" src="req-det-2.png" alt="req-det-2" draggable="false" />
          </>
        );

        case 3:
        return (
          <>
            <img className="shft-images" src="shft-det-1.png" alt="shft-det-1" draggable="false" />
            <img className="shft-images" src="shft-det-2.png" alt="shft-det-2" draggable="false" />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`window CenterDiv ${isExpanded ? "expanded" : ""}`}
      onClick={toggleWindow}
    >
      <div className="top-right-arrow"></div>
      <div className="content CenterDiv">
      {renderContent()}

      </div>
    </div>
  );
};

export default ResizableWindow;
