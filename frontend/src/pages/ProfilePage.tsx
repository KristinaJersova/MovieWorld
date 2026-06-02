type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export function ProfilePage() {
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <p>User not found</p>;
  }

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
          <strong>0</strong>
          <span>Watched</span>
        </div>

        <div>
          <strong>0</strong>
          <span>Reviews</span>
        </div>

        <div>
          <strong>0</strong>
          <span>Watchlist</span>
        </div>
      </div>
    </section>
  );
}   