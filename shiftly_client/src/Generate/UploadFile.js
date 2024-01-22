import React, { useState, useRef } from 'react';
// import XLSX from 'xlsx';
import './UploadFile.css';
import UploadLogo from './UploadLogo'; 

const UploadFile = ({handleNext}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

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
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setFileName(file.name);

        // Update the flag to indicate that a file has been uploaded
        setFileUploaded(true);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.name.endsWith('.xlsx')
      ) {
        setFileName(file.name);

        // Update the flag to indicate that a file has been uploaded
        setFileUploaded(true);
      } else {
        // Update the flag to indicate that a file has been uploaded
        setFileUploaded(false);
        
        alert("Please upload a CSV or Excel file.");
      };
      
      // Handle the uploaded files here
      console.log(files);
    }
  };

  const handleNextClick = () => {
    handleNext();
  };

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
        {fileUploaded ? (
          <div className="file-indicator">
            <p>{fileName}</p>
            <span>✔️</span>
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
          fileUploaded
            ? "next-button btn btn-primary"
            : "next-button btn btn-primary disable-button"
        }
        onClick={() => handleNext()}
      >
        Next
      </button>
    </div>
  );
};

export default UploadFile;
