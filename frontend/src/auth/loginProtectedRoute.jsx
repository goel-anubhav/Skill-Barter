// src/auth/LoginProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

const LoginProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default LoginProtectedRoute;
