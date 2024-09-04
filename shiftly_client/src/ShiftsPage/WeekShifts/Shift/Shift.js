import React from "react";
import "./Shift.css"

const Shift = ({ start_hour, end_hour, overlapNum, place, color, idList, ispersonalSearch, profession, workers }) => {
  // Calculate the number of rows to span
  const startRow = parseInt(start_hour.substring(0, 2), 10) - 7;
  const endRow = parseInt(end_hour.substring(0, 2), 10) - 7;

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
    {ispersonalSearch? profession : <ul className="shift-names">
    {idList.map((id, index) => (
      <li key={index}>{workers[id].name}</li>
    ))}
  </ul>}
      
    </div>
  );
};

export default Shift;
