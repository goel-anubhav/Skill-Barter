// src/auth/AlreadyLoggedIn.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AlreadyLoggedIn = ({ pageName }) => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2>You are already logged in</h2>
      <p>{pageName} is not accessible as you are already logged in.</p>
      <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
    </div>
  );
};

export default AlreadyLoggedIn;
