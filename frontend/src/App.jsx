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
    },
  ]);

  const [rankedMovies, setRankedMovies] = useState([
    {
      id: "11",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
    },
    {
      id: "12",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
    },
  ]);

  const getMoviePos = (id) => movies.findIndex((movie) => movie.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log(`Active: ${JSON.stringify(active)}`);
    console.log(`Over: ${JSON.stringify(over)}`);

    if (!over || !active.data.current || !over.data.current) {
      console.error("Drop event missing data");
      return;
    }

    console.log(
      `Dragged item ID: ${active.id}, from ${active.data.current.sortable.containerId} to ${over.data.current.sortable.containerId}`
    );

    const fromContainer = active.data.current.sortable.containerId;
    const toContainer = over.data.current.sortable.containerId;

    if (!fromContainer || !toContainer) {
      console.error("Undefined container ID");
      return;
    }

    if (fromContainer === toContainer) {
      const items = fromContainer === "movies" ? movies : rankedMovies;
      const activeIndex = items.findIndex((item) => item.id === active.id);
      const overIndex = items.findIndex((item) => item.id === over.id);

      if (activeIndex === -1 || overIndex === -1) {
        console.error("Invalid indices", activeIndex, overIndex);
        return;
      }

      const reorderedItems = arrayMove(items, activeIndex, overIndex);
      if (fromContainer === "movies") {
        setMovies(reorderedItems);
      } else {
        setRankedMovies(reorderedItems);
      }
    } else {
      const fromItems = fromContainer === "movies" ? movies : rankedMovies;
      const toItems = toContainer === "movies" ? movies : rankedMovies;
      const activeItem = fromItems.find((item) => item.id === active.id);
      const fromIndex = fromItems.findIndex((item) => item.id === active.id);
      const toIndex = toItems.length; // Add to the end if no specific drop target

      if (!activeItem || fromIndex === -1) {
        console.error("Item or index not found", activeItem, fromIndex);
        return;
      }

      fromItems.splice(fromIndex, 1);
      toItems.splice(toIndex, 0, activeItem);

      if (fromContainer === "movies") {
        setMovies([...fromItems]); // Update movies
        setRankedMovies([...toItems]); // Update rankedMovies
      } else {
        setRankedMovies([...fromItems]); // Update rankedMovies
        setMovies([...toItems]); // Update movies
      }
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
