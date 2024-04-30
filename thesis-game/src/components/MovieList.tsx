import MoviePoster from "./MoviePoster";
import "./MovieList.css";

interface Props {
  movies: {
    title: string;
    imageUrl: string;
    releaseDate: string;
    genres: string[];
    rating: number;
    certification: string;
  }[];
}

function MovieList({ movies }: Props) {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MoviePoster
          key={index}
          title={movie.title}
          imageUrl={movie.imageUrl}
          releaseDate={movie.releaseDate}
          genres={movie.genres}
          rating={movie.rating}
          certification={movie.certification}
        />
      ))}
    </div>
  );
}

export default MovieList;
