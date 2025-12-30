import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { login, saveSession } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("user"); // "user" | "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password); // backend decides role

      // ✅ enforce chosen mode
      if (mode === "admin" && data.user.role !== "admin") {
        throw new Error("This account is not an admin. Switch to User login.");
      }
      if (mode === "user" && data.user.role === "admin") {
        throw new Error("This is an admin account. Switch to Admin login.");
      }

      saveSession(data.token, data.user);

      // ✅ redirect based on role
      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/apply");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <div className="container">
        <div className="loginCard card">
          <h1>Sign in</h1>
          <p className="sub">Choose login type and continue.</p>

          {/* ✅ Tabs */}
          <div className="modeTabs">
            <button
              type="button"
              className={mode === "user" ? "tab active" : "tab"}
              onClick={() => setMode("user")}
            >
              Citizen (User)
            </button>
            <button
              type="button"
              className={mode === "admin" ? "tab active" : "tab"}
              onClick={() => setMode("admin")}
            >
              Administrator
            </button>
          </div>

          <form className="loginForm" onSubmit={onSubmit}>
            <div className="formGroup">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="formGroup">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error">{error}</div>}

            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="below">
            Don’t have an account?{" "}
            <Link to="/signup" className="link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
