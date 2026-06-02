import { Link, useNavigate } from "react-router-dom";

type User = {
  username: string;
};

export function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        MovieWorld
      </Link>

      <nav className="nav-links">
        <Link to="/">Films</Link>

        {token ? (
          <div className="profile-dropdown">
            <button className="profile-button">
              {user?.username ?? "Profile"}
            </button>

            <div className="dropdown-menu">
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}