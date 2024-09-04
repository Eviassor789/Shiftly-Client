import React, { useState, useEffect } from 'react';
import './SettingsPopup.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import users from '../../Data/Users';

function SettingsPopup({ onClose, loggedUser }) {
  const navigate = useNavigate();

  // Ensure loggedUser.settings is an array and has at least 2 elements
  const initialSettings = users.get(loggedUser).settings && Array.isArray(users.get(loggedUser).settings) 
    ? users.get(loggedUser).settings 
    : [false, false];

  const [isChecked, setIsChecked] = useState(initialSettings);

  useEffect(() => {
    // Update isChecked when loggedUser.settings changes
    setIsChecked(initialSettings);
  }, [loggedUser]);

  const handleCheckboxChange = (index) => (event) => {
    // Create a copy of the isChecked array to avoid mutation
    const newChecked = [...isChecked];
    newChecked[index] = event.target.checked;
    setIsChecked(newChecked);
    users.get(loggedUser).settings = newChecked;

    if (event.target.checked) {
      // alert(`Hello! Objective ${index + 1} is checked.`);
    }
  };

  return (
    <div className="settings-popup">
      <div className="settings-content">
        <h2>Settings</h2>

        <div className="objective">
          <h5>First objective:</h5>
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked[0]} // Set checked state from isChecked[0]
              onChange={handleCheckboxChange(0)} // Bind index to handler
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="objective">
          <h5>Second objective:</h5>
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked[1]} // Set checked state from isChecked[1]
              onChange={handleCheckboxChange(1)} // Bind index to handler
            />
            <span className="slider"></span>
          </label>
        </div>

        <button
          className="Log-out"
          onClick={() => {
            localStorage.setItem("jwtToken", "");
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
