import { useState } from "react";
import "./App.css";
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
} from "@dnd-kit/core";
import { Column } from "./components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { RecommendationRanking } from "./components/RecommendationRanking/RecommendationRanking";

export default function App() {
  const [movies, setMovies] = useState([
    {
      id: "1",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: -1,
    },
    {
      id: "2",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
      rank: -1,
    },
    {
      id: "3",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: -1,
    },
    {
      id: "4",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
      rank: -1,
    },
    {
      id: "5",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: -1,
    },
    {
      id: "21",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: -1,
    },
    {
      id: "22",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
      rank: -1,
    },
    {
      id: "23",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: -1,
    },
    {
      id: "24",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
      rank: -1,
    },
    {
      id: "25",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: -1,
    },
    {
      id: "26",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
      rank: -1,
    },
  ]);

  const [rankedMovies, setRankedMovies] = useState([]);

  const getMoviePos = (id) => movies.findIndex((movie) => movie.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("Drag End Event:", { active, over });

    if (!over || !active.data.current || !over.data.current) {
      console.error("Drop event missing data");
      return;
    }

    // Assume 'movies' is the default container for the grid and 'recommendations' for the ranking slots
    const fromContainer =
      active.data.current.sortable.containerId === "movies"
        ? "movies"
        : "recommendations";
    const toContainer = over.data.current.sortable.containerId.includes("slot")
      ? "recommendations"
      : "movies";

    console.log(
      `Resolved From Container: ${fromContainer}, To Container: ${toContainer}`
    );

    const fromItems =
      fromContainer === "movies" ? [...movies] : [...rankedMovies];
    const fromIndex = fromItems.findIndex((item) => item.id === active.id);
    const activeItem = fromItems[fromIndex];

    if (toContainer === "recommendations") {
      const toRank = parseInt(over.id.split("-")[1]);

      // Check if the slot is already occupied
      const existingMovieIndex = fromItems.findIndex(
        (item) => item.rank === toRank
      );
      if (existingMovieIndex !== -1) {
        fromItems[existingMovieIndex].rank = -1; // Move existing movie back to the grid
      }

      // Update rank for the moved item
      activeItem.rank = toRank;
      console.log(`Moved movie ${active.id} to rank ${toRank}`);
    } else if (
      fromContainer === "recommendations" &&
      toContainer === "movies"
    ) {
      activeItem.rank = -1; // Moving back to movies
      console.log(`Moved movie ${active.id} back to movies`);
    }

    // Commit the state changes
    setMovies(fromItems.filter((item) => item.rank === -1)); // Only non-ranked movies are in the grid
    setRankedMovies(fromItems.filter((item) => item.rank !== -1)); // Ranked movies are in the rankings

    console.log(
      "Updated Movies:",
      fromItems.filter((item) => item.rank === -1)
    );
    console.log(
      "Updated Ranked Movies:",
      fromItems.filter((item) => item.rank !== -1)
    );
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
          collisionDetection={closestCorners}
        >
          <RecommendationRanking
            movies={movies.filter((movie) => movie.rank !== -1)}
          />
          <Column movies={movies} />
        </DndContext>
      </div>
    </div>
  );
}
