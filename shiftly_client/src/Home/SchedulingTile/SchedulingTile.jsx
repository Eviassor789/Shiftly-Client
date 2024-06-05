import "./SchedulingTile.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function SchedulingTile(props) {
  const [isStarFilled, setIsStarFilled] = useState(props.starred);

  useEffect(() => {
    setIsStarFilled(props.starred);
  }, [props.starred]);

  const toggleStar = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the tile's click event
    props.onToggleStar(props.name);
    setIsStarFilled(!isStarFilled);
  };

  const handleRemoveTile = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the tile's click event
    props.onRemove(props.name);
  };

  const navigate = useNavigate();

  const handleTileClick = () => {
    props.setCurrentTableID(props.ID);
    navigate(`/page`);
  };

  return (
    <div id="TileContainer" onClick={handleTileClick}>
      <img src="/SchedualPic.jpg" alt="Logo" />
      <span id="NameOfTable">{props.name}</span>
      <span id="dateOfTable">{props.date}</span>
      <div className="icons">
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
  );
}

export default SchedulingTile;
