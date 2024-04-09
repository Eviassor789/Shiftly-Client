import React, { useState, useRef } from "react";
import Shift from "./Shift/Shift";
import "./WeekShifts.css";
import ShiftWindow from "./ShiftWindow/ShiftWindow";

const WeekShifts = ({ shifts_list }) => {
  const color_list = ["blue", "red", "orange", "yellow", "pink", "brown"];

  const [shiftData, setShiftData] = useState({
    names: [],
    startHour: "",
    endHour: "",
    day: "",
    showModal: false,
  });

  const handleShiftClick = (newData) => {
    setShiftData(newData);
  };

  const handleCloseModal = () => {
    setShiftData({
      names: [],
      startHour: "",
      endHour: "",
      day: "",
      showModal: false,
    });
  };

  let placed_shifted = [],
    counter = 0;

  // Generate array of hours from 07:00 to 20:00
  const hours = [];
  for (let i = 7; i <= 20; i++) {
    hours.push(`${i.toString().padStart(2, "0")}:00`);
  }

  function getMaxOverlaps(shifts, currentShift) {
    let maxOverlaps = 0;

    for (let i = 0; i < shifts.length; i++) {
      if (shifts[i] !== currentShift) {
        const overlaps = checkOverlap(currentShift, shifts[i]);
        if (overlaps) {
          maxOverlaps++;
        }
      }
    }

    return maxOverlaps;
  }

  function checkOverlap(shift1, shift2) {
    // Convert start and end times to minutes for easier comparison
    const start1 = convertToMinutes(shift1.startHour);
    const end1 = convertToMinutes(shift1.endHour);
    const start2 = convertToMinutes(shift2.startHour);
    const end2 = convertToMinutes(shift2.endHour);

    // Check if the shifts overlap in time
    return (
      ((start1 >= start2 && start1 <= end2) ||
        (end1 >= start2 && end1 <= end2) ||
        (start2 >= start1 && start2 <= end1) ||
        (end2 >= start1 && end2 <= end1)) &&
      shift1.day === shift2.day
    );
  }

  function convertToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function nextHour(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours + 1).toString() + ":00";
  }

  if (shiftData.showModal) {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling behavior
    });
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="week-shifts">
      <table>
        <thead>
          <tr>
            <th></th> {/* Empty cell for spacing */}
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td>{hour + " - " + nextHour(hour)}</td>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ].map((day) => {
                const relevantShifts = shifts_list.filter(
                  (s) => s.day === day && hour === s.startHour
                );

                return (
                  <td key={day + hour}>
                    {relevantShifts.map(
                      (shift, index) =>
                        placed_shifted.push(shift) && (
                          <div
                            onClick={() =>
                              handleShiftClick({
                                names: shift.names,
                                startHour: shift.startHour,
                                endHour: shift.endHour,
                                day: day,
                                showModal: true,
                              })
                            }
                          >
                            <Shift
                              key={index}
                              startHour={shift.startHour}
                              endHour={shift.endHour}
                              names={shift.names}
                              overlapNum={getMaxOverlaps(shifts_list, shift)}
                              place={getMaxOverlaps(placed_shifted, shift)}
                              color={
                                shift.color
                                  ? shift.color
                                  : color_list[counter++ % color_list.length]
                              }
                            />
                          </div>
                        )
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {shiftData.showModal && (
        <>
          <div className="overlay"></div>
          <div className="modal-content">
            <ShiftWindow
              day={shiftData.day}
              startTime={shiftData.startHour}
              endTime={shiftData.endHour}
              requiredWorkers={8}
              occupiedWorkers={shiftData.names}
              unoccupiedWorkers={["Charlie", "David"]}
              onClose={handleCloseModal}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WeekShifts;
