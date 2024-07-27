import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <>
      <CustomNavbar />
      <div className="container text-center mt-5">
        <h1 className="display-1">404</h1>
        <p className="lead">Page Not Found</p>
        <p className="lead">Redirecting to home in {countdown} seconds...</p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
