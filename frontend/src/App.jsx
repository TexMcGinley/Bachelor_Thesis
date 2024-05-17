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
  closestCenter,
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

    console.log(rankedMovies);

    if (!over) {
      console.error("Drop event missing target.");
      return;
    }

    const fromId = active.id;
    const toId = over.id;

    console.log(`Drag End Event from ${fromId} to ${toId}`);

    // Create a copy of the rankedMovies with enough slots.
    let updatedRankedMovies = new Array(10).fill(null);

    for (let i = 0; i < rankedMovies.length; i++) {
      if (rankedMovies[i] !== null) {
        if (rankedMovies[i].rank !== undefined && rankedMovies[i].rank !== -1) {
          updatedRankedMovies[rankedMovies[i].rank] = rankedMovies[i];
        }
      } else {
        updatedRankedMovies[i] = null;
      }
    }

    console.log("Initial ranked movies:", updatedRankedMovies);

    let updatedMovies = [...movies];
    const fromIndex = fromId.startsWith("rank-slot")
      ? parseInt(fromId.split("-")[2])
      : updatedMovies.findIndex((item) => item.id === fromId);
    const toIndex = toId.startsWith("rank-slot")
      ? parseInt(toId.split("-")[2])
      : -1;

    console.log(`fromIndex: ${fromIndex}, toIndex: ${toIndex}`);

    if (fromIndex !== -1) {
      // Determine the source array based on whether the movie is currently in the ranking slots or in the movie grid
      const sourceArray = fromId.startsWith("rank-slot")
        ? updatedRankedMovies // Source is ranked movies if 'fromId' indicates a rank slot
        : updatedMovies; // Source is unranked movies otherwise

      // Retrieve the movie object from the source array
      const movie = sourceArray[fromIndex];
      sourceArray[fromIndex] = null; // Clear the original position in the source array

      if (toIndex !== -1) {
        // If the movie is being dropped into another rank slot
        if (updatedRankedMovies[toIndex]) {
          // Check if there is already a movie in the target rank slot
          console.log("Movie already in target rank");
          // Move the existing movie in the target slot back to the movie grid
          updatedMovies.push({ ...updatedRankedMovies[toIndex], rank: -1 });
        }
        // Place the dragged movie into the target rank slot
        updatedRankedMovies[toIndex] = { ...movie, rank: toIndex };
      } else {
        // If the movie is being dropped outside any rank slot (e.g., back to the movie grid)
        // Reset its rank to -1 indicating it is not in the ranked list
        updatedMovies.push({ ...movie, rank: -1 });
      }
    } else if (fromIndex === -1) {
      // If the from movie is in the recommendation ranking
      if (toIndex === -1) {
        // If the movie is being dropped outside any rank slot (e.g., back to the movie grid)
      } else if (toIndex !== -1) {
        // If the movie is being dropped into another rank slot
      }
    }

    const final_ranked_movies = new Array(10).fill(null); // Presuming there are a maximum of 10 ranks.

    for (let i = 0; i < updatedRankedMovies.length; i++) {
      if (updatedRankedMovies[i] !== null) {
        console.log("Rank:", updatedRankedMovies[i].rank);
        if (
          updatedRankedMovies[i].rank !== undefined &&
          updatedRankedMovies[i].rank !== -1
        ) {
          final_ranked_movies[updatedRankedMovies[i].rank] =
            updatedRankedMovies[i];
        }
      }
    }

    console.log("Final ranked movies:", final_ranked_movies);

    console.log(
      "Final movies:",
      updatedMovies.filter((movie) => movie)
    );
    console.log("Final ranked movies:", updatedRankedMovies);
    console.log(
      "final ranked movies filtered:",
      updatedRankedMovies.filter((movie) => movie)
    );

    setMovies(updatedMovies.filter((movie) => movie));
    setRankedMovies(final_ranked_movies.filter((movie) => movie));
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
