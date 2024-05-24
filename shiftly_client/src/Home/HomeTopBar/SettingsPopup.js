import React from 'react';
import './SettingsPopup.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

function SettingsPopup({ onClose }) {
  const navigate = useNavigate();

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

        <button
          className="Log-out"
          onClick={() => {
            navigate("/");
          }}
        >
          Log Out
        </button>

        <br />

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SettingsPopup;
