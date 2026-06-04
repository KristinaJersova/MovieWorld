import { api } from "./client";
import type { Movie } from "../types/movie";

export async function getMoviesFeed(): Promise<Movie[]> {
  const response = await api.get("/movies/feed");

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data.data)) {
    return response.data.data;
  }

  if (Array.isArray(response.data.movies)) {
    return response.data.movies;
  }

  return [];
}

export async function getMovieById(id: string): Promise<Movie | null> {
  const response = await api.get(`/movies/${id}`);

  if (response.data?.data) {
    return response.data.data;
  }

  return response.data;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const movies = await getMoviesFeed();

  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
}

export async function importMovieFromOmdb(title: string) {
  const response = await api.post("/omdb/import", { title });
  return response.data;
}

export async function deleteMovie(id: number) {
  const response = await api.delete(`/movies/${id}`);
  return response.data;
}