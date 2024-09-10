import React, { useState, useEffect } from 'react';
import './SettingsPopup.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

function SettingsPopup({ onClose, loggedUser, userCurrent, initialSettings, isChecked, setIsChecked }) {
  const navigate = useNavigate();

  // Ensure loggedUser.settings is an array and has at least 2 elements


  useEffect(() => {
    // Update isChecked when loggedUser.settings changes
    setIsChecked(initialSettings);
  }, [loggedUser, userCurrent]);

  const handleCheckboxChange = (index) => (event) => {
    // Create a copy of the isChecked array to avoid mutation
    const newChecked = [...isChecked];
    newChecked[index] = event.target.checked;
    setIsChecked(newChecked);
    userCurrent.settings = newChecked;
  };

  const updateSettingsOnServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/update-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify({
          username: loggedUser,
          settings: isChecked, // Send the updated settings array
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }
      const data = await response.json();
      // console.log("Settings updated successfully", data);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div className="settings-popup">
      <div className="settings-content">
        <h2>Settings</h2>

                {/* First Row: min idle workers & max satisfied contracts */}
                <div className="objective-row">
                <div className="objective">
                <div className="centerer">
                  min idle workers
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isChecked[0]} // Set checked state from isChecked[0]
                    onChange={handleCheckboxChange(0)} // Bind index to handler
                  />
                  <span className="slider custom-slider"></span>
                </label>
                <div className="objective">
                <div className="centerer">
                  max satisfied Contracts</div>
                </div>
              </div>
      
              {/* Second Row: max satisfied requirement & min cost */}
              <div className="objective-row">
                <div className="objective">
                <div className="centerer">
                  max satisfied requirement</div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isChecked[1]} // Set checked state from isChecked[1]
                    onChange={handleCheckboxChange(1)} // Bind index to handler
                  />
                  <span className="slider custom-slider"></span>
                </label>
                <div className="objective">
                  <div className="centerer">min cost</div>
                  
                </div>
              </div>

        <button
          className="Log-out"
          onClick={() => {
            localStorage.setItem("jwtToken", "");
            updateSettingsOnServer(); // Update server before logging out
            navigate("/");
          }}
        >
          Log Out
        </button>

        <br />

        <button
          className="close-button"
          onClick={() => {
            updateSettingsOnServer(); // Update server before closing
            onClose(); // Close the popup
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SettingsPopup;
