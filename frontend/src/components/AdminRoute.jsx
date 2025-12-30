import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("govng_token");
  const raw = localStorage.getItem("govng_user");
  const user = raw ? JSON.parse(raw) : null;

  if (!token || !user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}

export default AdminRoute;
