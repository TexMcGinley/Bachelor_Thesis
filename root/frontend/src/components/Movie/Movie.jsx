import React, { useState, useRef, memo } from "react";
import "./Movie.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Movie = memo(
  ({
    id,
    title,
    imageUrl,
    releaseDate,
    genres,
    rating,
    certification,
    rank, // Accept rank as a prop
    isSmall = false, // Accept isSmall as a prop with default value
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });
    const style = {
      transition: transition || "transform 300ms ease",
      transform: CSS.Transform.toString(transform),
      opacity: rank === -1 ? 0.5 : 1, // Adjust opacity or border if rank is -1
      border: rank === -1 ? "2px dashed red" : "none",
      width: isSmall ? "90px" : "200px", // Smaller width if isSmall is true
      height: isSmall ? "135px" : "300px", // Adjust height accordingly
    };

    const movieStyle = {
      width: isSmall ? "90px" : "200px", // Smaller width if isSmall is true
      height: isSmall ? "135px" : "300px", // Adjust height accordingly
      "font-size": isSmall ? "0.8rem" : "1rem", // Adjust font size accordingly
    };

    const [isFlipped, setIsFlipped] = useState(false);
    const dragState = useRef({ isDragging: false, mouseDownTime: null });

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
      onDragStart: () => (dragState.current.isDragging = true), // Set dragging to true when dragging starts
      onDragEnd: () => (dragState.current.isDragging = false), // Reset dragging state when drag ends
    };

    // Safely handle genres display
    const genreText = Array.isArray(genres) ? genres.join(", ") : "No Genres";

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...enhancedListeners}
        style={style}
        className={`movie ${isFlipped ? "flipped" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="front">
          <img
            src={imageUrl || "path/to/default/image.jpg"}
            alt={title}
            style={movieStyle}
          />
        </div>
        <div className="back" style={movieStyle}>
          <h2>{title || "No Title"}</h2>
          <p>Release Date: {releaseDate || "Unknown"}</p>
          <p>Genres: {genreText}</p>
          <p>Rating: {rating || "NR"}</p>
          <p>Certification: {certification || "Not Certified"}</p>
        </div>
      </div>
    );
  }
);
