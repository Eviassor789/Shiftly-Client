import "./HomeTopBar.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsPopup from "./SettingsPopup";

function HomeTopBar(props) {

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = (page) => {
    // You can add additional logic or conditions here if needed
    // For now, just navigate to the specified page
    navigate(`/${page}`);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      <div id="HomeTopBar">
        <button
          id="HomeButton"
          onClick={() => handleButtonClick('home')}
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
          onClick={() => handleButtonClick('generate')}
          className={
            props.page === "generate"
              ? "HomeTopBarButton BottomBorder"
              : "HomeTopBarButton"
          }
        >
          Generate
        </button>
        <button id="UserDetailsBtn" onClick={handleSettingsClick}>U</button>
      </div>
      {isSettingsOpen && <SettingsPopup onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
}

export default HomeTopBar ;