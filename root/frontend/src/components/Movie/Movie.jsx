import React, { useState, useRef } from "react";
import "./Movie.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Movie = ({
  id,
  title,
  imageUrl,
  releaseDate,
  genres,
  rating,
  certification,
  rank, // Accept rank as a prop
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // Optional: Adjust opacity or border if rank is -1
    opacity: rank === -1 ? 0.5 : 1,
    border: rank === -1 ? "2px dashed red" : "none",
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const dragState = useRef({
    isDragging: false,
    mouseDownTime: null,
  });

  const handleMouseDown = () => {
    dragState.current.mouseDownTime = Date.now(); // Record time when mouse is pressed down
  };

  const handleMouseUp = () => {
    const timeDiff = Date.now() - dragState.current.mouseDownTime;
    if (timeDiff < 200 && !dragState.current.isDragging) {
      // Check if time difference is less than 200 ms and not dragging
      setIsFlipped(!isFlipped);
    }
    dragState.current.isDragging = false; // Reset dragging state on mouse up
  };

  const enhancedListeners = {
    ...listeners,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onDragStart: () => {
      dragState.current.isDragging = true; // Set dragging to true when dragging starts
    },
    onDragEnd: () => {
      dragState.current.isDragging = false; // Reset dragging state when drag ends
    },
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...enhancedListeners}
      style={style}
      className={`movie ${isFlipped ? "flipped" : ""}`}
      onClick={(e) => e.stopPropagation()} // Prevent event bubbling which might trigger undesired effects
    >
      <div className="front">
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "200px", height: "300px" }}
        />
      </div>
      <div className="back">
        <h2>{title}</h2>
        <p>Release Date: {releaseDate}</p>
        <p>Genres: {genres.join(", ")}</p>
        <p>Rating: {rating}</p>
        <p>Certification: {certification}</p>
      </div>
    </div>
  );
};
