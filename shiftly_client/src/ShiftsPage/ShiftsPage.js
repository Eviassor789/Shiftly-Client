import React, { useState } from "react";
import WeekShifts from "./WeekShifts/WeekShifts";
import "./ShiftsPage.css";
import AddShiftWindow from "./AddShiftWindow/AddShiftWindow";

const ShiftsPage = () => {
  const professions = ["Doctor", "Engineer", "Teacher", "Nurse"]; // Sample list of professions

  const [selectedProfession, setSelectedProfession] = useState(null);

  const handleProfessionClick = (profession) => {
    setSelectedProfession(profession);
  };

  const color_list = ["blue", "red", "orange", "yellow", "pink", "brown"];

  //color_list[counter++ % color_list.length]

  const unselected_shiftsList = [
    { day: "Monday", startHour: "10:00", endHour: "13:00" },
    { day: "Monday", startHour: "14:00", endHour: "16:00" },
    { day: "Wednesday", startHour: "11:00", endHour: "15:00" },
    { day: "Thursday", startHour: "07:00", endHour: "12:00" },
    { day: "Friday", startHour: "08:00", endHour: "18:00" },
  ];

  const [unselected_shifts, setUnselected_shifts] = useState(
    unselected_shiftsList
  );

  var shifts_list = [
    {
      day: "Sunday",
      startHour: "10:00",
      endHour: "17:00",
      names: ["Alice", "Bob", "sss", "abcbd", "krook"],
      color: false,
    },
    {
      day: "Sunday",
      startHour: "14:00",
      endHour: "17:00",
      names: ["Alice", "Bob", "trick"],
      color: false,
    },
    {
      day: "Sunday",
      startHour: "08:00",
      endHour: "15:00",
      names: ["Alice", "Bob"],
      color: false,
    },
    {
      day: "Tuesday",
      startHour: "10:00",
      endHour: "18:00",
      names: ["Charlie", "David"],
      color: false,
    },
    {
      day: "Tuesday",
      startHour: "10:00",
      endHour: "19:00",
      names: ["Charlie", "David"],
      color: false,
    },
    {
      day: "Tuesday",
      startHour: "07:00",
      endHour: "08:00",
      names: ["Charlie", "David"],
      color: false,
    },
    {
      day: "Wednesday",
      startHour: "14:00",
      endHour: "16:00",
      names: ["AAA", "BBB", "CCC", "DDDDDDDDDDDD", "EEE", "FFF", "GGG", "HHH"],
      color: false,
    },
    {
      day: "Thursday",
      startHour: "13:00",
      endHour: "16:00",
      names: ["AAA", "BBB", "CCC", "DDDDDDDDDDDD", "EEE", "FFF", "GGG", "HHH"],
      color: false,
    },
    {
      day: "Thursday",
      startHour: "14:00",
      endHour: "16:00",
      names: ["AAA", "BBB"],
      color: false,
    },
    {
      day: "Thursday",
      startHour: "14:00",
      endHour: "17:00",
      names: ["AAAxxxx", "BBB"],
      color: false,
    },
    // Add more shifts as needed
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  shifts_list.sort((a, b) => {
    const dayIndexA = daysOfWeek.indexOf(a.day);
    const dayIndexB = daysOfWeek.indexOf(b.day);

    if (a.startHour !== b.startHour) {
      return a.startHour.localeCompare(b.startHour); // Sort by day index
    } else {
      return dayIndexA - dayIndexB; // If day is the same, sort by start hour
    }
  });

  let counter = 0;
  shifts_list.forEach((shift) => {
    shift.color = color_list[counter++ % color_list.length];
  });

  const [shifts, setShifts] = useState(shifts_list);

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
          <WeekShifts
            shifts={shifts}
            setShifts={setShifts}
            unselected_shifts={unselected_shifts}
            setUnselected_shifts={setUnselected_shifts}
          />
          <AddShiftWindow
            shifts={shifts}
            setShifts={setShifts}
            unselected_shifts={unselected_shifts}
            setUnselected_shifts={setUnselected_shifts}
          />
        </div>
      </div>
    </div>
  );
};

export default ShiftsPage;
