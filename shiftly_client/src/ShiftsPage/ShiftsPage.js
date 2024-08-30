import React, { useState, useEffect } from "react";
import WeekShifts from "./WeekShifts/WeekShifts";
import "./ShiftsPage.css";
import AddShiftWindow from "./AddShiftWindow/AddShiftWindow";
import workers_map from "../Data/Workers";
import { useNavigate } from "react-router-dom";
import users from "../Data/Users";
import tables_map from "../Data/TableArchive";
import assignments from "../Data/Assignments";
import requirements from "../Data/Requirements";
import ScheduleEvaluator from "../ScheduleEvaluator";

const ShiftsPage = (props) => {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [ispersonalSearch, setPersonalSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [unselected_shifts, setUnselected_shifts] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [render, setRender] = useState(false);

  const loggedUser = props.loggedUser;
  const currentTableID = props.currentTableID;
  const setCurrentTableID = props.setCurrentTableID;
  const [workers, setWorkers] = useState(workers_map);
  const [currentTable, setCurrentTable] = useState(null);

  //##################################################################################################

  function transformSolution(solution) {
    let result = [];

    Object.entries(solution).forEach(([shiftId, workerIds]) => {
        workerIds.forEach(workerId => {
            result.push([workerId, parseInt(shiftId)]);
        });
    });

    return result.sort((a, b) => a[1] - b[1]);;
}

  //########################################################################################################3

  const navigate = useNavigate();

  useEffect(() => {
    if (!users.get(loggedUser)) {
      navigate(`/`);
      return;
    }

    const currTable = tables_map.get(currentTableID);
    console.log("currTable: ", currTable);
    setCurrentTable(currTable);

    if (tables_map && currTable) {
      const currentAssignment = currTable.assignment;
      console.log("currentAssignment: ", currTable.assignment);

      if (currentAssignment) {
        setProfessions(currTable.professions || []);
        // setWorkers(currTable.workers)

        const all_shifts = currTable.shifts;
        // console.log("all_shifts: ", all_shifts);
        const currentAssignmentKeys = new Set(
          Object.keys(currentAssignment).map(Number)
        );
        setUnselected_shifts(
          all_shifts.filter((shift) => !currentAssignmentKeys.has(shift.ID)) ||
            []
        );

        const sortedShiftsList =
          all_shifts.filter((shift) => currentAssignmentKeys.has(shift.ID)) ||
          [];

        console.log("all_shifts num 2 : ", all_shifts);
        console.log("currentAssignmentKeys : ", currentAssignmentKeys);


        // Iterate over each shift in all_shifts
        sortedShiftsList.forEach((shift) => {
          if (currentAssignment[shift.ID]) {
            shift.idList = currentAssignment[shift.ID];
          } else {
            shift.idList = [];
          }
        });

        //   console.log("workers_map: ", workers_map)

        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        sortedShiftsList.sort((a, b) => {
          const dayIndexA = daysOfWeek.indexOf(a.day);
          const dayIndexB = daysOfWeek.indexOf(b.day);

          if (a.startHour !== b.startHour) {
            return a.startHour.localeCompare(b.startHour); // Sort by day index
          } else {
            return dayIndexA - dayIndexB; // If day is the same, sort by start hour
          }
        });

        const color_list = ["blue", "red", "orange", "yellow", "pink", "brown"];
        let counter = 0;
        sortedShiftsList.forEach((shift) => {
          shift.color = color_list[counter++ % color_list.length];
        });

        setShifts(sortedShiftsList);
        console.log("sortedShiftsList: ", sortedShiftsList);

        const evaluator = new ScheduleEvaluator(sortedShiftsList, workers_map, requirements);
        let solution = transformSolution(currentAssignment);
        const result = evaluator.getFitnessWithMoreInfo(solution);
        console.log("result: ", result );
      }
    }
  }, [loggedUser, currentTableID, navigate]);

  const handleProfessionClick = (profession) => {
    setSelectedProfession(profession);
    setPersonalSearch(false);
  };

  function render_fun() {
    setRender(!render);
  }

  function handleProfessionClickGIMIC(profession) {
    setSelectedProfession(profession);
    setPersonalSearch(false);
  }

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

  const handleSave = () => {
    navigate(`/home`);
  };

  const handleBack = () => {
    navigate(`/home`);
  };

  return (
    <div className="page-container">
      <div className="top-panel">
        <div className="table-name">
          {tables_map.get(currentTableID)
            ? tables_map.get(currentTableID).name
            : "Empty Table"}
        </div>
        <div className="buttons">
          <button
            id="PersonalSearch"
            className="button"
            onClick={handlePersonalSearchClick}
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
          <button className="button" onClick={handleSave}>
            <i className="bi bi-floppy"></i>&nbsp;&nbsp;&nbsp;Save
          </button>
          <button className="button" onClick={handleBack}>
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
            currentTableID={currentTableID}
            setPersonalSearch={setPersonalSearch}
            handleProfessionClick={handleProfessionClickGIMIC}
            render_fun={render_fun}
            selectedProfession={selectedProfession}
            setSelectedProfession={setSelectedProfession}
            currentTable={currentTable}
            setCurrentTable={setCurrentTable}
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
            currentTableID={currentTableID}
            handleProfessionClick={handleProfessionClickGIMIC}
            currentTable={currentTable}
            setCurrentTable={setCurrentTable}
          />
        </div>
      </div>
    </div>
  );
};

export default ShiftsPage;
