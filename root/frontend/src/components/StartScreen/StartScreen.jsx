import React from "react";
import "./StartScreen.css";

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1>MOVIE RANKER</h1>
        <p>
          In the game you will be tasked to create a list of 10 movies to
          recommend to a user based on their details.
        </p>
        <p>You will get a score based on how good your recommendation is.</p>
        <p>
          Think about the reasons why you recommend which movie and try to come
          up with a strategy to get the highest score.
        </p>
        <button className="start-button" onClick={onStart}>
          START
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
