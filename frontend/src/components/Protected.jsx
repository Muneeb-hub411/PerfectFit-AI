import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }
  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default Protected;
