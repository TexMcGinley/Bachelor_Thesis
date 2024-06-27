import React from "react";
import "./StartScreen.css";

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1>MOVIE RANKER</h1>
        <p>
          In the game you will be tasked to compete against a Epsilon Greedy
          algorithm in creating a list of 10 movies to recommend to a user based
          on their details.
        </p>
        <p>You will get a score based on how good your recommendation is.</p>
        <p>The game is split up into 5 rounds.</p>
        <p>Each round you will be able to make 20 moves.</p>
        <p>
          An action is only considered a move if an unranked movie is added the
          recommendation ranking.
        </p>
        <p>
          To add a movie to the recommendation rankings simply drag and drop it
          on the ranking slot.
        </p>
        <p>
          You can also remove a movie from the recommendation rankings by
          dragging and dropping it back to the available movies.
        </p>
        <p>Click on a movies poster to see its relevant details.</p>
        <p>
          Each round the algorithm will perform better, your goal is to see how
          many rounds you are able to beat the algorithm for.
        </p>
        <p>
          Be sure to think about the reasons why you recommend which movie and
          try to come up with a strategy to get the highest score.
        </p>
        <button className="start-button" onClick={onStart}>
          START
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
