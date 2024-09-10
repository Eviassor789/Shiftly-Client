import React, { useState, useRef } from "react";
import "./UploadFile.css";
import UploadLogo from "./UploadLogo";
// import buffer from 'buffer';
// import csv from 'csv-parser';
import Papa from "papaparse";

// {handleNext, fileUploaded, setFileUploaded}
const UploadFile = (props) => {
  const xlsx = require("xlsx");
  // const fs = require('fs');

  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [render, setRender] = useState(false);
  const fileInputRef = useRef(null);
  
  let my_array = [false, false, false];
  let files = [];
  let currentStep = props.currentStep;

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
  // const parseCSVFileSync = (filePath) => {
  //   const fileData = fs.readFileSync(filePath, 'utf8');
  //   const { data, errors } = Papa.parse(fileData);
  //   if (errors.length > 0) {
  //     console.error('Error parsing CSV file:', errors);
  //     return [];
  //   }
  //   return data;
  // };

  // Function to parse CSV data using Papa Parse
  
  const parseCSVData = (data) => {
    return new Promise((resolve, reject) => {
      Papa.parse(data, {
        header: false,
        complete: (result) => {
          // console.log("Parsed CSV rows:", result.data);
          let rows = result.data;
          let rows1, check;
          [rows1, check] = check_rows(rows, currentStep);
          rows = rows1;
          if (check) {
            // console.log("checkRows passed");
            resolve([rows, true]);
          } else {
            // console.log("checkRows failed");
            resolve([rows, false]);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          reject(error);
        },
      });
    });
  };

  const parseExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        try {
          const workbook = xlsx.read(event.target.result, { type: "binary" });
          const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
          const worksheet = workbook.Sheets[sheetName];
          let rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
          // If you want to skip the header row, remove the first element
          // rows.shift();
  
          // console.log(rows); // Array of rows
          let rows1, check;
          [rows1, check] = check_rows(rows, currentStep);
          rows = rows1;
          if (check) {
            // console.log("checkRows passed");
            resolve([rows, true]);
          } else {
            // console.log("checkRows failed");
            resolve([rows, false]);
          }
        } catch (error) {
          reject(error);
        }
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsBinaryString(file);
    });
  };

  function check_rows(rows, fileNum) {
    switch (fileNum) {
      case 1:
        return validate_one(rows);

      case 2:
        return validate_two(rows);

      case 3:
        return validate_three(rows);

      default:
        break;
    }
  }

  function validate_one(rows) {
    const expectedHeaders = [
      "employee ID number",
      "full name",
      "skill 1",
      "skill 2",
      "skill 3",
      "Hours per Week",
      "days" // New header replacing "days per week" and "work on weekends?"
    ];
  
    if (rows.length === 0) {
      console.error("The data is empty.");
      return [rows, false];
    }
  
    // Check each row for correct number of columns and valid data
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.length !== expectedHeaders.length) {
        alert(
          `Row ${i} has an incorrect number of columns.\nExpected: ${expectedHeaders.length}, Found: ${row.length}`
        );
        return [rows, false];
      }
  
      if (isNaN(row[0])) {
        // Check if employee ID number is a number
        alert(`Invalid employee ID number at row ${i}.\nFound: "${row[0]}"`);
        return [rows, false];
      }
  
      for (let j = 1; j <= 4; j++) {
        if (typeof row[j] === 'string' && /\d/.test(row[j])) {
          alert(`Invalid data in row ${i}, column ${j}:\nStrings should not contain numbers.`);
          return [rows, false];
        }
      }
  
      if (isNaN(row[5])) {
        // Check if Hours per Week is a number
        alert(
          `Invalid number for Hours per Week at row ${i}.\nFound: "${row[5]}"`
        );
        return [rows, false];
      }
  
      // Validate "days" column (new logic)
      const days = row[6].split(',').map(Number);
      const uniqueDays = new Set(days);
  
      if (days.some(isNaN) || days.length !== uniqueDays.size) {
        alert(`Row ${i} has invalid or duplicate days.\nDays should be unique and between 1 and 7.`);
        return [rows, false];
      }
  
      if (days.some(day => day < 1 || day > 7)) {
        alert(`Row ${i} has days out of range.\nExpected: days between 1 and 7.`);
        return [rows, false];
      }
  
      if (days.length > 7) {
        alert(`Row ${i} should have no more than 7 days.\nFound: ${days.length}`);
        return [rows, false];
      }
      
      if (days.length < 1) {
        alert(`Row ${i} should have more than 0 days.\nFound: ${days.length}`);
        return [rows, false];
      }
    }
  
    return [rows, true];
  }
  

  function validate_two(rows) {
    const expectedScheduleHeaders = [
      "day in the week (1-7)",
      "skill",
      "from hour",
      "to hour",
      "number of employees required",
    ];

    if (rows.length === 0) {
      alert("The data is empty.");
      return [rows, false];
    }

    // const headers = rows[0];

    // // Check if the headers match
    // for (let i = 0; i < expectedScheduleHeaders.length; i++) {
    //   if (headers[i].trim() !== expectedScheduleHeaders[i]) {
    //     alert(`Header mismatch at position ${i}.\nExpected: "${expectedScheduleHeaders[i]}", Found: "${headers[i]}"`);
    //     return false;
    //   }
    // }

    // Check each row for correct number of columns and valid data
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.length !== expectedScheduleHeaders.length) {
        alert(
          `Row ${i} has an incorrect number of columns.\nExpected: ${expectedScheduleHeaders.length}, Found: ${row.length}`
        );
        return [rows, false];
      }

      if (isNaN(row[0]) || row[0] < 1 || row[0] > 7) {
        // Check if day in the week is a number between 1 and 7
        alert(
          `Invalid day in the week at row ${i}.\nExpected: a number between 1 and 7, Found: "${row[0]}"`
        );
        return [rows, false];
      }

      
      if (typeof row[1] === 'string' && /\d/.test(row[1])) {
        alert(`Invalid data in row ${i}, column ${1}:\nStrings should not contain numbers.`);
        return [rows, false];
      }
    

      if (isNaN(row[4]) || row[4] < 0) {
        // Check if number of employees required is a non-negative number
        alert(
          `Invalid number of employees required at row ${i}.\nFound: "${row[4]}"`
        );
        return [rows, false];
      }

      const fromHour = convertExcelTimeToHHMM(row[2]);
      const toHour = convertExcelTimeToHHMM(row[3]);
      row[2] = fromHour;
      row[3] = toHour;

      if (!/^\d{2}:\d{2}$/.test(fromHour) || !/^\d{2}:\d{2}$/.test(toHour)) {
        // Check if from hour and to hour are in HH:MM format
        alert(
          `Invalid time format at row ${i}.\nExpected: HH:MM, Found: from hour: "${row[2]}", to hour: "${row[3]}"`
        );
        return [rows, false];
      }
    }

    return [rows, true];
  }

  function validate_three(rows) {
    const expectedShiftHeaders = [
      "skill",
      "day in the week (1-7)",
      "from hour",
      "to hour",
      "shift price per employee",
    ];

    if (rows.length === 0) {
      alert("The data is empty.");
      return [rows, false];
    }

    // const headers = rows[0];

    // // Check if the headers match
    // for (let i = 0; i < expectedShiftHeaders.length; i++) {
    //   if (headers[i].trim() !== expectedShiftHeaders[i]) {
    //     alert(
    //       `Header mismatch at position ${i}. Expected: "${expectedShiftHeaders[i]}", Found: "${headers[i]}"`
    //     );
    //     return false;
    //   }
    // }

    // Check each row for correct number of columns and valid data
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.length !== expectedShiftHeaders.length) {
        alert(
          `Row ${i} has an incorrect number of columns.\nExpected: ${expectedShiftHeaders.length}, Found: ${row.length}`
        );
        return [rows, false];
      }

      
      if (typeof row[0] === 'string' && /\d/.test(row[0])) {
        alert(`Invalid data in row ${i}, column ${0}:\nStrings should not contain numbers.`);
        return [rows, false];
      }
      

      if (isNaN(row[1]) || row[1] < 1 || row[1] > 7) {
        // Check if day in the week is a number between 1 and 7
        alert(
          `Invalid day in the week at row ${i}.\nExpected: a number between 1 and 7, Found: "${row[0]}"`
        );
        return [rows, false];
      }

      if (isNaN(row[4]) || row[4] < 0) {
        // Check if shift price per employee is a non-negative number
        alert(
          `Invalid shift price per employee at row ${i}.\nFound: "${row[4]}"`
        );
        return [rows, false];
      }

      const fromHour = convertExcelTimeToHHMM(row[2]);
      const toHour = convertExcelTimeToHHMM(row[3]);
      row[2] = fromHour;
      row[3] = toHour;

      if (!/^\d{2}:\d{2}$/.test(fromHour) || !/^\d{2}:\d{2}$/.test(toHour)) {
        // Check if from hour and to hour are in HH:MM format
        alert(
          `Invalid time format at row ${i}.\nExpected: HH:MM, Found: from hour: "${row[2]}", to hour: "${row[3]}"`
        );
        return [rows, false];
      }
    }

    return [rows, true];
  }

  const convertExcelTimeToHHMM = (excelTime) => {
    if (typeof excelTime === "number") {
      const totalMinutes = Math.round(excelTime * 24 * 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    }
    return excelTime; // Return as is if it's already a string
  };

  const handleFiles = async (files) => {
    var rows;
    var data;
    var checkBool;
    if (files.length > 0) {
      const file = files[0];
      my_array = props.fileUploaded;
      my_array[props.currentStep - 1] = false;
      props.setFileUploaded(my_array);
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setFileName(file.name);
  
        if (file) {
          try {
            data = await parseCSVData(file);
            rows = data[0];
            checkBool = data[1];
            if (checkBool) {
              my_array = props.fileUploaded;
              my_array[props.currentStep - 1] = true;
              props.filesList[props.currentStep - 1] = file;
              props.setFileUploaded(my_array);

              props.rowsList[props.currentStep - 1] = rows;

              files = [];
            } else {
              // Update the flag to indicate that a file has been uploaded
              my_array = props.fileUploaded;
              my_array[props.currentStep - 1] = false;
              props.filesList[props.currentStep - 1] = null;

              props.rowsList[props.currentStep - 1] = [];

              props.setFileUploaded(my_array);
            }
            // console.log("Parsed rows:", rows);
          } catch (error) {
            console.error("Error parsing CSV file:", error);
          }
        }
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx")
      ) {
        setFileName(file.name);
  
        if (file) {
          try {
            data = await parseExcelFile(file);
            rows = data[0];
            checkBool = data[1];
            if (checkBool) {
              my_array = props.fileUploaded;
              my_array[props.currentStep - 1] = true;
              props.filesList[props.currentStep - 1] = file;
              props.setFileUploaded(my_array);

              props.rowsList[props.currentStep - 1] = rows;

              files = [];
            } else {
              my_array = props.fileUploaded;
              my_array[props.currentStep - 1] = false;
              props.filesList[props.currentStep - 1] = null;

              props.rowsList[props.currentStep - 1] = [];

              props.setFileUploaded(my_array);
            }
          } catch (error) {
            console.error("Error parsing Excel file:", error);
          }
        }
      } else {
        // Update the flag to indicate that a file has been uploaded
        my_array = props.fileUploaded;
        my_array[props.currentStep - 1] = false;
        props.setFileUploaded(my_array);

        props.rowsList[props.currentStep - 1] = [];

        files = [];
        alert("Please upload a CSV or Excel file.");
      }
      setRender(!render);
      // console.log("Parsed rows:", rows);
      
      // console.log("SetParsedRows:", props.rowsList);

      // console.log("files list: ");
      props.filesList.forEach((file) => {
        if(file) {
          // console.log(file.name);
        }
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

        {props.fileUploaded[props.currentStep - 1] ? (
          <div className="file-indicator">
            <p>{fileName}</p>
            <span role="img" aria-label="Checkmark">
              ✔️
            </span>
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
          props.fileUploaded[props.currentStep - 1]
            ? "next-button btn btn-primary"
            : "next-button btn btn-primary disable-button"
        }
        onClick={() => props.handleNext()}
      >
        {currentStep == 3 ? "Generate" : "Next"}
      </button>
    </div>
  );
};

export default UploadFile;
