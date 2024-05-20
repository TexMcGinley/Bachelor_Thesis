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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Log the current state for debugging
    console.log("Ranked Movies at start:", rankedMovies);

    // Prevent handling if there is no target
    if (!over) {
      console.error("Drop event missing target.");
      return;
    }

    const fromId = `${active.id}`;
    const toId = `${over.id}`;

    // Debug output for tracking drag events
    console.log(`Drag End Event from ${fromId} to ${toId}`);

    // Avoid processing if the item is dropped back to its original position
    if (fromId === toId) {
      return;
    }

    // Copy of the current movies state
    let updatedMovies = [...movies];

    // Handle reordering within the movie grid itself
    if (!fromId.startsWith("rank-slot") && !toId.startsWith("rank-slot")) {
      console.log("Reordering movies within the grid");
      const fromIndex = getMoviePos(fromId);
      const toIndex = getMoviePos(toId);
      if (fromIndex > -1 && toIndex > -1) {
        updatedMovies = arrayMove(updatedMovies, fromIndex, toIndex);
        setMovies(updatedMovies);
        return;
      }
    }

    // Prepare the structure for ranked movies
    let updatedRankedMovies = new Array(10).fill(null);
    rankedMovies.forEach((movie, index) => {
      if (movie && movie.rank !== undefined && movie.rank !== -1) {
        updatedRankedMovies[movie.rank] = movie;
      }
    });

    // Debugging the initial state of ranked movies after setup
    console.log("Initial ranked movies:", updatedRankedMovies);

    // Determine the source and target indices based on IDs
    const fromIndex = fromId.startsWith("rank-slot")
      ? parseInt(fromId.split("-")[2], 10)
      : updatedMovies.findIndex((item) => item.id === fromId);
    const toIndex = toId.startsWith("rank-slot")
      ? parseInt(toId.split("-")[2], 10)
      : -1;

    // More debugging output for index determination
    console.log(`fromIndex: ${fromIndex}, toIndex: ${toIndex}`);

    // Handle moving movies between and within rankings and the grid
    if (fromIndex !== -1) {
      const sourceArray = fromId.startsWith("rank-slot")
        ? updatedRankedMovies
        : updatedMovies;
      const movie = sourceArray[fromIndex];
      sourceArray[fromIndex] = null; // Clear the original position

      if (toIndex !== -1) {
        const targetMovie = updatedRankedMovies[toIndex];
        if (targetMovie) {
          console.log("Swapping movies in rank slots");
          updatedRankedMovies[fromIndex] = targetMovie; // Swap the positions
          targetMovie.rank = fromIndex;
        }
        updatedRankedMovies[toIndex] = { ...movie, rank: toIndex };
      } else {
        updatedMovies.push({ ...movie, rank: -1 }); // Reset rank if dropped outside a rank slot
      }
    }

    // Finalize the ranked movies array
    const final_ranked_movies = updatedRankedMovies.filter(
      (movie) => movie !== null
    );

    // Output the final state of movies for verification
    console.log("Final ranked movies:", final_ranked_movies);
    console.log("Final movies:", updatedMovies);
    console.log("Final ranked movies state:", updatedRankedMovies);

    // Update the state with new arrays
    setMovies(updatedMovies.filter((movie) => movie !== null));
    setRankedMovies(final_ranked_movies);
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
        <h1>Movie Ranker</h1>
      </div>
      <div className="content">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <RecommendationRanking movies={rankedMovies} />
          <Column movies={movies} />
        </DndContext>
      </div>
    </div>
  );
}
