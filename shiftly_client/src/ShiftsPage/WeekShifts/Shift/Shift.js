import React from "react";
import "./Shift.css";

const Shift = ({
  start_hour,
  end_hour,
  overlapNum,
  place,
  color,
  idList,
  ispersonalSearch,
  profession,
  workers,
  professions,
}) => {
  // Calculate the number of rows to span
  const startRow = parseInt(start_hour.substring(0, 2), 10) - 7;
  const endRow = parseInt(end_hour.substring(0, 2), 10) - 7;

  const colors_array = [
    "#6CA1D1",
    "#D1E0F2",
    "#FFA96B",
    "#F4E285",
    "#A35C5C",
    "#5F9EA0",
    "#61A886",
  ];

  // Get the index of the profession in the professions array
  const professionIndex = professions.indexOf(profession);

  // Use modulo to cycle through colors_array
  const mycolor = ispersonalSearch
    ? colors_array[professionIndex % colors_array.length]
    : color;

  return (
    <div
      className="shift"
      style={{
        height: `${(endRow - startRow) * 40}px`,
        width: `${100 / (overlapNum + 1)}%`,
        borderRadius: "20px",
        position: `absolute`,
        left: `${(100 / (overlapNum + 1)) * place}%`,
        background: `${mycolor}`,
      }}
    >
      {ispersonalSearch ? (
        <ul className="profession">{profession}</ul>
      ) : (
        <ul className="shift-names">
          {idList.map((id, index) => (
            <li key={index}>{workers[id].name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Shift;
