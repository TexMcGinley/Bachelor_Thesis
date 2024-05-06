import MoviePoster from "./MoviePoster";
import "./MovieList.css";

interface Props {
  movies: {
    id: string;
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
      {movies.map((movie) => (
        <MoviePoster
          key={movie.id} // Using the movie's unique identifier as the key
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
