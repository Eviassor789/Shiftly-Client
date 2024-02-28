import React, { useState } from "react";
import WeekShifts from "./WeekShifts/WeekShifts";
import "./ShiftsPage.css";

const ShiftsPage = () => {
  const professions = ["Doctor", "Engineer", "Teacher", "Nurse"]; // Sample list of professions

  const [selectedProfession, setSelectedProfession] = useState(null);

  const handleProfessionClick = (profession) => {
    setSelectedProfession(profession);
  };

  return (
    <div class="page-container">
      <div class="top-panel">
        <div className="table-name">Your Table Name</div>
        <div className="buttons">
          <button className="button">
            <i class="bi bi-clipboard2-check"></i>&nbsp;&nbsp;&nbsp;Status
          </button>
          <button className="button">
            <i class="bi bi-download"></i>&nbsp;&nbsp;&nbsp;Download
          </button>
          <button className="button">
            <i class="bi bi-floppy"></i>&nbsp;&nbsp;&nbsp;Save
          </button>
          <button className="button">
            <i class="bi bi-arrow-90deg-left"></i>&nbsp;&nbsp;&nbsp;Back
          </button>
        </div>
      </div>
      <div class="main-container">
        <div class="left-panel">
          {professions.map((profession, index) => (
            <button
              key={index}
              className={`profession-button ${
                selectedProfession === profession ? "selected" : ""
              }`}
              onClick={() => handleProfessionClick(profession)}
            >
              <span className="profession-text">{profession}</span>
            </button>
          ))}{" "}
        </div>
        <div class="main-panel">
          <WeekShifts />
        </div>
      </div>
    </div>
  );
};

export default ShiftsPage;
