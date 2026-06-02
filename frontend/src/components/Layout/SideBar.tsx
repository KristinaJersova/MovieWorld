import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/">Popular</Link>
      <Link to="/">New Releases</Link>
      <Link to="/">Top Rated</Link>
      <Link to="/profile">My Profile</Link>
    </aside>
  );
}