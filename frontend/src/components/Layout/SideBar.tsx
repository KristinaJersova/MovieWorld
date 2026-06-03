import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/">Popular</Link>
      <Link to="/?filter=new">New Releases</Link>
      <Link to="/?filter=top">Top Rated</Link>
      <Link to="/watchlist">Watchlist</Link>
      <Link to="/profile">My Profile</Link>
    </aside>
  );
}