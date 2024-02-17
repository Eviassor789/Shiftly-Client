import "./SchedulingTile.css";
import React from 'react';


function SchedulingTile() {
  return (
    <>
      <div id="TileContainer">
        <img src="/SchedualPic.jpg" alt="Logo" />
        <span id="NameOfTable">Name Of Table</span>
        <span id="dateOfTable">dd/mm/yyyy</span>
        <div className="icons">
          <i class="bi bi-star"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-dash-circle"></i>
        </div>
      </div>
    </>
  );
}

export default SchedulingTile;
