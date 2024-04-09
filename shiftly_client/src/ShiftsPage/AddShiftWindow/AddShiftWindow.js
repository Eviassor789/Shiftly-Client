import React, { useState, useRef } from "react";
import "./AddShiftWindow.css";

const AddShiftWindow = ({
  other_shifts,
  setShifts,
  setOther_shifts,
  shifts,
}) => {

  const color_list = ["blue", "red", "orange", "yellow", "pink", "brown"];

  const handleAddShiftClick = (data) => {
    // Add the new shift to the shifts array
    var updatedShifts = [...shifts, data];
    // Remove the new shift from the other_shifts array
    var updatedOtherShifts = other_shifts.filter(
      (shift) =>
        shift.day !== data.day ||
        shift.startHour !== data.startHour ||
        shift.endHour !== data.endHour
    );

    // Update the state with the new shifts and other_shifts arrays
    setShifts(updatedShifts);
    setOther_shifts(updatedOtherShifts);
  };

  return (
    <div className="shift-container">
      <div className="head">Additional shifts possible</div>
      <div className="shift_boxes">
        {other_shifts.map((shift, index) => (
          <div
            key={index}
            className="shift-box"

            onClick={() =>
              handleAddShiftClick({
                day: shift.day,
                startHour: shift.startHour,
                endHour: shift.endHour,
                names: [],
                color: color_list[Math.floor(Math.random() * color_list.length)]
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
