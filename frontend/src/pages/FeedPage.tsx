import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesFeed, searchMovies } from "../api/movies";
import type { Movie } from "../types/movie";
import { MovieCard } from "../components/MovieCard";

export function FeedPage() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMoviesFeed()
      .then((data) => {
        let result = [...data];

        if (filter === "new") {
          result.sort((a, b) => b.year - a.year);
        }

        if (filter === "top") {
          result.sort((a, b) => {
            const ratingA = a.ratings?.[0]?.rating?.rating ?? 0;
            const ratingB = b.ratings?.[0]?.rating?.rating ?? 0;

            return ratingB - ratingA;
          });
        }

        setMovies(result);
      })
      .finally(() => setLoading(false));
  }, [filter]);

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

  if (loading) return <p>Loading movies...</p>;

  return (
    <section>
      <h1>
        {filter === "new"
          ? "New Releases"
          : filter === "top"
          ? "Top Rated"
          : "MovieWorld"}
      </h1>

      <input
        className="search-input"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}