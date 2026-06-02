import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  function logout() {
    localStorage.removeItem("accessToken");
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
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
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