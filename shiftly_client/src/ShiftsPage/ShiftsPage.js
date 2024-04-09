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

  // const handleAddShiftClick = () => {
  //   setshowShiftsModal(true);
  // };

  const other_shiftsList = [
    {day: "Monday",
    startHour: "10:00",
    endHour: "13:00"},
    {day: "Monday",
    startHour: "14:00",
    endHour: "16:00"},
    {day: "Wednesday",
    startHour: "11:00",
    endHour: "15:00"},
    {day: "Thursday",
    startHour: "07:00",
    endHour: "12:00"},
    {day: "Friday",
    startHour: "08:00",
    endHour: "18:00"},
  ]

  const [other_shifts, setOther_shifts] = useState(other_shiftsList);


  const shifts_list = [
    {
      day: "Sunday",
      startHour: "10:00",
      endHour: "17:00",
      names: ["Alice", "Bob", "sss", "abcbd", "krook"],
    },
    {
      day: "Sunday",
      startHour: "14:00",
      endHour: "17:00",
      names: ["Alice", "Bob", "trick"],
    },
    {
      day: "Sunday",
      startHour: "08:00",
      endHour: "15:00",
      names: ["Alice", "Bob"],
    },
    {
      day: "Tuesday",
      startHour: "10:00",
      endHour: "18:00",
      names: ["Charlie", "David"],
    },
    {
      day: "Tuesday",
      startHour: "10:00",
      endHour: "19:00",
      names: ["Charlie", "David"],
    },
    {
      day: "Tuesday",
      startHour: "07:00",
      endHour: "08:00",
      names: ["Charlie", "David"],
    },
    {
      day: "Wednesday",
      startHour: "14:00",
      endHour: "16:00",
      names: ["AAA", "BBB", "CCC", "DDDDDDDDDDDD", "EEE", "FFF", "GGG", "HHH"],
    },
    {
      day: "Thursday",
      startHour: "14:00",
      endHour: "16:00",
      names: ["AAA", "BBB", "CCC", "DDDDDDDDDDDD", "EEE", "FFF", "GGG", "HHH"],
    },
    {
      day: "Thursday",
      startHour: "14:00",
      endHour: "16:00",
      names: ["AAA", "BBB"],
    },
    {
      day: "Thursday",
      startHour: "14:00",
      endHour: "17:00",
      names: ["AAAxxxx", "BBB"],
    },
    // Add more shifts as needed
  ];

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
          <WeekShifts shifts_list={shifts} />
          <AddShiftWindow other_shifts={other_shifts} setShifts={setShifts} setOther_shifts={setOther_shifts}/>
        </div>
      </div>



    </div>
  );
};

export default ShiftsPage;



