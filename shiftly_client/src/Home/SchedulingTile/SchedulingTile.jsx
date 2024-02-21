import "./SchedulingTile.css";
import React, { useState } from "react";

function SchedulingTile(props) {
  // State variable to manage the filled/empty state of the star icon
  const [isStarFilled, setIsStarFilled] = useState(false);

  // Function to toggle the state of the star icon
  const toggleStar = () => {
    setIsStarFilled(!isStarFilled);
  };

  const handleRemoveTile = () => {
    props.onRemove(props.name);
  };

  return (
    <>
      <div id="TileContainer">
        <img src="/SchedualPic.jpg" alt="Logo" />
        <span id="NameOfTable">{props.name}</span>
        <span id="dateOfTable">{props.date}</span>
        <div className="icons">
          {/* Conditionally render star icon based on state */}
          {isStarFilled ? (
            <i className="bi bi-star-fill" onClick={toggleStar}></i>
          ) : (
            <i className="bi bi-star" onClick={toggleStar}></i>
          )}
          <button onClick={handleRemoveTile}>
            <i className="bi bi-dash-circle"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default SchedulingTile;
