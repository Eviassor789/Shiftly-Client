import React, { useEffect, useState } from 'react';
import './CircularProgress.css';

const CircularProgress = ({ score }) => {
  const [offset, setOffset] = useState(0);
  const circleRadius = 50;
  const circumference = 2 * Math.PI * circleRadius;

  useEffect(() => {
    const progress = (score / 100) * circumference;
    setOffset(circumference - progress);
  }, [score, circumference]);

  return (
    <div className="circular-progress-container">
      <svg
        className="circular-progress"
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        <circle
          className="circular-progress-bg"
          cx="60"
          cy="60"
          r={circleRadius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="10"
        />
        <circle
          className="circular-progress-bar"
          cx="60"
          cy="60"
          r={circleRadius}
          fill="none"
          stroke="#4caf50"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text
          className="gradeScore"
          x="50%"
          y="-52px" /* Adjust the y-coordinate to position the text above the circle */
          textAnchor="middle"
          fontSize="20"
        >
          {score}%
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;