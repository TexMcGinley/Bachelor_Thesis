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
          <Movie
            id={movie.id}
            title={movie.title}
            imageUrl={movie.imageUrl}
            releaseDate={movie.releaseDate}
            genres={movie.genres}
            rating={movie.rating}
            certification={movie.certification}
            key={movie.id}
          />
        ))}
      </SortableContext>
    </div>
  );
};
