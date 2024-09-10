import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
// import 'jspdf-autotable';
import { useParams } from "react-router-dom";
import WeekShifts from "./WeekShifts/WeekShifts";
import "./ShiftsPage.css";
import AddShiftWindow from "./AddShiftWindow/AddShiftWindow";
import { useNavigate } from "react-router-dom";
import ScheduleEvaluator from "../ScheduleEvaluator";
import html2canvas from "html2canvas";
import LoadingPage from "../LoadingPage";

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
  const [fitness, setfitness] = useState("");
  const [evaluator, setevaluator] = useState("");
  const [requirements, setrequirements] = useState("");
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('full status');



  const currentTableID = props.currentTableID;
  const setCurrentTableID = props.setCurrentTableID;
  const [workers, setWorkers] = useState({});
  const [currentTable, setCurrentTable] = useState(null);

  function transformSolution(solution) {
    let result = [];

    Object.entries(solution).forEach(([shiftId, workerIds]) => {
      workerIds.forEach((workerId) => {
        result.push([workerId, parseInt(shiftId)]);
      });
    });

    return result.sort((a, b) => a[1] - b[1]);
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

  function getDay(shiftDay) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Helper function to map a digit to a day
    function mapDigitToDay(digit) {
      if (!isNaN(digit)) {
        return daysOfWeek[parseInt(digit) - 1];
      } else {
        return digit;
      }
    }

    // If the input is an array, map each digit to its corresponding day
    if (Array.isArray(shiftDay)) {
      return shiftDay.map((day) => mapDigitToDay(day));
    } else {
      // Handle single day input
      return mapDigitToDay(shiftDay);
    }
  }

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        // Fetch table data
        const tableResponse = await fetch(
          `http://localhost:5000/table/${tableId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!tableResponse.ok) {
          throw new Error("Failed to fetch table data from the server");
        }

        const currTable = await tableResponse.json();
        console.log("currTable: ", currTable);
        setCurrentTable(currTable);

        if (currTable) {
          const currentAssignment = currTable.assignment;
          setProfessions(currTable.professions || []);
          setSelectedProfession(currTable.professions[0] || null);

          const all_shifts = currTable.shifts;
          const currentAssignmentKeys = new Set(
            Object.keys(currentAssignment).map(Number)
          );

          setUnselected_shifts(
            all_shifts.filter(
              (shift) => !currentAssignmentKeys.has(shift.id)
            ) || []
          );

          const sortedShiftsList =
            all_shifts.filter((shift) => currentAssignmentKeys.has(shift.id)) ||
            [];

          // Create the workers map
          const workersMap = {};

          sortedShiftsList.forEach((shift) => {
            shift.idList = currentAssignment[shift.id] || [];

            shift.workers.forEach((worker) => {
              if (!workersMap[worker.id]) {
                workersMap[worker.id] = {
                  id: worker.id,
                  name: worker.name,
                  professions: worker.professions,
                  days: getDay(worker.days),
                  shifts: [],
                  relevant_shifts_id: worker.relevant_shifts_id,
                  hours_per_week: worker.hours_per_week,
                };
              }

              workersMap[worker.id].shifts.push({
                shiftId: shift.id,
                profession: shift.profession,
                day: shift.day,
                start_hour: shift.start_hour,
                end_hour: shift.end_hour,
                cost: shift.cost,
                color: shift.color,
              });
            });
          });

          const temp_workers = currTable.all_workers.reduce((map, worker) => {
            map[worker.id] = { ...worker, days: getDay(worker.days) };
            return map;
          }, {});

          console.log("temp_workers: ", temp_workers);

          setWorkers(temp_workers);

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

            if (a.start_hour !== b.start_hour) {
              return a.start_hour.localeCompare(b.start_hour);
            } else {
              return dayIndexA - dayIndexB;
            }
          });

          const color_list = [
            "#6CA1D1",
            "#D1E0F2",
            "#FFA96B",
            "#F4E285",
            "#A35C5C",
            "#5F9EA0",
            "#61A886",
          ];

          let counter = 0;
          sortedShiftsList.forEach((shift) => {
            shift.color = color_list[counter++ % color_list.length];
          });

          setShifts(sortedShiftsList);

          // Fetch the requirements
          const requirementsResponse = await fetch(
            `http://localhost:5000/requirements/${tableId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!requirementsResponse.ok) {
            throw new Error("Failed to fetch requirements from the server");
          }

          const fetchedRequirements = await requirementsResponse.json();
          console.log("Fetched Requirements:", fetchedRequirements);
          setrequirements(fetchedRequirements)

          // Create the evaluator with fetched requirements
          let myEvaluator = new ScheduleEvaluator(sortedShiftsList, workers, fetchedRequirements);
          setevaluator(myEvaluator)
          let solution = transformSolution(currentAssignment);
          let result = myEvaluator.getFitnessWithMoreInfo(solution);
          console.log("result: ", result);
          setfitness([result.cost, result.satisfiedContracts, result.satisfiedRequirements, result.totalIdleWorkers])
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/");
      }
    };

    if (tableId && token) {
      fetchTableData();
    }
  }, [tableId, loggedUser, navigate, token]);

  useEffect(() => {
    
    if(requirements && shifts && workers){
      let myEvaluator = new ScheduleEvaluator(shifts, workers, requirements);
      setevaluator(myEvaluator)
      let solution = transformSolution(getAssinment());
      let result = myEvaluator.getFitnessWithMoreInfo(solution);
      console.log("result: ", result);
      setfitness([result.cost, result.satisfiedContracts, result.satisfiedRequirements, result.totalIdleWorkers])
    }

  }, [shifts, selectedProfession]);
  

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

  const handlePersonalSearchClick = (table) => {
    if(!ispersonalSearch) {
      setSelectedProfession(null);
    }
    else {
      setSelectedProfession(table.professions[0] || null);
    }
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

  const updateAssignment = async (tableId, assignment, token) => {
    try {
      const response = await fetch("http://localhost:5000/update_assignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tableId,
          assignment,
          shifts: currentTable.shifts,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to update assignment");
      }

      console.log("Assignment updated successfully:", data.msg);
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  async function handleSave() {
    const assignment = {};

    // Iterate over each shift
    shifts.forEach((shift) => {
      console.log("shift 111", shift);

      // Initialize the assignment object for the shift if it doesn't exist
      if (!assignment[shift.id]) {
        assignment[shift.id] = [];
      }

      // Loop through the idList of the shift (which contains worker IDs)
      shift.idList.forEach((workerId) => {
        // Add the worker's ID to the array for the corresponding shiftId
        assignment[shift.id].push(workerId);
      });
    });

    console.log("assignment 111", assignment);
    // Call the function to update the assignment on the server
    await updateAssignment(currentTable.id, assignment, token); // Replace with your actual token

    // Navigate to the home page
    navigate(`/home`);
  }

  async function handleDownload() {
    // let content = '<h1>Shift Assignments by worker</h1>';
    // console.log("shifts: ", shifts);

    // // Loop through the workers and their shifts
    // for (const workerId in workers) {
    //     const worker = workers[workerId];
    //     content += `<p>Worker: ${worker.name}</p><ul>`;

    //     if (worker.shifts){        worker.shifts.forEach(shift => {
    //       content += `<li>${shift.day}, ${shift.start_hour} - ${shift.end_hour}, ${shift.profession}</li>`;
    //   });}

    //     content += '</ul></br></br>';
    // }

    // // Generate the PDF content
    // let input = document.createElement('div');
    // input.innerHTML = content;

    // input.style.position = "absolute";
    // input.style.top = "-9999px"; // Move it off-screen

    // document.body.appendChild(input);

    // html2canvas(input)
    //   .then((canvas) => {
    //     const imgData = canvas.toDataURL("image/png");
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, "PNG", 10, 10);
    //     pdf.save("shift_assignments.pdf");

    //     // Remove the temporary div after capturing it
    //     document.body.removeChild(input);
    //   })
    //   .catch((error) => {
    //     console.error("Error generating PDF: ", error);
    //   });

    ///////////////////////////////////////////////

    let content = "<h1>Shift Assignments by Shift</h1>";

    // Loop through the shifts and list workers for each shift
    shifts.forEach((shift) => {
      content += `<p>(${shift.profession}, ${shift.day}, ${shift.start_hour} - ${shift.end_hour}):</p><ul>`;

      // For each worker ID in the shift's idList, get the worker name
      shift.idList.forEach((workerId) => {
        const worker = workers[workerId];
        if (worker) {
          content += `<li>${worker.name}</li>`;
        }
      });

      content += "</ul></br>";
    });

    // Generate the PDF content
    let input = document.createElement("div");
    input.innerHTML = content;
    document.body.appendChild(input);

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10);
        pdf.save("shift_assignments_by_shift.pdf");
        document.body.removeChild(input);
      })
      .catch((error) => {
        console.error("Error generating PDF: ", error);
      });
  
  
  
  }


  const handleBack = () => {
    navigate(`/home`);
  };

  function getAssinment() {
    let assignment = {};

    // Iterate over each shift
    shifts.forEach((shift) => {
      // console.log("shift 111", shift);

      // Initialize the assignment object for the shift if it doesn't exist
      if (!assignment[shift.id]) {
        assignment[shift.id] = [];
      }

      // Loop through the idList of the shift (which contains worker IDs)
      shift.idList.forEach((workerId) => {
        // Add the worker's ID to the array for the corresponding shiftId
        assignment[shift.id].push(workerId);
      });
    });
    return assignment
  }

  function getGrade() {
    let number = (selectedProfession)? (fitness[1]/Object.values(workers).length*50 + fitness[2]/requirements.length*35 + fitness[3]/Object.values(workers).length*15) : ""
    number = (number * 100)
    number = Math.round(number)
    number = number/100
    return number
  }

    // Function to handle opening/closing the status window
    const toggleWindow = () => {
      setIsWindowOpen(!isWindowOpen);
    };
  
    // Function to handle selecting a status
    const handleStatusChange = (status) => {
      setSelectedStatus(status);
    };

    function getAllIdles() {
      
    }

    function getAllUnsatisfyContracts() {
      const unsatisfiedContracts = [];
  
      // Iterate over each worker
      for (const workerId in workers) {
          const worker = workers[workerId];
          const totalHours = worker.shifts.reduce((sum, shift) => {
              const start = parseInt(shift.start_hour);
              const end = parseInt(shift.end_hour);
              return sum + (end - start);
          }, 0);
  
          // Check if the worker's total hours are less than their contract hours
          if (totalHours < worker.hours_per_week) {
              unsatisfiedContracts.push({
                  name: worker.name,
                  hours_per_week: worker.hours_per_week,
                  actual_hours: totalHours
              });
          }
      }
      console.log("unsatisfiedContracts: ", unsatisfiedContracts)

      return unsatisfiedContracts;
  }


  return (
    <>
      {currentTable ? (
        <>
          <div className="page-container">
            <div className="top-panel">
              <div className="table-name">
                {currentTable ? currentTable.name : "Empty Table"}
              </div>
              <div className="buttons">
                {getGrade()}
                <button
                  id="PersonalSearch"
                  className="button"
                  onClick={() => {handlePersonalSearchClick(currentTable)}}
                >
                  <i className="bi bi-person-circle"></i>
                  &nbsp;&nbsp;&nbsp;Personal timetable
                </button>
                <button className="button" onClick={toggleWindow}>
                  <i className="bi bi-clipboard2-check"></i>
                  &nbsp;&nbsp;&nbsp;Status
                </button>
                <button className="button" onClick={handleDownload}>
                  <i className="bi bi-download"></i>&nbsp;&nbsp;&nbsp;Download
                </button>
                <button className="button" onClick={handleSave}>
                  <i className="bi bi-floppy"></i>&nbsp;&nbsp;&nbsp;Save
                </button>
                <button className="button" onClick={handleBack}>
                  <i className="bi bi-arrow-90deg-left"></i>
                  &nbsp;&nbsp;&nbsp;Cancel
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
                {isWindowOpen && (
                  <div className="status-window">
                    {/* Radio-like buttons */}
                    <div className="status-options">
                      <button
                        className={selectedStatus === "idle" ? "active" : ""}
                        onClick={() => handleStatusChange("idle")}
                      >
                        Idle
                      </button>
                      <button
                        className={
                          selectedStatus === "contracts" ? "active" : ""
                        }
                        onClick={() => handleStatusChange("contracts")}
                      >
                        Contracts
                      </button>
                      <button
                        className={
                          selectedStatus === "requirments" ? "active" : ""
                        }
                        onClick={() => handleStatusChange("requirments")}
                      >
                        Requirements
                      </button>
                      <button
                        className={
                          selectedStatus === "full status" ? "active" : ""
                        }
                        onClick={() => handleStatusChange("full status")}
                      >
                        full status
                      </button>
                    </div>

                    {/* Display data based on the selected button */}
                    <div className="status-content">
                      {selectedStatus === "idle" && <div>Idle Data</div>}
                      {selectedStatus === "contracts" && (
                        <div>
                          {" "}
                          {getAllUnsatisfyContracts().map((contract, index) => (
                            <div><span key={index}>
                              {contract.name}: {contract.actual_hours}/
                              {contract.hours_per_week} hours
                            </span><br></br></div>
                          ))}
                        </div>
                      )}
                      {selectedStatus === "requirments" && (
                        <div>Requirements Data</div>
                      )}
                      {selectedStatus === "full status" && (
                        <div>
                          <span>Cost: {fitness[0]}</span>
                          <br />
                          <span>
                            contracts:{fitness[1]}/
                            {Object.values(workers).length}
                          </span>
                          <br />
                          <span>
                            req:{fitness[2]}/{requirements.length}
                          </span>
                          <br />
                          <span>
                            idle:{fitness[3]}/{Object.values(workers).length}
                          </span>
                          <br />
                        </div>
                      )}
                    </div>
                  </div>
                )}

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
                  professions={professions}
                  evaluator={evaluator}
                  setfitness={setfitness}
                  requirements={requirements}
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
        </>
      ) : (
        <LoadingPage msg="Loading your data" />
      )}
    </>
  );
};

export default ShiftsPage;
