export function ProfilePage() {
  return (
    <section>
      <h1>Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">U</div>

        <div>
          <h2>Demo User</h2>
          <p>MovieWorld member</p>
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