import React from "react";
import "./Shift.css"

const Shift = ({ startHour, endHour, overlapNum, place, color, names }) => {
  // Calculate the number of rows to span
  const startRow = parseInt(startHour.substring(0, 2), 10) - 7;
  const endRow = parseInt(endHour.substring(0, 2), 10) - 7;

  return (
    <div
      className="shift"
      style={{
        height: `${(endRow - startRow + 1) * 40}px`,
        width: `${100 / (overlapNum + 1)}%`,
        borderRadius: "20px",
        position: `absolute`,
        left: `${(100 / (overlapNum + 1)) * place}%`,
        background: `${color}`,
      }}
    >
      {/* Render the list of names within the shift */}
      <ul className="shift-names">
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Shift;
