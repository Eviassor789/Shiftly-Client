import React, { useState, useRef } from 'react';
import './UploadFile.css';
import UploadLogo from './UploadLogo'; 


// {handleNext, fileUploaded, setFileUploaded}
const UploadFile = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [render, setRender] = useState(false);
  const fileInputRef = useRef(null);

  let my_array = [false, false, false];
  let files = [];

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleClick = () => {
    // Programmatically trigger the file input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    files = e.target.files;
    handleFiles(files);
  };



  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setFileName(file.name);

        // Update the flag to indicate that a file has been uploaded
        my_array = props.UploadFile;
        my_array[props.currentStep-1] = true;
        props.setFileUploaded(my_array);

      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.name.endsWith('.xlsx')
      ) {
        setFileName(file.name);

        // Update the flag to indicate that a file has been uploaded
        my_array = props.fileUploaded;
        my_array[props.currentStep-1] = true;
        props.setFileUploaded(my_array);
        

      } else {
        // Update the flag to indicate that a file has been uploaded
        my_array = props.fileUploaded;
        my_array[props.currentStep-1] = false;
        console.log("my_array: " + props.fileUploaded)
        props.setFileUploaded(my_array);
        files = [];
        alert("Please upload a CSV or Excel file.");
      };
      setRender(!render);
      
      // Handle the uploaded files here
      console.log(files);
      console.log(props.fileUploaded)

    }
  };

  // const handleNextClick = () => {
  //   handleNext();
  // };
  //props.fileUploaded[props.currentStep-1]

  return (
    <div className="CenterDiv">
      <div
        className={`upload-container ${isDragging ? "dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
        
        {props.fileUploaded[props.currentStep-1] ? (
          <div className="file-indicator">
            <p>{fileName}</p>
            <span role="img" aria-label="Checkmark">✔️</span>
          </div>
        ) : (
          <div>
            <p>Click or drag and drop your CSV or Excel file here </p>
            <UploadLogo />
          </div>
        )}
      </div>
      <button
        id="first_screen_btn"
        className={
          props.fileUploaded[props.currentStep-1]
            ? "next-button btn btn-primary"
            : "next-button btn btn-primary disable-button"
        }
        onClick={() => props.handleNext()}
      >
        Next
      </button>
    </div>
  );
};

export default UploadFile;
