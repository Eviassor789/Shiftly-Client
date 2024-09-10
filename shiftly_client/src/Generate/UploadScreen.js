import './UploadScreen.css';
import React, { useState, useEffect } from 'react';
import ResizableWindow from "./ResizableWindow";
import UploadFile from "./UploadFile";
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../LoadingPage';

const UploadScreen = ({ step, currentStep, setCurrentStep, fileUploaded, setFileUploaded, filesList, SetFilesList, rowsList, SetRowsList, screenLoading, setScreenLoading}) => {

  const navigate = useNavigate();

  const [uploadStatus, setUploadStatus] = useState({
    file1Uploaded: fileUploaded[0], // Initialize with initial fileUploaded values
    file2Uploaded: fileUploaded[1],
    file3Uploaded: fileUploaded[2],
  });

  const addParsedDataToDatabase = async (jwtToken, workersData, requirementsData, shiftsData) => {
    try {
      const response = await fetch('http://localhost:5000/add_by_parsed_rows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`, // Ensure the token is attached
        },
        body: JSON.stringify({
          workersData,    // Parsed rows from workers.xlsx
          requirementsData, // Parsed rows from requirements.xlsx
          shiftsData,     // Parsed rows from shifts.xlsx
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        // console.log('Assignment Calculated Successfully:', result);
        return result;
      } else {
        console.error('Failed to add data:', await response.text());
        return {};
      }
    } catch (error) {
      console.error('Error occurred while adding parsed data:', error);
      return {};
    }
  };

  const handleNext = async () => {
    if (currentStep === 3) {
      if (fileUploaded[1] && fileUploaded[0]) { // Check both flags
        const jwtToken = localStorage.getItem('jwtToken');

        // console.log("filesList uploaded successfully:");
        for (let index = 0; index < filesList.length; index++) {
          const file = filesList[index];
          // console.log("name: ", file.name);
          // console.log("parsed rows: ", rowsList[index]);
        }

        setScreenLoading(true); // Show loading screen

        const newAssignment = await addParsedDataToDatabase(
          jwtToken,
          rowsList[0],
          rowsList[1],
          rowsList[2]
        );

        // console.log("newAssignment: ", newAssignment);
        setScreenLoading(false); // Hide loading screen

        navigate(`/home`);
      } else {
        alert("Please upload both files first.");
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
              employees, the number of hours they are supposed to work
              per week (by contract), and their skills (up to 3
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

// Update uploadStatus based on changes in fileUploaded
const updateUploadStatus = () => {
  setUploadStatus({
    file1Uploaded: fileUploaded[0],
    file2Uploaded: fileUploaded[1],
    file3Uploaded: fileUploaded[2], // Include all three flags
  });
};

// Update uploadStatus whenever fileUploaded changes using useEffect
useEffect(() => {
  updateUploadStatus();
}, [fileUploaded]); // Dependency array ensures update on fileUploaded change


return (
  <>
    {screenLoading && position() == "main" ? (
      <>
        <LoadingPage id="loadingScreen" />
      </>
    ) : (
      <>
        {screenLoading && (position() != "main") ? (
          <></>
        ) : (
          <div className={`upload-screen ${position()}`}>
            <div className="CenterDiv">
              {renderContent()}
              <UploadFile
                id={"UploadFile_" + currentStep}
                handleNext={handleNext}
                fileUploaded={fileUploaded}
                setFileUploaded={setFileUploaded}
                currentStep={currentStep}
                filesList={filesList}
                SetFilesList={SetFilesList}
                rowsList={rowsList}
                SetRowsList={SetRowsList}
              />
              {/* Generate Progress Dots */}
              <div id="GenerateProgress">
                  <div
                    className={currentStep > 0 ? 'elipse elipse-on' : 'elipse'}
                    onClick={() => setCurrentStep(1)}
                  ><h3 className='progNum'>1</h3></div>
                  <div
                    className={currentStep > 1 ? 'elipse elipse-on' : 'elipse'}
                    onClick={() => setCurrentStep(2)}
                  ><h3 className='progNum'>2</h3></div>
                  <div
                    className={currentStep > 2 ? 'elipse elipse-on' : 'elipse'}
                    onClick={() => setCurrentStep(3)}
                  ><h3 className='progNum'>3</h3></div>
              </div>

              {/* Add Left and Right Arrows */}
              
                  {/* {currentStep < 3 && (
                    <button className="arrow right-arrow" onClick={handleNext}>
                      &gt;
                    </button>
                  )} */}
                

              <ResizableWindow step={step} />
            </div>
            {currentStep > 1 && (
                <button className="arrow  bi-arrow-left-circle-fill text-primary" onClick={handlePrevious}>
                </button>
            )}
          </div>
        )}
      </>
    )}
  </>
);
};

export default UploadScreen;
