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

    if (!over) {
      console.error("Drop event missing target.");
      return;
    }

    const fromId = active.id;
    const toId = over.id;

    console.log(`Drag End Event from ${fromId} to ${toId}`);

    // Clone arrays for immutability
    let updatedMovies = [...movies];
    let updatedRankedMovies = [...rankedMovies];

    // Find index in the original or ranked list
    const fromIndex = updatedMovies.findIndex((item) => item.id === fromId);
    const toIndex = toId.startsWith("rank-slot")
      ? parseInt(toId.split("-")[2])
      : -1;

    console.log(`From Index: ${fromIndex}, To Index: ${toIndex}`);

    if (fromIndex !== -1) {
      // Moving from movies to rankings
      const movie = updatedMovies.splice(fromIndex, 1)[0]; // Remove from movies
      if (toIndex !== -1) {
        // Check if the target slot is filled
        if (updatedRankedMovies[toIndex]) {
          // Move the existing movie back to movies array
          updatedMovies.push({ ...updatedRankedMovies[toIndex], rank: -1 });
          console.log(updatedMovies);
        }
        // Place the movie into the ranking slot
        updatedRankedMovies[toIndex] = { ...movie, rank: toIndex };
        console.log(updatedRankedMovies);
      } else {
        // If dropped outside a valid ranking slot, push back to movies
        updatedMovies.push(movie);
      }
    } else {
      // Moving within or out of rankings
      const rankedIndex = updatedRankedMovies.findIndex(
        (item) => item.id === fromId
      );
      console.log(`Ranked Index: ${rankedIndex}`);
      if (rankedIndex !== -1) {
        const movie = updatedRankedMovies[rankedIndex];
        updatedRankedMovies.splice(rankedIndex, 1); // Remove from current position
        console.log("update ranked movies: ", updatedRankedMovies);
        console.log("to index: ", toIndex);
        if (toIndex !== -1) {
          // Move within rankings or to a new position
          updatedRankedMovies[toIndex] = { ...movie, rank: toIndex };
        } else {
          // Move back to movies
          updatedMovies.push({ ...movie, rank: -1 });
        }
      }
    }

    // Update states
    setMovies(updatedMovies);
    setRankedMovies(updatedRankedMovies);
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
          <RecommendationRanking movies={rankedMovies} />
          <Column movies={movies} />
        </DndContext>
      </div>
    </div>
  );
}
