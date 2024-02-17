import "./HomeTopBar.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';


function HomeTopBar(props) {

  const navigate = useNavigate();

  const handleButtonClick = (page) => {
    // You can add additional logic or conditions here if needed
    // For now, just navigate to the specified page
    navigate(`/${page}`);
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
        <button id="UserDetailsBtn">U</button>
      </div>
    </>
  );
}

export default HomeTopBar ;