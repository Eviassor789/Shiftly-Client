import React from "react";
import "./AddShiftWindow.css";

const AddShiftWindow = ({
  shifts,
  setShifts,
  unselected_shifts,
  setUnselected_shifts,
  profession,
  workers,
  setWorkers,
  ispersonalSearch,
  inputValue,
  currentTableID,
  handleProfessionClick,
  currentTable,
  setCurrentTable,
}) => {
  const color_list = [
    "#6CA1D1",
    "#D1E0F2",
    "#FFA96B",
    "#F4E285",
    "#A35C5C",
    "#5F9EA0",
    "#61A886",
  ];
  const handleAddShiftClick = (data) => {
    // Add the new shift to the shifts array
    var updatedShifts = [...shifts, data];
    // Remove the new shift from the other_shifts array
    var updatedUnselectedShifts = unselected_shifts.filter(
      (shift) =>
        shift.day !== data.day ||
        shift.start_hour !== data.start_hour ||
        shift.end_hour !== data.end_hour
    );

    // Update the state with the new shifts and other_shifts arrays
    setShifts(updatedShifts);
    setUnselected_shifts(updatedUnselectedShifts);

    handleProfessionClick("@" + profession);
  };

  function getRelevantUnselectedShifts() {
    return unselected_shifts.filter((shift) => shift.profession === profession);
  }

  return (
    <div className="shift-container">
      <div className="head">Additional shifts possible</div>

      <div className="shift_boxes">
        {getRelevantUnselectedShifts().map((shift, index) => (
          <div
            key={index}
            className="shift-box"
            onClick={() =>
              handleAddShiftClick({
                id: shift.id,
                cost: shift.cost,
                day: shift.day,
                start_hour: shift.start_hour,
                end_hour: shift.end_hour,
                idList: [],
                color:
                  color_list[Math.floor(Math.random() * color_list.length)],
                profession: profession,
                workers:[]
              })
            }
          >
            <p>
              <strong>Day:</strong> {shift.day}
            </p>
            <p>
              <strong>Start Hour:</strong> {shift.start_hour}
            </p>
            <p>
              <strong>End Hour:</strong> {shift.end_hour}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddShiftWindow;
