import React from "react";
import "./TopBar.css"; // Make sure to create a corresponding CSS file for styling

const TopBar = ({ score, onSubmit, onFilter }) => {
  return (
    <div className="top-bar">
      <div className="score-display">SCORE: {score}</div>
      <div className="top-bar-title">
        {" "}
        <h1>Movie Ranker</h1>
      </div>
      <div className="top-bar-buttons">
        <button onClick={onFilter}>FILTER</button>
        <button onClick={onSubmit}>SUBMIT</button>
      </div>
    </div>
  );
};

export default TopBar;
