import React, { useState, useRef } from 'react';
import './UploadFile.css';
import UploadLogo from './UploadLogo'; 
import * as buffer from 'buffer';
// import csv from 'csv-parser';



// {handleNext, fileUploaded, setFileUploaded}
const UploadFile = (props) => {
  
  if (typeof window.Buffer === 'undefined') {
    window.Buffer = buffer.Buffer;
  }
  
  const csv = require('csv-parser');
  const fs = require('fs');
  const xlsx = require('xlsx');


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

  const parseCSVFileSync = (filePath) => {
    const rows = [];
    // Synchronously read the CSV file and parse its contents
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Process each row synchronously
        rows.push(row);
      })
      .on('end', () => {
        // All rows have been processed
        console.log('All rows processed:', rows);
      })
      .on('error', (error) => {
        // Handle any errors during parsing
        console.error('Error parsing CSV file:', error);
      });
  
    // Note: The rows array will be populated asynchronously as the CSV file is being parsed
    // The function will return before the parsing is complete
    return rows;
  };

  const parseExcelFile = (file) => {
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
    // If you want to skip the header row, remove the first element
    // rows.shift();
  
    return rows;
  };




  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if ((file.type === 'text/csv' || file.name.endsWith('.csv'))) {
        setFileName(file.name);

        // Update the flag to indicate that a file has been uploaded
        my_array = props.UploadFile;
        my_array[props.currentStep-1] = true;
        props.filesList[(props.currentStep - 1)] = file;
        props.setFileUploaded(my_array);

        if(file) {
          const rows = parseCSVFileSync(file);
          console.log('Rows:', rows); // This will likely log an empty array because parsing is asynchronous
        }
        

      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.name.endsWith('.xlsx')
      ) {
        setFileName(file.name);

        // Update the flag to indicate that a file has been uploaded
        my_array = props.fileUploaded;
        my_array[props.currentStep-1] = true;
        props.filesList[(props.currentStep - 1)] = file;
        props.setFileUploaded(my_array);

        if(file) {
          const rows = parseExcelFile(file);
          console.log(rows); // Array of rows
        }
        

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
      // console.log("files: " + files);
      // console.log("files uploaded: " + props.fileUploaded);
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
