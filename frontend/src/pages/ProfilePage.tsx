import { useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

type Review = {
  movieId: number;
  text: string;
};

export function ProfilePage() {
  const [ratingsCount, setRatingsCount] = useState(0);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  function loadStats() {
    const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

    setRatingsCount(Object.keys(ratings).length);
    setWatchlistCount(watchlist.length);
    setReviews(savedReviews);
  }

  useEffect(() => {
    loadStats();

    window.addEventListener("focus", loadStats);

    return () => {
      window.removeEventListener("focus", loadStats);
    };
  }, []);

  if (!user) return <p>User not found</p>;

  return (
    <section>
      <h1>Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          {user.username[0].toUpperCase()}
        </div>

        <div>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div>
          <strong>{ratingsCount}</strong>
          <span>Rated</span>
        </div>

        <div>
          <strong>{reviews.length}</strong>
          <span>Reviews</span>
        </div>

        <div>
          <strong>{watchlistCount}</strong>
          <span>Watchlist</span>
        </div>
      </div>

      <div className="profile-section">
        <h2>Recent Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div className="review-card" key={index}>
              {review.text}
            </div>
          ))
        )}
      </div>
    </section>
  );
}