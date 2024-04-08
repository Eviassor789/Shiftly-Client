// Modal.js

import React, { useState } from "react";
import "./modal.css"; // Import modal styles
import ShiftWindow from "../ShiftWindow/ShiftWindow";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <>
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <ShiftWindow
              day="Monday"
              startTime="09:00"
              endTime="17:00"
              requiredWorkers={8}
              occupiedWorkers={["Alice", "Bob"]}
              unoccupiedWorkers={["Charlie", "David"]}
              onClose={toggleModal}
            />
          </div>
        </>
      )}
    </>
  );
}

