import React, { useState } from "react";
import Shift from "./Shift/Shift";
import "./WeekShifts.css";
import ShiftWindow from "./ShiftWindow/ShiftWindow";
import workers_map from "../../Data/Workers";

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
}) => {
  const color_list = ["blue", "red", "orange", "yellow", "pink", "brown"];
  let last = 0;
  let modulo = 0;

  if(selectedProfession && selectedProfession.startsWith("@")){
    setSelectedProfession(selectedProfession.slice(1));
  }
  

  const [shiftData, setShiftData] = useState({
    profession: profession,
    color: "",
    idList: [],
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
      profession: profession,
      color: "",
      idList: [],
      startHour: "",
      endHour: "",
      day: "",
      showModal: false,
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

  // function getMaxDayOverlaps(currentShift) {
  //   let max = 0;

  //   var dayShift = shifts.filter(
  //     (shift) =>
  //       shift.profession === profession && shift.day === currentShift.day
  //   );

  //   for (let i = 0; i < dayShift.length; i++) {
  //     let temp = getMaxOverlaps(dayShift, dayShift[i]);
  //     if (temp > max) {
  //       max = temp;
  //     }
  //   }

  //   return max;
  // }

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


    if(maxOverlaps != 1 && state == 2){
      if (maxOverlaps == last){
        modulo = modulo%last +1;
        return modulo;
      }else{
        if(maxOverlaps > last)
        {last = maxOverlaps;}
        // if(maxOverlaps < last)
        //   {last = 0;}
      }
    }

    return maxOverlaps;

  }


  // function getMaxOverlaps(professionShift, currentShift) {
  //   let maxOverlaps = 0;

  //   // var professionShift = shifts.filter(
  //   //   (shift) => shift.profession === profession
  //   // );

  //   for (let i = 0; i < professionShift.length; i++) {
  //     if (professionShift[i] !== currentShift) {
  //       const overlaps = checkOverlap(currentShift, professionShift[i]);
  //       if (overlaps) {
  //         maxOverlaps++;
  //       }
  //     }
  //   }

  //   return maxOverlaps;
  // }

  function checkOverlap(shift1, shift2) {
    // Convert start and end times to minutes for easier comparison
    const start1 = convertToMinutes(shift1.startHour);
    const end1 = convertToMinutes(shift1.endHour);
    const start2 = convertToMinutes(shift2.startHour);
    const end2 = convertToMinutes(shift2.endHour);

    // Check if the shifts overlap in time
    return (
      ((start2 < start1 && start1 < end2) ||
        (start2 < end1 && end1 < end2) ||
        (start1 < start2 && start2 < end1) ||
        (start1 < end2 && end2 < end1)) &&
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
    <div
      className={
        ispersonalSearch ? "week-shifts personalSearch" : "week-shifts"
      }
    >
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

                var relevantShifts;
                if (ispersonalSearch) {
                  relevantShifts = shifts.filter(
                    (s) =>
                      s.day === day &&
                      hour === s.startHour &&
                      s.idList.some((id) => workers_map[id].name === inputValue)
                  );
                } else {
                  relevantShifts = shifts.filter(
                    (s) =>
                      s.day === day &&
                      hour === s.startHour &&
                      profession === s.profession
                  );

                  relevantShifts.forEach((shift) => {
                    shift.idList.forEach((id) => {
                      workers_map[id].shifts = [
                        ...workers_map[id].shifts,
                        {
                          profession: shift.profession,
                          day: shift.day,
                          startHour: shift.startHour,
                          endHour: shift.endHour,
                        },
                      ];
                    });
                  });
                }
                return (
                  <td key={day + hour}>
                    {relevantShifts.map(
                      (shift, index) =>
                        placed_shifted.push(shift) &&(
                          <div
                            onClick={() =>
                              handleShiftClick({
                                profession: shift.profession,
                                color: shift.color,
                                idList: shift.idList,
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
              shiftData={shiftData}
              requiredWorkers={3}
              onClose={handleCloseModal}
              shifts={shifts}
              setShifts={setShifts}
              unselected_shifts={unselected_shifts}
              setUnselected_shifts={setUnselected_shifts}
              workers={workers}
              setWorkers={setWorkers}
              currentTableID={currentTableID}
              setPersonalSearch={setPersonalSearch}
              handleProfessionClick={handleProfessionClick}
              render_fun={render_fun}
              selectedProfession={selectedProfession}
              setSelectedProfession={setSelectedProfession}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WeekShifts;
