import React, { useState, useRef } from "react";
import "./AddShiftWindow.css";

const AddShiftWindow = ({
  shifts,
  setShifts,
  unselected_shifts,
  setUnselected_shifts,
  profession,
  workers,
  setWorkers
}) => {
  const color_list = ["blue", "red", "orange", "yellow", "pink", "brown"];

  const handleAddShiftClick = (data) => {
    // Add the new shift to the shifts array
    var updatedShifts = [...shifts, data];
    // Remove the new shift from the other_shifts array
    var updatedUnselectedShifts = unselected_shifts.filter(
      (shift) =>
        shift.day !== data.day ||
        shift.startHour !== data.startHour ||
        shift.endHour !== data.endHour
    );

    // Update the state with the new shifts and other_shifts arrays
    setShifts(updatedShifts);
    setUnselected_shifts(updatedUnselectedShifts);
  };

  return (
    <div className="shift-container">
      <div className="head">Additional shifts possible</div>
      
      <div className="shift_boxes">
        {unselected_shifts.map((shift, index) => (
          <div
            key={index}
            className="shift-box"
            onClick={() =>
              handleAddShiftClick({
                day: shift.day,
                startHour: shift.startHour,
                endHour: shift.endHour,
                names: [],
                color:
                  color_list[Math.floor(Math.random() * color_list.length)],
                  profession: profession
              })
            }
          >
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
