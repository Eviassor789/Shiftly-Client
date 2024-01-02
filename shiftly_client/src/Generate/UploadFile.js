import React, { useState } from 'react';
import XLSX from 'xlsx';
import './UploadFile.css';

const UploadFile = () => {
  const [isDragging, setIsDragging] = useState(false);
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

    if (files.length > 0) {
      const file = files[0];

      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        // Display preview for CSV files
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target.result);
        };
        reader.readAsText(file);
      } else if (
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.name.endsWith('.xlsx')
      ) {
        // Read Excel (XLSX) files
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const csvData = XLSX.utils.sheet_to_csv(sheet, { FS: ',' });
          setPreview(csvData);
        };
        reader.readAsArrayBuffer(file);
      } else {
        setPreview(null);
        alert('Please upload a CSV or Excel file.');
      }

      // Handle the uploaded files here
      console.log(files);
    }
  };

  return (
    <div
      className={`upload-container ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <pre className="preview-csv">{preview}</pre>
      ) : (
        <p>Drag and drop your CSV or Excel file here</p>
      )}
    </div>
  );
};

export default UploadFile;
