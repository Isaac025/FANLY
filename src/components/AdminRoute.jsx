import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function AdminRoute({ children }) {
  const { user, isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
