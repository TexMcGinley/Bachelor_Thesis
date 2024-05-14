import React from "react";
import {
  useSortable,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Movie } from "../Movie/Movie";
import "./RecommendationRanking.css";

const DroppableArea = ({ id, rank, children }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id,
    data: {
      type: "droppable",
      rank,
    },
  });

  const style = {
    transform: CSS.Translate.toString(attributes.style?.transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="droppable-container"
      style={style}
      data-container-id={`rank-slot-${rank}`} // Ensure container ID is set for each slot
    >
      <div className="droppable-area">
        {children || <div className="placeholder-content">Drop here</div>}
      </div>
      <div className="rank-label">Rank {rank + 1}</div>
    </div>
  );
};

export const RecommendationRanking = ({ movies }) => {
  const slots = Array.from({ length: 10 }, (_, index) => {
    const slotId = `rank-slot-${index}`; // Adjusting slot ID to follow a clear pattern
    const movie = movies.find((m) => m.rank === index);
    return {
      id: slotId,
      movie: movie,
      rank: index,
    };
  });

  return (
    <div className="ranking-grid">
      <SortableContext
        items={slots.map((slot) => slot.id)}
        strategy={rectSortingStrategy}
      >
        {slots.map((slot) => (
          <DroppableArea key={slot.id} id={slot.id} rank={slot.rank}>
            {slot.movie && (
              <Movie
                id={slot.movie.id}
                title={slot.movie.title}
                imageUrl={slot.movie.imageUrl}
                releaseDate={slot.movie.releaseDate}
                genres={slot.movie.genres}
                rating={slot.movie.rating}
                certification={slot.movie.certification}
              />
            )}
          </DroppableArea>
        ))}
      </SortableContext>
    </div>
  );
};
