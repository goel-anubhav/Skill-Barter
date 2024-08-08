import React from "react";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ element: Component }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default AuthenticatedRoute;
