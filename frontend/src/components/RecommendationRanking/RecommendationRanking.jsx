import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Movie } from "../Movie/Movie";
import "./RecommendationRanking.css";
import {
  useSortable,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DroppableArea = ({ id, rank, children }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(attributes.style?.transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="droppable-container"
      style={style}
    >
      <div className="droppable-area">
        {children || <div className="placeholder-content">Drop here</div>}
      </div>
      <div className="rank-label">Rank {rank + 1}</div>
    </div>
  );
};

export const RecommendationRanking = ({ movies }) => {
  // Create a full list of 10 slots, filled or empty
  const slots = Array.from({ length: 10 }, (_, index) => {
    return movies[index] || { id: `empty-${index}`, empty: true };
  });

  return (
    <div className="ranking-grid">
      <SortableContext
        items={slots.map((slot) => slot.id)}
        strategy={rectSortingStrategy}
      >
        {slots.map((slot, index) => (
          <DroppableArea key={slot.id} id={slot.id} rank={index}>
            {slot.empty ? null : (
              <Movie
                id={slot.id}
                title={slot.title}
                imageUrl={slot.imageUrl}
                releaseDate={slot.releaseDate}
                genres={slot.genres}
                rating={slot.rating}
                certification={slot.certification}
              />
            )}
          </DroppableArea>
        ))}
      </SortableContext>
    </div>
  );
};
