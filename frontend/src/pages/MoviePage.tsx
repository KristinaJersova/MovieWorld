import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movies";
import type { Movie } from "../types/movie";

type Review = {
  movieId: number;
  text: string;
};

export function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  const [userRating, setUserRating] = useState<number>(0);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (!id) return;

    getMovieById(id)
      .then(setMovie)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!movie) return;

    const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

    setUserRating(ratings[movie.id] || 0);
    setInWatchlist(watchlist.includes(movie.id));
  }, [movie]);

  function handleRate(value: number) {
    if (!movie) return;

    const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
    ratings[movie.id] = value;

    localStorage.setItem("ratings", JSON.stringify(ratings));
    setUserRating(value);
  }

  function toggleWatchlist() {
    if (!movie) return;

    const watchlist: number[] = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    );

    const updatedWatchlist = watchlist.includes(movie.id)
      ? watchlist.filter((movieId) => movieId !== movie.id)
      : [...watchlist, movie.id];

    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setInWatchlist(updatedWatchlist.includes(movie.id));
  }

  function handleReviewSubmit(e: FormEvent) {
    e.preventDefault();

    if (!movie || !reviewText.trim()) return;

    const reviews: Review[] = JSON.parse(
      localStorage.getItem("reviews") || "[]"
    );

    const newReview: Review = {
      movieId: movie.id,
      text: reviewText,
    };

    localStorage.setItem("reviews", JSON.stringify([...reviews, newReview]));
    setReviewText("");
  }

  if (loading) return <p>Loading movie...</p>;
  if (!movie) return <p>Movie not found</p>;

  const rating = movie.ratings?.[0]?.rating;
  const actors = movie.actors?.map((item) => item.actor.name).join(", ");
  const genres = movie.genres?.map((item) => item.genre.name).join(", ");

  const reviews: Review[] = JSON.parse(localStorage.getItem("reviews") || "[]");
  const movieReviews = reviews.filter((review) => review.movieId === movie.id);

  return (
    <section className="movie-details">
      {movie.poster ? (
        <img
          className="movie-details-poster-image"
          src={movie.poster}
          alt={movie.title}
        />
      ) : (
        <div className="movie-details-poster">{movie.title[0]}</div>
      )}

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

        <div className="movie-actions">
          <div>
            <h3>⭐ Rate movie</h3>

            <div className="rating-buttons">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={userRating === value ? "active-rating" : ""}
                  onClick={() => handleRate(value)}
                >
                  {value}
                </button>
              ))}
            </div>

            {userRating > 0 && <p>Your rating: {userRating}/5</p>}
          </div>

          <button className="watchlist-button" onClick={toggleWatchlist}>
            {inWatchlist ? "❤️ In Watchlist" : "🤍 Add to Watchlist"}
          </button>

          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h3>📝 Write review</h3>

            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <button type="submit">Publish Review</button>
          </form>

          {movieReviews.length > 0 && (
            <div className="reviews-list">
              <h3>Reviews</h3>

              {movieReviews.map((review, index) => (
                <div className="review-card" key={index}>
                  {review.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}