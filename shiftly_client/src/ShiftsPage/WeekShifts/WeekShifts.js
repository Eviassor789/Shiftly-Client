import React, { useState, useEffect } from "react";
import Shift from "./Shift/Shift";
import "./WeekShifts.css";
import ShiftWindow from "./ShiftWindow/ShiftWindow";

const WeekShifts = ({
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
  setPersonalSearch,
  handleProfessionClick,
  render_fun,
  selectedProfession,
  setSelectedProfession,
  currentTable,
  setCurrentTable,
  professions,
  evaluator,
  setfitness,
  requirements
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

  let last = 0;
  let modulo = 0;

  if(selectedProfession && selectedProfession.startsWith("@")){
    setSelectedProfession(selectedProfession.slice(1));
  }
  

  const [shiftData, setShiftData] = useState({
    profession: profession,
    color: "",
    idList: [],
    start_hour: "",
    end_hour: "",
    day: "",
    showModal: false,
    id: 666,
    workers: [],
    cost: 0
  });

  const handleShiftClick = (newData) => {
    setShiftData(newData);
  };

  const handleCloseModal = () => {
    setShiftData({
      profession: profession,
      color: "",
      idList: [],
      start_hour: "",
      end_hour: "",
      day: "",
      showModal: false,
      id: 666,
      workers: [],
      cost: 0
    });

    // document.getElementById("PersonalSearch").click()
  };

  let placed_shifted = [],
    counter = 0;

  // Generate array of hours from 07:00 to 20:00
  const hours = [];
  for (let i = 7; i <= 20; i++) {
    hours.push(`${i.toString().padStart(2, "0")}:00`);
  }


  function maxChainOfOverLap(list, currentShift, state) {
    let maxOverlaps = 0;
    let currOverlaps = 0;
    let professionShift = list.filter(
      (shift) => shift.profession === profession
    );

    let arrayOne = [];
    let arrayTwo = [];

    arrayTwo.push(currentShift);

    do {
      arrayOne.length = 0;  // Clear array1
      arrayOne.push(...arrayTwo);  // Add all items from array2 to array1
      arrayTwo.length = 0;  // Clear array2

      maxOverlaps = currOverlaps;
      
      arrayOne.forEach((shift1) => {
        let temp = 0;

        professionShift.forEach((shift2) => {
          const overlaps = checkOverlap(shift1, shift2);
            if (overlaps) {
              temp++;
              arrayTwo.push(shift2)
            }
        });
        if(temp > currOverlaps){
          currOverlaps = temp;
        }
      });

    } while (currOverlaps > maxOverlaps);



    //i really dont know if it is better or not...:

    // if(maxOverlaps != 1 && state == 2){
    //   if (maxOverlaps == last){
    //     modulo = modulo%last +1;
    //     return modulo;
    //   }else{
    //     if(maxOverlaps > last)
    //     {last = maxOverlaps;}
    //     if(maxOverlaps < last)
    //       {last = 0;}
    //   }
    // }

    return maxOverlaps;

  }

  // Function to get the largest relevant requirement number for a shift
function getMaxRelevantRequirement(shiftData, requirements) {
  console.log("requirements: ", requirements)
  // Filter requirements based on the shift's day, profession, start_hour, and end_hour
  const relevantRequirements = requirements.filter(req => {
      return (
          req.day == shiftData.day &&
          req.profession == shiftData.profession
          && shiftData.start_hour <= req.hour
          && req.hour < shiftData.end_hour  
      );
  });
  console.log("relevantRequirements: ", relevantRequirements)


  // Map over relevant requirements and extract their numbers
  const requirementNumbers = relevantRequirements.map(req => req.number);

  // Return the largest number from the relevant requirements, or 0 if none found
  return requirementNumbers.length > 0 ? Math.max(...requirementNumbers) : 0;
}




  function checkOverlap(shift1, shift2) {
    // Convert start and end times to minutes for easier comparison
    const start1 = convertToMinutes(shift1.start_hour);
    const end1 = convertToMinutes(shift1.end_hour);
    const start2 = convertToMinutes(shift2.start_hour);
    const end2 = convertToMinutes(shift2.end_hour);

    // Check if the shifts overlap in time
    return (
      ((start2 < start1 && start1 < end2) ||
        (start2 < end1 && end1 < end2) ||
        (start1 < start2 && start2 < end1) ||
        (start1 < end2 && end2 < end1) 
        // || (start2 == start1 && end1 == end2)
      ) &&
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
  // className={personalSearch? "week-shifts personalSearch" : "week-shifts"}
  return (
    <div className={ispersonalSearch ? "week-shifts personalSearch" : "week-shifts"}>
      <table>
        <thead>
          <tr>
            <th>&#32;</th> {/* Empty cell for spacing */}
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
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
                let relevantShifts;
                if (ispersonalSearch) {
                  relevantShifts = shifts.filter(
                    (s) =>
                      s.day === day &&
                      hour === s.start_hour &&
                      s.idList.some((id) => workers[id].name === inputValue)
                  );
                } else {
                  relevantShifts = shifts.filter(
                    (s) =>
                      s.day === day &&
                      hour === s.start_hour &&
                      profession === s.profession
                  );
  
                  // relevantShifts.forEach((shift) => {
                  //   shift.idList.forEach((id) => {
                  //     workers[id].shifts = [
                  //       ...workers[id].shifts,
                  //       {
                  //         profession: shift.profession,
                  //         day: shift.day,
                  //         start_hour: shift.start_hour,
                  //         end_hour: shift.end_hour,
                  //       },
                  //     ];
                  //   });
                  // });

                  let temp_workers = workers;
                  Object.values(temp_workers).forEach((worker) => {
                    worker.shifts = []
                  })
                
                  shifts.forEach((shift) => {
                    shift.idList.forEach((id) => {
                      temp_workers[id].shifts = [
                        ...temp_workers[id].shifts,
                        {
                          profession: shift.profession,
                          day: shift.day,
                          start_hour: shift.start_hour,
                          end_hour: shift.end_hour,
                        },
                      ];
                    });
                  });
                  setWorkers(temp_workers)
                }
  
                return (
                  <td key={day}>
                    {relevantShifts.map((shift, index) => ( placed_shifted.push(shift) &&
                      <div
                        key={shift.idList.join('-') + index} // Ensure unique key for each shift
                        onClick={() =>
                          handleShiftClick({
                            profession: shift.profession,
                            color: shift.color,
                            idList: shift.idList,
                            start_hour: shift.start_hour,
                            end_hour: shift.end_hour,
                            day: day,
                            showModal: true,
                            id: shift.id,
                            workers: shift.workers,
                            cost:shift.cost
                          })
                        }
                      >
                        <Shift
                          key={shift.idList.join('-') + index} // Ensure unique key for each Shift component
                          start_hour={shift.start_hour}
                          end_hour={shift.end_hour}
                          idList={shift.idList}
                          overlapNum={maxChainOfOverLap(shifts, shift, 1)}
                          place={maxChainOfOverLap(placed_shifted, shift, 2)}
                          color={
                            shift.color
                              ? shift.color
                              : color_list[counter++ % color_list.length]
                          }
                          ispersonalSearch={ispersonalSearch}
                          profession={shift.profession}
                          workers={workers}
                          professions={professions}
                        />
                      </div>
                    ))}
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
              shiftData={shiftData}
              requiredWorkers={getMaxRelevantRequirement(shiftData, requirements)}
              onClose={handleCloseModal}
              shifts={shifts}
              setShifts={setShifts}
              unselected_shifts={unselected_shifts}
              setUnselected_shifts={setUnselected_shifts}
              workers={workers}
              setWorkers={setWorkers}
              currentTableID={currentTableID}
              currentTable={currentTable}
              setPersonalSearch={setPersonalSearch}
              handleProfessionClick={handleProfessionClick}
              render_fun={render_fun}
              selectedProfession={selectedProfession}
              setSelectedProfession={setSelectedProfession}
              evaluator={evaluator}
              setfitness={setfitness}
              requirements={requirements}
            />
          </div>
        </>
      )}
    </div>
  );
  
};

export default WeekShifts;
