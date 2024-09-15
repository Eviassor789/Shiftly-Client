import React, { useState, useEffect, useRef } from "react";
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
import CircularProgress from "./CircularProgress";

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
  const [maxRequirementsMap, setmaxRequirementsMap] = useState("");
  const [grade, setGrade] = useState(0);
  const [flag, setFlag] = useState(true);

  const popupRef = useRef(null);



  

  

  const currentTableID = props.currentTableID;
  const setCurrentTableID = props.setCurrentTableID;
  const [workers, setWorkers] = useState({});
  const [currentTable, setCurrentTable] = useState(null);

  useEffect(() => {
    // Detect clicks outside the popup
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        toggleWindow();  // Close the window if click is outside
        // console.log("click outside");
      }
    };

    // console.log("isWindowOpen: ", isWindowOpen);

    if (isWindowOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isWindowOpen, toggleWindow]);




  function transformSolution(solution) {
    let result = [];

    Object.entries(solution).forEach(([shiftId, workerIds]) => {
      workerIds.forEach((workerId) => {
        result.push([workerId, parseInt(shiftId)]);
      });
    });

    return result.sort((a, b) => a[1] - b[1]);
  }

  function mergeRequirements(requirements) {
    const mergedRequirements = {};

    // Iterate through the list of requirements
    requirements.forEach(req => {
        const key = `${req.day}-${req.profession}-${req.hour}`; // Create a unique key based on day, profession, and hour

        // If this key already exists, sum the 'number' field
        if (mergedRequirements[key]) {
            mergedRequirements[key].number += req.number;
        } else {
            // If the key doesn't exist, initialize it
            mergedRequirements[key] = {
                day: req.day,
                profession: req.profession,
                hour: req.hour,
                number: req.number
            };
        }
    });

    // Convert the merged object back to an array
    return Object.values(mergedRequirements);
}

  const token = localStorage.getItem("jwtToken");

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
        // console.log("Token verification successful:", data);
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
        // console.log("currTable: ", currTable);
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
          let myMergedRequirements = mergeRequirements(fetchedRequirements)
          setrequirements(myMergedRequirements)

          // Create the evaluator with fetched requirements
          let myEvaluator = new ScheduleEvaluator(sortedShiftsList, workers, myMergedRequirements);
          setevaluator(myEvaluator)
          let solution = transformSolution(currentAssignment);
          let result = myEvaluator.getFitnessWithMoreInfo(solution);
          // console.log("result: ", result);
          setfitness([result.cost, result.satisfiedContracts, result.satisfiedRequirements, result.totalIdleWorkers,  result.totalRequirementsNum])
          setmaxRequirementsMap(result.maxRequirementsMap)

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
      let tempGrade = getGrade();
      setGrade(tempGrade);

      // console.log("result: ", result);
      setfitness([result.cost, result.satisfiedContracts, result.satisfiedRequirements, result.totalIdleWorkers, result.totalRequirementsNum])
      setmaxRequirementsMap(result.maxRequirementsMap)

    }

  }, [shifts, isWindowOpen, grade, tableId, workers, requirements, ispersonalSearch]);
  

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
    setSuggestionsList([]);
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

  const handleInputClick = () => {
    if(suggestionsList.length > 0){
      setSuggestionsList([]);
      return;
    }
    setSuggestionsList(
      Object.values(workers)
        .map((person) => person.name)
    );
    return;

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

      // console.log("Assignment updated successfully:", data.msg);
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  async function handleSave() {
    const assignment = {};

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

    // console.log("assignment 111", assignment);
    // Call the function to update the assignment on the server
    await updateAssignment(currentTable.id, assignment, token); // Replace with your actual token

    // Navigate to the home page
    navigate(`/home`);
  }

  async function DownloadByWorker() {
    let content = '<h1>Shift Assignments by Worker</h1>';
    let all_content_list = [];
    let i = 0;
  
    // Loop through the workers and their shifts
    for (const workerId in workers) {
      const worker = workers[workerId];
      let worker_content = `<p>Worker: ${worker.name}</p><ul>`;
  
      if (worker.shifts) {
        worker.shifts.forEach(shift => {
          i += 1;
          worker_content += `<li>${shift.day}, ${shift.start_hour} - ${shift.end_hour}, ${shift.profession}</li>`;
        });
      }
  
      worker_content += '</ul></br></br>';
  
      // Push content every time after 20 items or at the end of the worker list
      if (i > 17) {
        i = worker.shifts.length;
        all_content_list.push(content);
        content = "";
      }
  
      content += worker_content;
    }
  
    // Add any remaining content
    all_content_list.push(content);
  
    const pdf = new jsPDF();
  
    // Process each content chunk asynchronously
    for (const content of all_content_list) {
      let input = document.createElement('div');
      input.innerHTML = content;
  
      input.style.position = "absolute";
      input.style.top = "-9999px"; // Move it off-screen
  
      document.body.appendChild(input);
  
      try {
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
  
        // Add content as a page in the PDF
        pdf.addImage(imgData, "PNG", 10, 10);
  
        // If not the last page, add a new page
        if (content !== all_content_list[all_content_list.length - 1]) {
          pdf.addPage();
        }
  
        // Remove the temporary div after capturing it
        document.body.removeChild(input);
      } catch (error) {
        console.error("Error generating PDF: ", error);
      }
    }
  
    // Save the PDF after all pages have been added
    pdf.save("shift_assignments_by_worker.pdf");


  }

  async function DownloadByShift() {
    const pdf = new jsPDF();
    let all_content_list = [];
    let content = "<h1>Shift Assignments by Shift</h1>";
    let i = 0;

    let sortedShifts = [...shifts].sort((a, b) => {
      const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      // Compare profession first
      if (a.profession < b.profession) return -1;
      if (a.profession > b.profession) return 1;
    
      // If professions are the same, compare day using dayOrder
      const dayA = dayOrder.indexOf(a.day);
      const dayB = dayOrder.indexOf(b.day);
      if (dayA < dayB) return -1;
      if (dayA > dayB) return 1;
    
      // If both profession and day are the same, compare start_hour
      if (a.start_hour < b.start_hour) return -1;
      if (a.start_hour > b.start_hour) return 1;
    
      // If everything is the same
      return 0;
    });
  
    // Loop through the shifts and list workers for each shift
    sortedShifts.forEach((shift) => {
      
      
      let shift_content = `<p>(${shift.profession}, ${shift.day}, ${shift.start_hour} - ${shift.end_hour}):</p><ul>`;
  
      // For each worker ID in the shift's idList, get the worker name
      shift.idList.forEach((workerId) => {
        i += 1;
        const worker = workers[workerId];
        if (worker) {
          shift_content += `<li>${worker.name}</li>`;
        }
      });
  
      shift_content += "</ul></br>";
  
      // When i > 20, add the current content to the list and reset it
      if (i > 20) {
        i = shift.idList.length;
        all_content_list.push(content);
        content = "";      
      }
  
      content += shift_content;
    });
  
    // Push the last content if there's any remaining
    all_content_list.push(content);
  
    // Process each content asynchronously
    for (const content of all_content_list) {
      let input = document.createElement("div");
      input.innerHTML = content;
      document.body.appendChild(input);
  
      try {
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
  
        // Add content as a page in the PDF
        pdf.addImage(imgData, "PNG", 10, 10);
  
        // If not the last page, add a new page
        if (content !== all_content_list[all_content_list.length - 1]) {
          pdf.addPage();
        }
        
        // Clean up the DOM element
        document.body.removeChild(input);
      } catch (error) {
        console.error("Error generating PDF: ", error);
      }
    }
  
    // Save the PDF after all pages have been added
    pdf.save("shift_assignments_by_shift.pdf");


  }

  async function handleDownload() {

    DownloadByWorker();

    DownloadByShift()


  
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

    let idle_relation = fitness[3]/Object.values(workers).length;
    if (idle_relation > 1.5){
      idle_relation = 1.5
    }

    let number = (fitness[1]/Object.values(workers).length*55 + fitness[2]/fitness[4]*25 + (1-(idle_relation))*20);
    number = (number * 100);
    number = Math.round(number);
    number = (number/100).toFixed(2);
    return number;
  }

    // Function to handle opening/closing the status window
    function toggleWindow() {
      if (isWindowOpen) {
        setIsWindowOpen(false);
      } else {
      setIsWindowOpen(!isWindowOpen);
    }
    };
  
    // Function to handle selecting a status
    const handleStatusChange = (status) => {

      setSelectedStatus(status);
    };

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
      // console.log("unsatisfiedContracts: ", unsatisfiedContracts)

      return unsatisfiedContracts;
  }

  function findUnsatisfiedRequirements() {
    // Helper function to check if an hour is within a shift's range
    function isHourInRange(hour, start_hour, end_hour) {
        const hourInt = parseInt(hour.replace(':', ''), 10);
        const start_hourInt = parseInt(start_hour.replace(':', ''), 10);
        const end_hourInt = parseInt(end_hour.replace(':', ''), 10);
        return start_hourInt <= hourInt && hourInt < end_hourInt;
    }

    // List to store unsatisfied requirements
    const unsatisfiedRequirements = [];

    // Iterate over each requirement
    requirements.forEach(requirement => {
        const { day, profession, hour, number } = requirement;

        // Filter shifts that match the day and profession, and overlap with the requirement hour
        const relevantShifts = shifts.filter(shift => {
            return (
                shift.day === day &&
                shift.profession === profession &&
                isHourInRange(hour, shift.start_hour, shift.end_hour)
            );
        });

        // Calculate the total number of workers assigned to the relevant shifts
        const totalWorkers = relevantShifts.reduce((sum, shift) => {
            return sum + shift.idList.length; // Sum the number of workers in each shift
        }, 0);

        // If the total number of workers is less than the required number, add to unsatisfied list
        if (totalWorkers < number) {
            unsatisfiedRequirements.push({
                day,
                profession,
                hour,
                required: number,
                assigned: totalWorkers
            });
        }
    });

        // Sort the unsatisfied requirements by profession, day, and hour
        unsatisfiedRequirements.sort((a, b) => {
          // Sort by profession first
          if (a.profession !== b.profession) {
              return a.profession.localeCompare(b.profession);
          }
  
          // Then sort by day
          if (a.day !== b.day) {
              const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
          }
  
          // Finally, sort by hour
          const hourA = parseInt(a.hour.replace(':', ''), 10);
          const hourB = parseInt(b.hour.replace(':', ''), 10);
          return hourA - hourB;
      });

    // Return unsatisfied requirements in JSX format with <span> tags
    return unsatisfiedRequirements.map(req => (
        <span key={`${req.profession}-${req.day}-${req.hour}`} className="reqItem" style={{ display: 'block', margin: '5px 0' }}>
            {`${req.profession}, ${req.day}, ${req.hour}: ${req.assigned} / ${req.required}`}
        </span>
    ));
}

