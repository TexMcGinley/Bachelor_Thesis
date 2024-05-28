import React from "react";
import "./SubmitWindow.css";

function SubmitWindow({ score, highScore, onQuit, onNextUser }) {
  return (
    <div className="submit-window">
      <div className="submit-content">
        <h1>GREAT JOB!</h1>
        <p>SCORE: {score}</p>
        <p>HIGH SCORE: {highScore}</p>
        <button onClick={onQuit}>QUIT</button>
        <button onClick={onNextUser}>NEXT USER</button>
      </div>
    </div>
  );
}

export default SubmitWindow;
