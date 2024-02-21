import "./SchedulingTile.css";
import React, { useState, useEffect  } from "react";

function SchedulingTile(props) {
  // State variable to manage the filled/empty state of the star icon
  const [isStarFilled, setIsStarFilled] = useState(props.starred);

    // Use useEffect to sync isStarFilled state with props.starred
    useEffect(() => {
      setIsStarFilled(props.starred);
    }, [props.starred]); // Run effect whenever props.starred changes

  // Function to toggle the state of the star icon
  const toggleStar = () => {
    
    props.onToggleStar(props.name);
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
          {props.starred ? (
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
