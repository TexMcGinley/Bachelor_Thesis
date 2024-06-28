import { useState, useEffect } from "react";
import "./App.css";
import {
  DndContext,
  PointerSensor,
  useSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { Column } from "./components/Column/Column";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { RecommendationRanking } from "./components/RecommendationRanking/RecommendationRanking";
import TopBar from "./components/TopBar/TopBar";
import UserBar from "./components/UserBar/UserBar";
import ErrorBoundary from "./components/ErrorBoundary";
import SubmitWindow from "./components/SubmitWindow/SubmitWindow";
import StartScreen from "./components/StartScreen/StartScreen";

export default function App() {
  // State variables
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [rankedMovies, setRankedMovies] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem("highScore")) || 0;
  }); // Initialize highScore state from local storage or set to 0
  const [showSubmitWindow, setShowSubmitWindow] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [epsilonScore, setEpsilonScore] = useState(0); // Add epsilonScore state
  const [epsilonValue, setEpsilonValue] = useState(1.0); // Add epsilonValue state
  const [movesLeft, setMovesLeft] = useState(20); // Add movesLeft state
  const [round, setRound] = useState(1); // Add round state

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/user");
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  // Reset the game state
  const resetGame = () => {
    setHighScore(0);
    localStorage.setItem("highScore", 0);
    setScore(0);
    setEpsilonScore(0);
    setEpsilonValue(1.0);
    setMovesLeft(20);
    setRound(1);
    setRankedMovies([]);
    setShowSubmitWindow(false);
  };

  // Start the game
  const startGame = () => {
    resetGame();
    setGameStarted(true);
  };

  // Restart the game
  const handleRestart = () => {
    resetGame();
    setGameStarted(false);
  };

  // Fetch watched movies when user data is available
  useEffect(() => {
    if (user) {
      const fetchWatchedMovies = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/watched_movies?user_id=${user.id}`
          );
          if (!response.ok) throw new Error("Failed to fetch watched movies");
          const movies = await response.json();
          setWatchedMovies(movies);
        } catch (error) {
          console.error("Error fetching watched movies:", error);
        }
      };

      fetchWatchedMovies();
    }
  }, [user]);

  // Fetch available movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies");
        if (!response.ok) throw new Error("Failed to fetch movies");
        const fetchedMovies = await response.json();

        // Filter out watched movies
        const watchedMovieIds = new Set(watchedMovies.map((movie) => movie.id));
        const filteredMovies = fetchedMovies.filter(
          (movie) => !watchedMovieIds.has(movie.movie_id)
        );

        setMovies(
          filteredMovies.map((movie) => ({
            id: `${movie.movie_id}`,
            title: movie.title,
            releaseDate: movie.release_date,
            rating: movie.rating,
            certification: movie.certification,
            genres: movie.genres.split(","),
            imageUrl: movie.poster_path,
            rank: -1,
          }))
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [watchedMovies]);

  // Fetch the score
  useEffect(() => {
    fetch("http://localhost:5000/score")
      .then((response) => response.json())
      .then((data) => {
        setScore(data.score);
      })
      .catch((error) => console.error("Error fetching score:", error));
  }, []);

  // Handle submission of the score
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to submit");

      const { userScore, epsilonScore, epsilonValue, round, movesLeft } =
        await response.json();
      setScore(userScore);
      setEpsilonScore(epsilonScore);
      setEpsilonValue(epsilonValue);
      setMovesLeft(movesLeft);
      setShowSubmitWindow(true);
      console.log("Score submitted:", userScore);

      if (userScore > highScore) {
        setHighScore(userScore);
        localStorage.setItem("highScore", userScore);
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  // Handle quitting the game
  const handleQuit = () => {
    window.close();
  };

  // Handle moving to the next user (placeholder for future implementation)
  const handleNextUser = () => {
    console.log("Setup for next user");
  };

  // Handle moving to the next round
  const handleNextRound = () => {
    setShowSubmitWindow(false);
    setMovesLeft(20); // Reset moves left for the next round
    setRound((prevRound) => prevRound + 1);
    console.log("Start next round");
    // Logic to start the next round goes here
  };

  // Logic to decrement movesLeft when a move is made
  const handleMovieAdd = async (movieId, slotId) => {
    if (movesLeft > 0) {
      setMovesLeft((prevMovesLeft) => prevMovesLeft - 1);

      // Trigger handleSubmit when moves are exhausted
      if (movesLeft - 1 === 0) {
        await handleSubmit();
      }
    }
  };

  // Handle the drag end event for DnD kit
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const fromId = active.id.toString();
    const toId = over.id.toString();

    try {
      const response = await fetch(`http://localhost:5000/update_rankings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromId, toId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update rankings");
      }

      const { availableMovies, rankedMovies, score } = await response.json();
      setMovies(availableMovies);
      setRankedMovies(
        rankedMovies.map((movie) => (movie !== "null" ? movie : null))
      );
      setScore(score);

      // Check if the movie was added from availableMovies to rankedMovies
      if (!fromId.includes("rank-slot") && toId.includes("rank-slot")) {
        await handleMovieAdd(fromId, toId);
      }
    } catch (error) {
      console.error("Failed to handle drag end:", error);
    }
  };

  // Initialize sensors for DnD kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Render start screen if game has not started
  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  // Main app render
  return (
    <div className="App">
      <div className="header">
        <TopBar
          score={score}
          movesLeft={movesLeft}
          round={round}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="content">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <div className="recommendationRanking">
            <ErrorBoundary>
              <RecommendationRanking movies={rankedMovies} />
            </ErrorBoundary>
          </div>
          <div className="movieGrid">
            <ErrorBoundary>
              {movies && movies.length > 0 ? (
                <Column movies={movies} onMovieAdd={handleMovieAdd} />
              ) : (
                <p>No movies to display.</p>
              )}
            </ErrorBoundary>
          </div>
          <div className="userBar">
            {user && <UserBar user={user} watchedMovies={watchedMovies} />}
          </div>
        </DndContext>
      </div>
      {showSubmitWindow && (
        <SubmitWindow
          round={round}
          score={score}
          highScore={highScore}
          epsilonScore={epsilonScore}
          epsilonValue={epsilonValue}
          onQuit={handleQuit}
          onNextUser={handleNextUser}
          onNextRound={handleNextRound}
          onRestart={handleRestart} // Pass the onRestart prop to SubmitWindow
        />
      )}
    </div>
  );
}
