import { useState, useEffect } from "react";
import "./App.css";
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { Column } from "./components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { RecommendationRanking } from "./components/RecommendationRanking/RecommendationRanking";
import TopBar from "./components/TopBar/TopBar";
import userIcon from "./assets/images/userIcon.svg";
import UserBar from "./components/UserBar/UserBar";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (window.api && window.api.fetchMovies) {
      window.api
        .fetchMovies()
        .then((data) => {
          // Process the movie data if it's in the form of an array of arrays
          const processedMovies = data.map((movie) => ({
            id: `${movie["movie_id"]}`, // Assuming the first element is the ID
            title: movie["title"],
            releaseDate: movie["release_date"],
            rating: movie["rating"],
            certification: movie["certification"],
            genres: movie.genres ? movie.genres.split(",") : [],
            imageUrl: movie["poster_path"], // Adjust the indices according to your data structure
            rank: -1, // Initialize the rank to -1
          }));
          console.log("Processed Movies:", processedMovies);
          setMovies(processedMovies);
          // console.log("Movies id:", `${movies[0]["id"]}`);
        })
        .catch(console.error);
    } else {
      console.log("API not available, running in non-Electron environment");
    }
  }, []);

  const [rankedMovies, setRankedMovies] = useState([
    // {
    //   id: "27",
    //   title: "Forest Gump",
    //   imageUrl:
    //     "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    //   releaseDate: "11/09/2002",
    //   genres: ["Drama", "Romance"],
    //   rating: 8.8,
    //   certification: "PG-13",
    //   rank: 0,
    // },
  ]);

  const getMoviePos = (id) => movies.findIndex((movie) => movie.id === id);

  const [user, setUser] = useState({
    name: "John Doe",
    age: 25,
    location: "New York",
    deviceTyoe: "Desktop",
    accountAge: 3,
    avatar: userIcon,
  });

  const [watchedMovies, setWatchedMovies] = useState([
    {
      id: "27",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: 0,
      isSmall: true,
    },
    {
      id: "33333327",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: 0,
      isSmall: true,
    },
    {
      id: "3333327",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: 0,
      isSmall: true,
    },
    {
      id: "333327",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: 0,
      isSmall: true,
    },
    {
      id: "33327",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: 0,
      isSmall: true,
    },
    {
      id: "3327",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: 0,
      isSmall: true,
    },
    {
      id: "327",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: 0,
      isSmall: true,
    },
  ]);

  const [score, setScore] = useState(0); // Example score state

  useEffect(() => {
    fetch("http://localhost:5000/score") // Update the URL/port based on your Flask config
      .then((response) => response.json())
      .then((data) => {
        setScore(data.score);
      })
      .catch((error) => console.error("Error fetching score:", error));
  }, []);

  const handleSubmit = () => {
    // Implement score submission logic here
    console.log("Score submitted:", score);
  };

  const handleFilter = () => {
    // Implement filter logic here
    console.log("Filter modal opened");
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      console.log(
        "Drag ended on the same item or outside of a droppable area."
      );
      return;
    }

    const fromId = active.id;
    const toId = over.id;
    console.log(`Drag End Event from ${fromId} to ${toId}`);

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
      setMovies(availableMovies); // Update the available movies
      setRankedMovies(
        rankedMovies.map((movie) => (movie !== "null" ? movie : null))
      );
      setScore(score);
      console.log(
        "Updated available movies, rankings, and score successfully."
      );
    } catch (error) {
      console.error("Failed to handle drag end:", error);
      // Optionally handle user feedback here
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
            <UserBar user={user} watchedMovies={watchedMovies} />
          </div>
        </DndContext>
      </div>
    </div>
  );
}
