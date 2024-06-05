import React, { useState, useEffect } from "react";
import WeekShifts from "./WeekShifts/WeekShifts";
import "./ShiftsPage.css";
import AddShiftWindow from "./AddShiftWindow/AddShiftWindow";
import workers_map from "../Data/Workers";
import { useNavigate } from 'react-router-dom';
import assignments from "../Data/Assignments";
import users from "../Data/Users";


const ShiftsPage = (props) => {
  const professions = ["Doctor", "Engineer", "Teacher", "Nurse"]; // Sample list of professions

  const [selectedProfession, setSelectedProfession] = useState(null);
  const [ispersonalSearch, setPersonalSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);

  const loggedUser = props.loggedUser;

  useEffect(() => {
    if (!users.get(loggedUser)) {
      navigate(`/`);
      return;
    }
});

  const handleProfessionClick = (profession) => {
    setSelectedProfession(profession);
    setPersonalSearch(false);
  };

  const handlePersonalSearchClick = () => {
    setSelectedProfession(null);
    setPersonalSearch(!ispersonalSearch);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filteredSuggestions = Object.values(workers_map)
        .map((person) => person.name)
        .filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        );
      setSuggestionsList(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : ["No matches found"]
      );
    } else {
      setSuggestionsList([]);
    }
  };
  
  const handleSuggestionClick = (value) => {
    setInputValue(value);
    setSuggestionsList([]);
  };
  
  const navigate = useNavigate();

  const handleSave = () => {
    navigate(`/home`);
  };

  const handleBack = () => {
    navigate(`/home`);
  };

  const color_list = ["blue", "red", "orange", "yellow", "pink", "brown"];

  const unselected_shiftsList = assignments[1].unselected_shiftsList;
  // const unselected_shiftsList = [
  //   {
  //     profession: "Doctor",
  //     day: "Monday",
  //     startHour: "10:00",
  //     endHour: "13:00",
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Monday",
  //     startHour: "14:00",
  //     endHour: "16:00",
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Wednesday",
  //     startHour: "11:00",
  //     endHour: "15:00",
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Thursday",
  //     startHour: "07:00",
  //     endHour: "12:00",
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Friday",
  //     startHour: "08:00",
  //     endHour: "18:00",
  //   },
  //   {
  //     profession: "Teacher",
  //     day: "Friday",
  //     startHour: "08:00",
  //     endHour: "10:00",
  //   },
  // ];

  const [unselected_shifts, setUnselected_shifts] = useState(
    unselected_shiftsList
  );

  var shifts_list = assignments[1].shifts_list;
  // var shifts_list = [
  //   {
  //     profession: "Doctor",
  //     day: "Sunday",
  //     startHour: "10:00",
  //     endHour: "17:00",
  //     idList: [33146],
  //     color: false,
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Sunday",
  //     startHour: "14:00",
  //     endHour: "17:00",
  //     idList: [],
  //     color: false,
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Sunday",
  //     startHour: "08:00",
  //     endHour: "15:00",
  //     idList: [],
  //     color: false,
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Tuesday",
  //     startHour: "10:00",
  //     endHour: "18:00",
  //     idList: [],
  //     color: false,
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Tuesday",
  //     startHour: "10:00",
  //     endHour: "19:00",
  //     idList: [],
  //     color: false,
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Tuesday",
  //     startHour: "07:00",
  //     endHour: "08:00",
  //     idList: [],
  //     color: false,
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Wednesday",
  //     startHour: "14:00",
  //     endHour: "16:00",
  //     idList: [],
  //     color: false,
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Thursday",
  //     startHour: "13:00",
  //     endHour: "16:00",
  //     idList: [],
  //     color: false,
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Thursday",
  //     startHour: "14:00",
  //     endHour: "16:00",
  //     idList: [],
  //     color: false,
  //   },
  //   {
  //     profession: "Doctor",
  //     day: "Thursday",
  //     startHour: "14:00",
  //     endHour: "17:00",
  //     idList: [],
  //     color: false,
  //   },
  // ];

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
  const [workers, setWorkers] = useState(workers_map);

  return (
    <div className="page-container">
      <div className="top-panel">
        <div className="table-name">Your Table Name</div>
        <div className="buttons">
          <button
            className="button"
            onClick={() => handlePersonalSearchClick()}
          >
            <i className="bi bi-person-circle"></i>&nbsp;&nbsp;&nbsp;Personal
            timetable
          </button>
          <button className="button">
            <i className="bi bi-clipboard2-check"></i>&nbsp;&nbsp;&nbsp;Status
          </button>
          <button className="button">
            <i className="bi bi-download"></i>&nbsp;&nbsp;&nbsp;Download
          </button>
          <button
            className="button"
            onClick={() => handleSave()}
          >
            <i className="bi bi-floppy"></i>&nbsp;&nbsp;&nbsp;Save
          </button>
          <button
            className="button"
            onClick={() => handleBack()}
          >
            <i className="bi bi-arrow-90deg-left"></i>&nbsp;&nbsp;&nbsp;Back
          </button>
        </div>
      </div>
      <div className="main-container">
        <div className="left-panel">
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
          ))}
        </div>
        <div className="main-panel">
          {ispersonalSearch ? (
            <div className="autocomplete-wrapper">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type Employee Name..."
                aria-autocomplete="list"
                aria-controls="autocomplete-list"
              />
              {suggestionsList.length > 0 && (
                <ul className="suggestions-list">
                  {suggestionsList.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      role="option"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div></div>
          )}
          <WeekShifts
            shifts={shifts}
            setShifts={setShifts}
            unselected_shifts={unselected_shifts}
            setUnselected_shifts={setUnselected_shifts}
            profession={selectedProfession}
            workers={workers}
            setWorkers={setWorkers}
            ispersonalSearch={ispersonalSearch}
            inputValue={inputValue}
          />
          <AddShiftWindow
            shifts={shifts}
            setShifts={setShifts}
            unselected_shifts={unselected_shifts}
            setUnselected_shifts={setUnselected_shifts}
            profession={selectedProfession}
            workers={workers}
            setWorkers={setWorkers}
            ispersonalSearch={ispersonalSearch}
            inputValue={inputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ShiftsPage;
