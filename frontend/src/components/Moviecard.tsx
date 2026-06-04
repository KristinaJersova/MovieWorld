import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

type Props = {
  movie: Movie;
};

export function MovieCard({ movie }: Props) {
  if (!movie || !movie.id || !movie.title) {
    return null;
  }

  const rating = movie.ratings?.[0]?.rating?.rating;
  const genres = movie.genres?.map((item) => item.genre.name).join(", ");

  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      {movie.poster ? (
        <img className="movie-poster" src={movie.poster} alt={movie.title} />
      ) : (
        <div className="movie-poster-placeholder">{movie.title[0]}</div>
      )}

      <div>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        {rating && <p>⭐ {rating}</p>}
        {genres && <p>{genres}</p>}
        {movie.director && <p>Director: {movie.director.name}</p>}
      </div>
    </Link>
  );
}