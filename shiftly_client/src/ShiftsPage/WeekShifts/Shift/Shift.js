import React from "react";
import "./Shift.css"
import workers_map from "../../../Data/Workers";

const Shift = ({ startHour, endHour, overlapNum, place, color, idList }) => {
  // Calculate the number of rows to span
  const startRow = parseInt(startHour.substring(0, 2), 10) - 7;
  const endRow = parseInt(endHour.substring(0, 2), 10) - 7;

  return (
    <div
      className="shift"
      style={{
        height: `${(endRow - startRow) * 40}px`,
        width: `${100 / (overlapNum + 1)}%`,
        borderRadius: "20px",
        position: `absolute`,
        left: `${(100 / (overlapNum + 1)) * place}%`,
        background: `${color}`,
      }}
    >
      {/* Render the list of names within the shift */}
      <ul className="shift-names">
        {idList.map((id, index) => (
          <li key={index}>{workers_map[id].name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Shift;
