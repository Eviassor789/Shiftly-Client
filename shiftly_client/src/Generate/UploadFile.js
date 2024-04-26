import React, { useState, useRef } from 'react';
import './UploadFile.css';
import UploadLogo from './UploadLogo'; 
import buffer from 'buffer';
// import csv from 'csv-parser';
import Papa from 'papaparse';


// {handleNext, fileUploaded, setFileUploaded}
const UploadFile = (props) => {
  
  const xlsx = require('xlsx');
  const fs = require('fs');



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

  
// Function to parse CSV file synchronously using Papa Parse
const parseCSVFileSync = (filePath) => {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const { data, errors } = Papa.parse(fileData);
  if (errors.length > 0) {
    console.error('Error parsing CSV file:', errors);
    return [];
  }
  return data;
};

// Function to parse CSV data using Papa Parse
const parseCSVData = (data) => {
  Papa.parse(data, {
    header: false,
    complete: (result) => {
      console.log('Parsed CSV rows:', result.data);
      // Do something with the parsed rows
    },
    error: (error) => {
      console.error('Error parsing CSV:', error);
    }
  });
};

  const parseExcelFile = (file) => {
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const workbook = xlsx.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
      // If you want to skip the header row, remove the first element
      // rows.shift();
  
      console.log(rows); // Array of rows
      // Do something with the parsed rows
    };
  
    reader.readAsBinaryString(file);
  };
  



  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setFileName(file.name);
  
        // Update the flag to indicate that a file has been uploaded
        my_array = props.fileUploaded;
        my_array[props.currentStep - 1] = true;
        props.filesList[props.currentStep - 1] = file;
        props.setFileUploaded(my_array);
  
        if (file) {
          parseCSVData(file);
        }
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.name.endsWith('.xlsx')
      ) {
        setFileName(file.name);
  
        // Update the flag to indicate that a file has been uploaded
        my_array = props.fileUploaded;
        my_array[props.currentStep - 1] = true;
        props.filesList[props.currentStep - 1] = file;
        props.setFileUploaded(my_array);
  
        if (file) {
          parseExcelFile(file);
        }
      } else {
        // Update the flag to indicate that a file has been uploaded
        my_array = props.fileUploaded;
        my_array[props.currentStep - 1] = false;
        props.setFileUploaded(my_array);
        files = [];
        alert("Please upload a CSV or Excel file.");
      };
      setRender(!render);
  
      console.log("files list: ");
      props.filesList.forEach(file => {
        console.log(file.name);
      });
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
