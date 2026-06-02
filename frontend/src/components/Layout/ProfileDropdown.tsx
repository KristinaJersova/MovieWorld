import { Link } from "react-router-dom";

export function ProfileDropdown() {
  return (
    <div className="profile-dropdown">
      <button className="profile-button">Demo User</button>

      <div className="dropdown-menu">
        <Link to="/profile">Profile</Link>
        <button onClick={() => localStorage.removeItem("accessToken")}>
          Logout
        </button>
      </div>
    </div>
  );
}