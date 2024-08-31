import "./SchedulingTile.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function SchedulingTile(props) {
  const [isStarFilled, setIsStarFilled] = useState(props.starred);

  useEffect(() => {
    setIsStarFilled(props.starred);
  }, [props.starred]);

  const toggleStar = async (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the tile's click event
    
    // Send the star toggle request to the server
    try {
      const response = await fetch(`http://localhost:5000/toggle_star/${props.ID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ starred: !isStarFilled }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle star');
      }

      // Update the UI state
      setIsStarFilled(!isStarFilled);
      props.onToggleStar(props.ID);
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  const handleRemoveTile = async (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the tile's click event
    
    // Send the delete request to the server
    try {
      const response = await fetch(`http://localhost:5000/delete_table/${props.ID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete table');
      }

      // Update the UI state
      props.onRemove(props.ID);
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  const navigate = useNavigate();

  const handleTileClick = () => {
    props.setCurrentTableID(props.ID);
    navigate(`/page/${props.ID}`); // Navigate to the specific table page
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
