import { api } from "./client";
import type { Movie } from "../types/movie";

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Interstellar",
    year: 2014,
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
    genres: ["Sci-Fi", "Drama"],
    description: "A team travels through a wormhole in space.",
  },
  {
    id: "2",
    title: "Fight Club",
    year: 1999,
    posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    rating: 8.8,
    genres: ["Drama"],
    description: "An insomniac office worker forms an underground fight club.",
  },
];

export async function getMoviesFeed(): Promise<Movie[]> {
  try {
    const response = await api.get("/movies/feed");

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response.data.movies)) {
      return response.data.movies;
    }

    if (Array.isArray(response.data.data)) {
      return response.data.data;
    }

    return mockMovies;
  } catch {
    return mockMovies;
  }
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  try {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  } catch {
    return mockMovies.find((movie) => movie.id === id);
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const movies = await getMoviesFeed();

  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
}