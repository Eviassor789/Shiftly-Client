import React, { useState } from 'react';
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

      // Check if the file is a CSV file
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        // Display preview for CSV files
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target.result);
        };
        reader.readAsText(file);
      } else {
        setPreview(null);
        alert('Please upload a CSV file.');
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
        <p>Drag and drop your CSV file here</p>
      )}
    </div>
  );
};

export default UploadFile;
