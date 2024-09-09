import "./SchedulingTile.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

function SchedulingTile(props) {
  const [isStarFilled, setIsStarFilled] = useState(props.starred);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const inputRef = useRef(null);  // Reference to the input element

  useEffect(() => {
    setIsStarFilled(props.starred);
  }, [props.starred]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();  // Focus on the input
      inputRef.current.select();  // Select all the text inside the input
    }
  }, [isEditing]);

  const toggleStar = async (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the tile's click event
    
    try {
      setIsStarFilled(!isStarFilled);

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

      props.onToggleStar(props.ID);
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  const handleRemoveTile = async (e) => {
    e.stopPropagation();
    props.onRemove(props.ID);

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

    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  const navigate = useNavigate();

  const handleTileClick = () => {
    props.setCurrentTableID(props.ID);
    navigate(`/page/${props.ID}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveEdit = async (e) => {
    e.stopPropagation();
    await props.onEditName(newName);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit(e);  // Trigger save when Enter is pressed
    }
  };

  function formatDateTime(dateTimeString) {
    // Split the input string by the hyphen (-)
    const [year, month, day, hour, minute, second] = dateTimeString.split('-');
  
    // Format the date as DD/MM/YY
    const formattedDate = `${day}/${month}/${year.slice(2)}`;
  
    // Format the time as HH:MM:SS
    const formattedTime = `${hour}:${minute}`;
  
    // Combine the formatted date and time
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div id="TileContainer" onClick={handleTileClick}>
      <img src="/SchedualPic.jpg" alt="Logo" />
      {isEditing ? (
        <input
          id="NameInput"
          type="text"
          value={newName}
          ref={inputRef}  // Attach the reference to the input
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}  // Listen for Enter key
          onClick={(e) => { e.stopPropagation() }}  // Prevent triggering the tile click
        />
      ) : (
        <span id="NameOfTable">{props.name}</span>
      )}
      <span id="dateOfTable">{formatDateTime(props.date)}</span>
      <div className="icons">
        {isStarFilled ? (
          <i className="bi bi-star-fill" onClick={toggleStar}></i>
        ) : (
          <i className="bi bi-star" onClick={toggleStar}></i>
        )}

        {isEditing ? (
          <button onClick={handleSaveEdit}>
            <i id="check" className="bi bi-check"></i>  {/* Save icon */}
          </button>
        ) : (
          <button onClick={handleEditClick}>
            <i id="pencil" className="bi bi-pencil"></i>  {/* Edit icon */}
          </button>
        )}

        <button onClick={handleRemoveTile}>
          <i className="bi bi-dash-circle"></i>
        </button>
        
      </div>
    </div>
  );
}

export default SchedulingTile;