function UnsatisfiedRequirementsComponent() {
  const unsatisfiedElements = findUnsatisfiedRequirements();

  return (
      <div>
          <h3>Unsatisfied Requirements:</h3>
          {unsatisfiedElements.length > 0 ? (
              unsatisfiedElements
          ) : (
              <span>All requirements are satisfied!</span>
          )}
      </div>
  );
}

function UnsatisfiedContractsComponent() {
  const UnsatisfiedContracts = getAllUnsatisfyContracts().map((contract, index) => (
    <div><span key={index}>
      {contract.name}: {contract.actual_hours}/
      {contract.hours_per_week} hours
    </span><br></br></div>
  ));

  return (
      <div>
          <h3>Unsatisfied Contracts:</h3>
          {UnsatisfiedContracts.length > 0 ? (
            UnsatisfiedContracts
          ) : (
              <span>All Contracts are satisfied!</span>
          )}
      </div>
  );
}

function findShiftsWithIdleWorkersHTML() {
  // Array to store HTML strings for shifts with idle workers
  const shiftsWithIdleWorkers = [];

  // Iterate over each shift
  shifts.forEach((shift) => {
    const maxRequirement = maxRequirementsMap[shift.id]; // Get the max requirement for the shift

    // Check if the number of workers in the shift exceeds the maximum requirement
    if (shift.idList.length > maxRequirement && shift.idList.length > 0) {
      const idleWorkers = shift.idList.length - maxRequirement; // Calculate idle workers

      // Add the shift with idle workers to the result
      shiftsWithIdleWorkers.push({
        ...shift,
        idleWorkers, // Add the number of idle workers
      });
    }
  });

  // Sort the unsatisfied requirements by profession, day, and hour
  shiftsWithIdleWorkers.sort((a, b) => {
    // Sort by profession first
    if (a.profession !== b.profession) {
      return a.profession.localeCompare(b.profession);
    }

    // Then sort by day
    if (a.day !== b.day) {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
    }

    // Finally, sort by hour
    const hourA = parseInt(a.start_hour.replace(":", ""), 10);
    const hourB = parseInt(b.start_hour.replace(":", ""), 10);
    return hourA - hourB;
  });

  return shiftsWithIdleWorkers.map((shift) => (
    <span
      key={`${shift.day}-${shift.profession}-${shift.start_hour}-${shift.end_hour}`}
      style={{ display: "block", margin: "5px 0" }}
    >
      {` ${shift.profession}, ${shift.day}, ${shift.start_hour} - ${shift.end_hour}: ${shift.idleWorkers} idle workers`}
    </span>
  ));
}

