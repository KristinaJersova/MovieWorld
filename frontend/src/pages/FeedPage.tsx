import { useEffect, useState } from "react";
import { getMoviesFeed, searchMovies } from "../api/movies";
import type { Movie } from "../types/movie";
import { MovieCard } from "../components/MovieCard";

export function FeedPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMoviesFeed().then(setMovies);
  }, []);

  async function handleSearch(value: string) {
    setSearch(value);

    if (!value.trim()) {
      const data = await getMoviesFeed();
      setMovies(data);
      return;
    }

    const results = await searchMovies(value);
    setMovies(results);
  }

  return (
    <section>
      <h1>MovieWorld</h1>

      <input
        placeholder="Search movies..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {movies.length === 0 && <p>No movies found</p>}

      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}