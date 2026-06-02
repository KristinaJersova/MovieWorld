import { Link } from "react-router-dom";

export function Navbar() {
  const token = localStorage.getItem("accessToken");

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        MovieWorld
      </Link>

      <nav className="nav-links">
        <Link to="/">Films</Link>
        <Link to="/profile">Profile</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={() => localStorage.removeItem("accessToken")}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}