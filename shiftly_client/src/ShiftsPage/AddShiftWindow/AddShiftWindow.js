import React, { useState, useRef } from "react";
import "./AddShiftWindow.css";

const AddShiftWindow = ({ other_shifts, setShifts, setOther_shifts }) => {
  return (
    <div className="shift-container">
      <div className="head">Additional shifts possible</div>
      <div className="shift_boxes">
        {other_shifts.map((shift, index) => (
          <div key={index} className="shift-box">
            <p>
              <strong>Day:</strong> {shift.day}
            </p>
            <p>
              <strong>Start Hour:</strong> {shift.startHour}
            </p>
            <p>
              <strong>End Hour:</strong> {shift.endHour}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddShiftWindow;
