import React from 'react';
import './SettingsPopup.css'; // Import the CSS file for styling

function SettingsPopup({ onClose }) {
  return (
    <div className="settings-popup">
      <div className="settings-content">
        <h2>Settings</h2>
        
        <p className="objective">
          <h5>First objective: </h5>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </p>

        <p className="objective">
        <h5>Second objective: </h5>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </p>

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SettingsPopup;
