import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("govng_token");
  const user = localStorage.getItem("govng_user");
  if (!token || !user) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
