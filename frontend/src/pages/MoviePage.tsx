import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movies";
import type { Movie } from "../types/movie";

export function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getMovieById(id)
      .then(setMovie)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p>Loading movie...</p>;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  const rating = movie.ratings?.[0]?.rating;
  const actors = movie.actors?.map((item) => item.actor.name).join(", ");
  const genres = movie.genres?.map((item) => item.genre.name).join(", ");

  return (
    <section className="movie-details">
      <div className="movie-details-poster">
        {movie.title[0]}
      </div>

      <div>
        <h1>{movie.title}</h1>

        <p>
          {movie.year} • {movie.runtime} min • {movie.country}
        </p>

        {rating && (
          <p>
            ⭐ {rating.rating} / 10 — {rating.votes} votes
          </p>
        )}

        {movie.director && <p>Director: {movie.director.name}</p>}

        {genres && <p>Genres: {genres}</p>}

        {actors && <p>Actors: {actors}</p>}

        <p>{movie.description}</p>

        <p>Budget: ${movie.budget.toLocaleString()}</p>
      </div>
    </section>
  );
}