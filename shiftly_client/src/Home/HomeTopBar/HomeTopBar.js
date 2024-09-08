import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsPopup from "./SettingsPopup";
import "./HomeTopBar.css";

function HomeTopBar(props) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  const navigate = useNavigate();

  // Fetch initial settings or simulate fetching from the server
  useEffect(() => {
    const initialSettings = props.userCurrent.settings && Array.isArray(props.userCurrent.settings)
      ? props.userCurrent.settings
      : [false, false]; // Default settings if no data

    setIsChecked(initialSettings);

  }, [props.userCurrent]);

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

  const handleSettingsClick = () => {
    if (isSettingsOpen) {
      updateSettingsOnServer();
    }
    setIsSettingsOpen(!isSettingsOpen);
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
          onClick={handleSettingsClick}
          style={{ background: props.userCurrent.color ? props.userCurrent.color : "gray" }}
        >
          {props.loggedUser ? props.loggedUser[0].toUpperCase() : "U"}
        </button>{" "}
      </div>
      {isSettingsOpen && (
        <SettingsPopup
          onClose={() => setIsSettingsOpen(false)}
          loggedUser={props.loggedUser}
          userCurrent={props.userCurrent}
          initialSettings={isChecked}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      )}
    </>
  );
}

export default HomeTopBar;
