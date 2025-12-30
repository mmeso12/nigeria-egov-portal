import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const raw = localStorage.getItem("govng_user");
  const user = raw ? JSON.parse(raw) : null;

  const logout = () => {
    localStorage.removeItem("govng_user");
    localStorage.removeItem("govng_token");
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Go to homepage">
          <div className="brand-mark" aria-hidden="true">🇳🇬</div>
          <div className="brand-text">
            <div className="brand-title">Nigeria e-Government Portal</div>
            <div className="brand-subtitle">Apply • Track • Receive Updates</div>
          </div>
        </Link>

        <nav className="nav" aria-label="Primary navigation">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/apply" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Apply</NavLink>
          <NavLink to="/status" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Status</NavLink>
          <NavLink to="/feedback" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Feedback</NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin</NavLink>
          )}
        </nav>

        <div className="header-actions">
          {!user ? (
            <>
              <Link className="btn btn-outline btn-sm" to="/login">Login</Link>
              <Link className="btn btn-primary btn-sm" to="/signup">Sign up</Link>
            </>
          ) : (
            <div className="user-chip" title={user.email || "Signed in"}>
              <div className="user-avatar" aria-hidden="true">
                {user.role === "admin" ? "A" : (user.name?.[0] || "U")}
              </div>
              <div className="user-meta">
                <div className="user-name">{user.role === "admin" ? "Admin" : (user.name || "User")}</div>
                <button className="link-logout" onClick={logout}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="header-accent" aria-hidden="true">
        <div className="accent green" />
        <div className="accent white" />
        <div className="accent green" />
      </div>
    </header>
  );
}

export default Header;
