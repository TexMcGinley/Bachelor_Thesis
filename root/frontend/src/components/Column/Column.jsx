import React from "react";
import "./Column.css";
import { Movie } from "../Movie/Movie";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const Column = ({ movies }) => {
  return (
    <div className="column">
      <SortableContext
        items={movies.map((movie) => movie.id)}
        strategy={verticalListSortingStrategy}
        id="movies"
      >
        {movies.map((movie) => (
          // console.log("Movie Data:", movie.title, movie.imageUrl),
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageUrl={movie.imageUrl} // default image if none
            releaseDate={movie.releaseDate || "Unknown date"}
            genres={movie.genres || []} // ensure genres is always an array
            rating={movie.rating || "NR"} // 'NR' for Not Rated
            certification={movie.certification || "Not certified"}
          />
        ))}
      </SortableContext>
    </div>
  );
};