function idleComponent() {
  const idle_workers = findShiftsWithIdleWorkersHTML();

  return (
      <div>
          <h3> shifts with idle workers:</h3>
          {idle_workers.length > 0 ? (
            idle_workers
          ) : (
              <span>There are no idle workers!</span>
          )}
      </div>
  );
}

  return (
    <>
      {currentTable && fitness ? (
        <>
          <div className="page-container" onScroll={toggleWindow}>
            <div className="top-panel">
              <div className="table-name">
                {currentTable ? currentTable.name : "Empty Table"}
              </div>
              <div className="buttons">
                <button
                  id="PersonalSearch"
                  className="button"
                  onClick={() => {
                    handlePersonalSearchClick(currentTable);
                  }}
                >
                  <i className="bi bi-person-circle"></i>
                  &nbsp;&nbsp;&nbsp;Personal timetable
                </button>
                <button className="button" ref={popupRef} onClick={toggleWindow}>
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
              <div className="grade">
                  <CircularProgress id="grade"
                    score={
                      grade && !isNaN(grade)
                        ? (() => {
                            let t = getGrade();
                            if (grade != t) {
                              setGrade(t);
                              return t;
                            }
                            return grade;
                          })()
                        : (() => {
                            setGrade(getGrade());
                            return "calculating...";
                          })()
                    }
                  ></CircularProgress>
                </div>
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
                  <div className="status-window" onMouseDown={(e) => {e.stopPropagation()}} onMouseUp={(e) => {e.stopPropagation()}}>
                  {/* Radio-like buttons */}
                  <div className="status-options">
                    <button
                      className={selectedStatus === "idle" ? "active" : ""}
                      onClick={() => handleStatusChange("idle")}
                    >
                      Idle
                    </button>
                    <button
                      className={selectedStatus === "contracts" ? "active" : ""}
                      onClick={() => handleStatusChange("contracts")}
                    >
                      Contracts
                    </button>
                    <button
                      className={selectedStatus === "requirments" ? "active" : ""}
                      onClick={() => handleStatusChange("requirments")}
                    >
                      Requirements
                    </button>
                    <button
                      className={selectedStatus === "full status" ? "active" : ""}
                      onClick={() => handleStatusChange("full status")}
                    >
                      Full Status
                    </button>
                  </div>
                
                  {/* Display data based on the selected button */}
                  <div className="status-content">
                    {selectedStatus === "idle" && (
                      <div>{idleComponent()}</div>
                    )}
                    {selectedStatus === "contracts" && (
                      <div> {UnsatisfiedContractsComponent()}</div>
                    )}
                    {selectedStatus === "requirments" && (
                      <div>{UnsatisfiedRequirementsComponent()}</div>
                    )}
                    {selectedStatus === "full status" && (
                      <div className="cost-container">
                        <div className="cost-item">
                          <span>Cost: {fitness[0]}</span>
                        </div>
                        <div className="cost-item">
                          <span style={{
                                color: fitness[1] < Object.values(workers).length ? "red" : "green",
                              }}> Contracts: {fitness[1]}/{Object.values(workers).length}</span>
                        </div>
                        <div className="cost-item">
                          <span style={{
                                color: fitness[2] < fitness[4] ? "#c90101" : "green",
                              }}> Requirements: {fitness[2]}/{fitness[4]}</span>
                        </div>
                        <div className="cost-item">
                          <span style={{
                                color: fitness[3] > 0 ? "red" : "green",
                              }}>Idle Workers: {fitness[3]}</span>
                          
                        </div>
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
                      onClick={handleInputClick}

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
        <>
          <LoadingPage msg="Loading your data" />
        </>
      )}
    </>
  );
};

export default ShiftsPage;
