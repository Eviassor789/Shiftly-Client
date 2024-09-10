import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsPopup from "./SettingsPopup";
import "./HomeTopBar.css";

function HomeTopBar(props) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const popupRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const initialSettings = props.userCurrent.settings && Array.isArray(props.userCurrent.settings)
      ? props.userCurrent.settings
      : [false, false]; // Default settings if no data
    setIsChecked(initialSettings);
  }, [props.userCurrent]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
        updateSettingsOnServer(); // Update when closing by clicking outside
      }
    };

    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsOpen]);

  const handleButtonClick = (page) => {
    navigate(`/${page}`);
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
          username: props.loggedUser,
          settings: isChecked,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      const data = await response.json();
      console.log("Settings updated successfully", data);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const handleSettingsClick = (e) => {
    e.stopPropagation();

    if (isSettingsOpen) {
      // Close the popup and update settings
      updateSettingsOnServer();
      setIsSettingsOpen(false);
    } else {
      // Open the popup
      setIsSettingsOpen(true);
    }
  };

  return (
    <>
      <div id="HomeTopBar">
        <button
          id="HomeButton"
          onClick={() => handleButtonClick("home")}
          className={
            props.page === "home"
              ? "HomeTopBarButton BottomBorder"
              : "HomeTopBarButton"
          }
        >
          Home
        </button>
        <button
          id="GenerateButton"
          onClick={() => handleButtonClick("generate")}
          className={
            props.page === "generate"
              ? "HomeTopBarButton BottomBorder"
              : "HomeTopBarButton"
          }
        >
          Generate
        </button>
        <button
          id="UserDetailsBtn"
          onMouseDown={(e) => handleSettingsClick(e)}
          onMouseUp={(e) => e.stopPropagation()}
          style={{ background: props.userCurrent.color ? props.userCurrent.color : "gray" }}
        >
          {props.loggedUser ? props.loggedUser[0].toUpperCase() : "U"}
        </button>
      </div>

      {isSettingsOpen && (
        <div ref={popupRef}>
          <SettingsPopup
            onClose={() => setIsSettingsOpen(false)}
            loggedUser={props.loggedUser}
            userCurrent={props.userCurrent}
            initialSettings={isChecked}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
      )}
    </>
  );
}

export default HomeTopBar;
