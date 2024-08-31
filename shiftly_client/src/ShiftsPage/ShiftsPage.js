import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WeekShifts from "./WeekShifts/WeekShifts";
import "./ShiftsPage.css";
import AddShiftWindow from "./AddShiftWindow/AddShiftWindow";
// import workers_map from "../Data/Workers";
import { useNavigate } from "react-router-dom";
import users from "../Data/Users";
import tables_map from "../Data/TableArchive";
import assignments from "../Data/Assignments";
import requirements from "../Data/Requirements";
import ScheduleEvaluator from "../ScheduleEvaluator";

const ShiftsPage = (props) => {

  const { tableId } = useParams(); // Extract the table ID from the URL
  const navigate = useNavigate();

  const [selectedProfession, setSelectedProfession] = useState(null);
  const [ispersonalSearch, setPersonalSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [unselected_shifts, setUnselected_shifts] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [render, setRender] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");

  const currentTableID = props.currentTableID;
  const setCurrentTableID = props.setCurrentTableID;
  const [workers, setWorkers] = useState({});
  const [currentTable, setCurrentTable] = useState(null);

  function transformSolution(solution) {
    let result = [];

    Object.entries(solution).forEach(([shiftId, workerIds]) => {
        workerIds.forEach(workerId => {
            result.push([workerId, parseInt(shiftId)]);
        });
    });

    return result.sort((a, b) => a[1] - b[1]);;
}


  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/protected", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token verification failed");
        }

        const data = await response.json();
        console.log("Token verification successful:", data);
        setLoggedUser(data.current_user);
      } catch (error) {
        console.error("Error:", error);
        navigate("/");
      }
    };

    if (token) {
      verifyToken();
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/table/${tableId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch table data from the server");
        }
  
        const currTable = await response.json();
        console.log("currTable: ", currTable);
        setCurrentTable(currTable);
  
        if (currTable) {
          const currentAssignment = currTable.assignment;
          setProfessions(currTable.professions || []);
  
          const all_shifts = currTable.shifts;
          const currentAssignmentKeys = new Set(
            Object.keys(currentAssignment).map(Number)
          );
  
          setUnselected_shifts(
            all_shifts.filter((shift) => !currentAssignmentKeys.has(shift.id)) || []
          );
  
          const sortedShiftsList = 
    all_shifts.filter((shift) => currentAssignmentKeys.has(shift.id)) || [];

    // Create the workers map
    const workersMap = {};

    sortedShiftsList.forEach((shift) => {
        // Update the shift's idList with workers from the current assignment
        shift.idList = currentAssignment[shift.id] || [];

        // Iterate over each worker in the shift
        shift.workers.forEach((worker) => {
            // If the worker is not already in the workersMap, add them
            if (!workersMap[worker.id]) {
                workersMap[worker.id] = {
                    ID: worker.id,
                    name: worker.name,
                    professions: worker.professions,
                    days: worker.days,
                    shifts: [],  // This will be populated with shift details
                    relevant_shifts_id: worker.relevant_shifts_id,
                    hours_per_week: worker.hours_per_week,
                };
            }

            // Add the current shift to the worker's shifts array
            workersMap[worker.id].shifts.push({
                shiftId: shift.id,
                profession: shift.profession,
                day: shift.day,
                startHour: shift.start_hour,
                endHour: shift.end_hour,
                cost: shift.cost,
                color: shift.color,
            });
        });
    });

    // Finally, update the state with the populated workersMap
    setWorkers(workersMap);
  
          const daysOfWeek = [
            "Sunday", "Monday", "Tuesday", "Wednesday", 
            "Thursday", "Friday", "Saturday"
          ];
  
          sortedShiftsList.sort((a, b) => {
            const dayIndexA = daysOfWeek.indexOf(a.day);
            const dayIndexB = daysOfWeek.indexOf(b.day);
  
            if (a.startHour !== b.startHour) {
              return a.startHour.localeCompare(b.startHour);
            } else {
              return dayIndexA - dayIndexB;
            }
          });
  
          const color_list = ["blue", "red", "orange", "yellow", "pink", "brown"];
          let counter = 0;
          sortedShiftsList.forEach((shift) => {
            shift.color = color_list[counter++ % color_list.length];
          });
          console.log("sortedShiftsList:", sortedShiftsList);
          setShifts(sortedShiftsList);
  
          const evaluator = new ScheduleEvaluator(sortedShiftsList, workersMap, requirements);
          let solution = transformSolution(currentAssignment);
          const result = evaluator.getFitnessWithMoreInfo(solution);
          console.log("result: ", result);
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
        navigate("/");
      }
    };

    if (tableId && token) {
        fetchTableData();
    }
}, [tableId, loggedUser, navigate, token]);

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
      const filteredSuggestions = Object.values(workers)
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
          {tables_map.get(currentTableID) ? tables_map.get(currentTableID).name : "Empty Table"}
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
