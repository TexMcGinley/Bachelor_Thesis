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
  const isEmpty = !children;

  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id,
    data: {
      type: "droppable",
      rank,
    },
    disabled: isEmpty, // Disable dragging if the slot is empty
  });

  const style = {
    transform: CSS.Translate.toString(attributes.style?.transform),
    //opacity: isDragging ? 0.5 : 1,
    position: "relative", // Ensure it positions its children absolutely
    zIndex: 2, // Ensures interaction layer is above visual layer
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
      {children && (
        <div
          className="movie-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "94px",
            height: "134px",
            pointerEvents: "none",
          }}
        >
          <Movie
            id={children.id}
            title={children.title}
            imageUrl={children.imageUrl}
            releaseDate={children.releaseDate}
            genres={children.genres}
            rating={children.rating}
            certification={children.certification}
            isSmall={true} // Adjust size of movie component
          />
        </div>
      )}
      <div
        className="droppable-area"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "90px",
          height: "135px",
          zIndex: 1,
        }}
      >
        <div
          className="placeholder-content"
          style={{ visibility: children ? "hidden" : "visible" }}
        >
          Drop here
        </div>
      </div>
      <div
        className="rank-label"
        style={{
          position: "absolute",
          bottom: -20,
          width: "100%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        Rank {rank + 1}
      </div>
    </div>
  );
};

export const RecommendationRanking = ({ movies }) => {
  const slots = Array.from({ length: 10 }, (_, index) => {
    const slotId = `rank-slot-${index}`; // Adjusting slot ID to follow a clear pattern
    const movie = movies.find((m) => m && m.rank === index); // Ensure movies is defined and then perform find
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
            {slot.movie}
          </DroppableArea>
        ))}
      </SortableContext>
    </div>
  );
};
