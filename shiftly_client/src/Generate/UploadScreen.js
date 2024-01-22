import React from 'react';
import './UploadScreen.css';
import ResizableWindow from "./ResizableWindow";
import UploadFile from "./UploadFile";


const UploadScreen = ({ key, step, currentStep, handleNext, setCurrentStep }) => {

    const position = () => {
        if (step === currentStep) {
          return 'main';
        } else if (step < currentStep) {
          return 'left';
        } else {
          return 'right';
        }
      };


  return (
    <>
     <div className={`upload-screen ${position()}`}>
      <div className="CenterDiv">
          <h1>Employees Details {step} </h1>
          <p id="FirstWindowDetails">
            The details of the employees include the ID numbers of the
            employees, as well as the number of hours they are supposed to work
            per week (according to the contract), and their skills (up to 3
            skills per employee).
          </p>
          <UploadFile handleNext={handleNext} />
          {/* <button className="btn btn-primary" onClick={handleNext}></button> */}
          <div id="GenerateProgress">
            <div className={` ${step == 1 ? "elipse elipse-on" : "elipse"}`} onClick={() => setCurrentStep(1) }></div>
            <div className={` ${step == 2 ? "elipse elipse-on" : "elipse"}`} onClick={() => setCurrentStep(2) }></div>
            <div className={` ${step == 3 ? "elipse elipse-on" : "elipse"}`} onClick={() => setCurrentStep(3) }></div>
          </div>
          <ResizableWindow />
        </div>
    </div>

    </>
  );
};

export default UploadScreen;

