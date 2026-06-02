import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

type Props = {
  movie: Movie;
};

export function MovieCard({ movie }: Props) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <article>
        <img src={movie.posterUrl} alt={movie.title} width="180" />
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        {movie.rating && <p>Rating: {movie.rating}</p>}
      </article>
    </Link>
  );
}