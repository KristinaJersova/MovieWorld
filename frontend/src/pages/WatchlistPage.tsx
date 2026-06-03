import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { MovieCard } from "../components/MovieCard";

export function WatchlistPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const watchlist: Movie[] = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    );

    setMovies(watchlist);
  }, []);

  return (
    <section>
      <h1>❤️ My Watchlist</h1>

      {movies.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}