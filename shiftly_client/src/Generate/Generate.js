import "./Generate.css"
import HomeTopBar from "../Home/HomeTopBar/HomeTopBar";
import React, { useState } from 'react';
import UploadScreen from "./UploadScreen";

function Generate() {
  const [currentStep, setCurrentStep] = useState(1);


  const [fileUploaded, setFileUploaded] = useState([false, false, false]);


  // const handleBack = () => {
  //   setCurrentStep(currentStep - 1);
  // };


  return (
    <>
      <div className="content-container">
        {[...Array(3)].map((_, index) => (
          <UploadScreen
            key={index}
            step={index + 1}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            fileUploaded={fileUploaded}
            setFileUploaded={setFileUploaded}
          />
        ))}
      </div>
      <HomeTopBar page="generate" />
      {/* <button onClick={handleNext} type="button" disabled={currentStep === 3} class="btn btn-primary">
        next page
      </button>
      <button onClick={handleBack} type="button" disabled={currentStep === 1} class="btn btn-primary">
        Back page
      </button> */}
    </>
  );
}

export default Generate;