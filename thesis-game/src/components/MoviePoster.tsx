import { useState } from "react";
import "./MoviePoster.css";

interface Props {
  title: string;
  imageUrl: string;
  releaseDate: string;
  rating: number;
  certification: string;
  genres: string[];
}

function MoviePoster({
  title,
  imageUrl,
  releaseDate,
  rating,
  certification,
  genres,
}: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`movie-poster ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
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
        <p>Genres {genres.join(", ")}</p>
        <p>Rating: {rating}</p>
        <p>Certification: {certification}</p>
      </div>
    </div>
  );
}

export default MoviePoster;

// const MoviePoster = ({ title, imageUrl, releaseDate }: Props) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <div
//       className="movie-poster"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <img
//         src={imageUrl}
//         alt={title}
//         style={{ width: "200px", height: "300px" }} // Adjust width and height as needed
//       />
//       {isHovered && (
//         <div className="movie-details">
//           <h2>{title}</h2>
//           <p>Release Date: {releaseDate}</p>
//         </div>
//       )}
//     </div>
//   );
// };
