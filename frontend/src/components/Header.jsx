import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

function Header() {
  return (
    <header>
      <div className="container">
        <h1>Nigeria e-Gov Portal</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/apply">Apply</Link> |{" "}
          <Link to="/status">Status</Link> |{" "}
          <Link to="/feedback">Feedback</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
