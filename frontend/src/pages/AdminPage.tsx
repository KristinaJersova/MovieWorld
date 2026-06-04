import { FormEvent, useEffect, useState } from "react";
import {
  deleteMovie,
  getMoviesFeed,
  importMovieFromOmdb,
} from "../api/movies";
import type { Movie } from "../types/movie";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export function AdminPage() {
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    const data = await getMoviesFeed();
    setMovies(data);
  }

  async function handleImport(e: FormEvent) {
    e.preventDefault();

    try {
      await importMovieFromOmdb(title);
      setMessage("Movie imported successfully");
      setTitle("");
      loadMovies();
    } catch (error) {
      setMessage("Import failed");
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Delete this movie?");

    if (!confirmDelete) return;

    try {
      await deleteMovie(id);
      setMessage("Movie deleted successfully");
      loadMovies();
    } catch (error) {
      setMessage("Delete failed");
      console.error(error);
    }
  }

  if (!user || user.role !== "admin") {
    return <p>Access denied. Admin only.</p>;
  }

  return (
    <section>
      <h1>Admin Panel</h1>

      <form onSubmit={handleImport} className="admin-form">
        <input
          placeholder="Movie title from OMDb"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <button type="submit">Import Movie</button>
      </form>

      {message && <p>{message}</p>}

      <div className="admin-movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="admin-movie-item">
            <span>
              {movie.title} ({movie.year})
            </span>

            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}