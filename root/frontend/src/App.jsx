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
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [rankedMovies, setRankedMovies] = useState([]);
  const [score, setScore] = useState(0);
  const [showSubmitWindow, setShowSubmitWindow] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

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

  const startGame = () => {
    setGameStarted(true);
  };

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

  useEffect(() => {
    fetch("http://localhost:5000/score")
      .then((response) => response.json())
      .then((data) => {
        setScore(data.score);
      })
      .catch((error) => console.error("Error fetching score:", error));
  }, []);

  const handleSubmit = () => {
    setShowSubmitWindow(true);
    console.log("Score submitted:", score);
  };

  const handleQuit = () => {
    window.close();
  };

  const handleNextUser = () => {
    console.log("Setup for next user");
  };

  const handleFilter = () => {
    console.log("Filter modal opened");
  };

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
    } catch (error) {
      console.error("Failed to handle drag end:", error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className="App">
      <div className="header">
        <TopBar score={score} onSubmit={handleSubmit} onFilter={handleFilter} />
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
                <Column movies={movies} />
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
          score={score}
          highScore={score}
          onQuit={handleQuit}
          onNextUser={handleNextUser}
        />
      )}
    </div>
  );
}
