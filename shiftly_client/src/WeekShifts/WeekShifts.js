import React from "react";
import Shift from "./Shift/Shift";
import "./WeekShifts.css";

const WeekShifts = () => {
  const color_list = ["blue", "red", "orange", "yellow", "pink", "brown"];

  let placed_shifted = [],
    counter = 0;
  const shifts = [
    {
      day: "Sunday",
      startHour: "10:00",
      endHour: "17:00",
      names: ["Alice", "Bob"],
    },
    {
      day: "Sunday",
      startHour: "14:00",
      endHour: "17:00",
      names: ["Alice", "Bob"],
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
      names: ["AAA", "BBB"],
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
      endHour: "16:00",
      names: ["AAA", "BBB"],
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
    if (start1 == 420 && shift1.day === shift2.day) {
      console.log("start1: " + start1);
      console.log("end1: " + end1);
      console.log("start2: " + start2);
      console.log("end2: " + end2);
      console.log("shift1.day: " + shift1.day);
      console.log("shift2.day: " + shift2.day);
    }

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
              <td>{hour}</td>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ].map((day) => {
                const relevantShifts = shifts.filter(
                  (s) => s.day === day && hour === s.startHour
                );

                return (
                  <td
                    key={day + hour}
                    className={relevantShifts.length > 0 ? "during-shift" : ""}
                  >
                    {relevantShifts.map(
                      (shift, index) =>
                        placed_shifted.push(shift) && (
                          <Shift
                            key={index}
                            startHour={shift.startHour}
                            endHour={shift.endHour}
                            names={shift.names}
                            overlapNum={getMaxOverlaps(shifts, shift)}
                            place={getMaxOverlaps(placed_shifted, shift)}
                            color={color_list[counter++ % color_list.length]}
                          />
                        )
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeekShifts;
