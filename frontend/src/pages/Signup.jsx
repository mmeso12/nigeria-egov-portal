import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { register } from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      setDone(true);

      // send user to login after short moment
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupPage">
      <div className="container">
        <div className="signupCard card">
          <h1>Create an account</h1>
          <p className="sub">Register as a citizen to access online services.</p>

          {done && (
            <div className="successBox">
              ✅ Account created! Redirecting to login...
            </div>
          )}

          <form className="signupForm" onSubmit={onSubmit}>
            <div className="formGroup">
              <label className="label">Full Name</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Doe"
                required
              />
            </div>

            <div className="formGroup">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., john@example.com"
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
                placeholder="Create a password"
                required
                minLength={6}
              />
              <div className="helper">Minimum 6 characters.</div>
            </div>

            {error && <div className="errorBox">{error}</div>}

            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Sign up"}
            </button>
          </form>

          <p className="below">
            Already have an account?{" "}
            <Link to="/login" className="link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
