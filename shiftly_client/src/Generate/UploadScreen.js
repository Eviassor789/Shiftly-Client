import React from 'react';
import './UploadScreen.css';
import ResizableWindow from "./ResizableWindow";
import UploadFile from "./UploadFile";
import { useNavigate } from 'react-router-dom';

const UploadScreen = ({ step, currentStep, setCurrentStep, fileUploaded, setFileUploaded, filesList, SetFilesList, rowsList, SetRowsList}) => {

  const navigate = useNavigate();


  const handleNext = () => {

    if (currentStep === 3) {
      if(fileUploaded[0] === true && fileUploaded[1] === true) {
        navigate(`/page`);
        console.log("filesList uploaded succesfully:");
        for (let index = 0; index < filesList.length; index++) {
          const file = filesList[index];
          console.log("name: ", file.name);
          console.log("parsed rows: ", rowsList[index]);
          
        }
      } else {
        alert("Please upload first the previous files.");
      }


    } else {
      setCurrentStep(currentStep + 1);
    }
  };


  const position = () => {
    if (step === currentStep) {
      return 'main';
    } else if (step < currentStep) {
      return 'left';
    } else {
      return 'right';
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1>Employees Details</h1>
            <p id="FirstWindowDetails">
              The details of the employees include the ID numbers of the
              employees, as well as the number of hours they are supposed to work
              per week (according to the contract), and their skills (up to 3
              skills per employee).
            </p>
          </>
        );

      case 2:
        return (
          <>
            <h1>Requirements</h1>
            <p id="FirstWindowDetails">
              The file should contain the required number of employees in each skill and at <br/>
              each hour of a given week.
            </p>
          </>
        );

        case 3:
        return (
          <>
            <h1>Shifts</h1>
            <p id="FirstWindowDetails">
              A file containing the optional shift basket for each day during the week as well 
              <br/> as the cost of each shift.
            </p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className={`upload-screen ${position()}`}>
        <div className="CenterDiv">
          {renderContent()}
          <UploadFile
            id={"UploadFile_" + currentStep}
            handleNext = {handleNext}
            fileUploaded = {fileUploaded}
            setFileUploaded = {setFileUploaded}
            currentStep = {currentStep}
            filesList = {filesList}
            SetFilesList = {SetFilesList}
            rowsList = {rowsList}
            SetRowsList = {SetRowsList}
          />
          <div id="GenerateProgress">
            <div
              className={` ${step === 1 ? "elipse elipse-on" : "elipse"}`}
              onClick={() => setCurrentStep(1)}
            ></div>
            <div
              className={` ${step === 2 ? "elipse elipse-on" : "elipse"}`}
              onClick={() => setCurrentStep(2)}
            ></div>
            <div
              className={` ${step === 3 ? "elipse elipse-on" : "elipse"}`}
              onClick={() => setCurrentStep(3)}
            ></div>
          </div>
          <ResizableWindow step={step} />
        </div>
      </div>
    </>
  );
};

export default UploadScreen;
