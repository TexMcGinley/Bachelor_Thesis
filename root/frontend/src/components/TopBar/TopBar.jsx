import React from "react";
import "./TopBar.css"; // Make sure to create a corresponding CSS file for styling

const TopBar = ({ score, movesLeft, round, onSubmit }) => {
  return (
    <div className="top-bar">
      <div className="score-display">
        SCORE: {score} | MOVES LEFT: {movesLeft}
      </div>
      <div className="top-bar-title">
        <h1>Movie Ranker</h1>
      </div>
      <div className="top-bar-buttons">
        <button onClick={onSubmit}>SUBMIT</button>
        <div className="round-display">ROUND: {round}</div>
      </div>
    </div>
  );
};

export default TopBar;
