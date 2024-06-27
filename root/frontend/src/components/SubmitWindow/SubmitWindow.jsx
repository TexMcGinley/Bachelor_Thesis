import React from "react";
import "./SubmitWindow.css";

function SubmitWindow({
  round,
  score,
  highScore,
  epsilonScore,
  epsilonValue,
  onQuit,
  onNextRound,
  onRestart, // Add the onRestart prop
}) {
  return (
    <div className="submit-window">
      <div className="submit-content">
        <h1>GREAT JOB!</h1>
        <div className="score-info">
          <p>ROUND:</p>
          <p>{round}</p>
          <p>SCORE:</p>
          <p>{score}</p>
          <p>HIGH SCORE:</p>
          <p>{highScore}</p>
          <p>EPSILON GREEDY SCORE:</p>
          <p>{epsilonScore}</p>
          <p>EPSILON VALUE:</p>
          <p>{epsilonValue}</p>
        </div>
        <div className="buttons">
          <button onClick={onQuit}>QUIT</button>
          {round === 5 ? null : (
            <button onClick={onNextRound}>NEXT ROUND</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubmitWindow;
