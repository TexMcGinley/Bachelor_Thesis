import React from "react";
import "./TopBar.css"; // Make sure to create a corresponding CSS file for styling

const TopBar = ({ score, movesLeft, round, onSubmit }) => {
  return (
    <div className="top-bar">
      <div className="score-display">
        SCORE: {score} | MOVES LEFT: {movesLeft}/20
      </div>
      <div className="top-bar-title">
        <h1>Movie Ranker</h1>
      </div>
      <div className="top-bar-buttons">
        <div className="round-display">ROUND: {round}/5 </div>
        <button onClick={onSubmit}>SUBMIT</button>
      </div>
    </div>
  );
};

export default TopBar;
