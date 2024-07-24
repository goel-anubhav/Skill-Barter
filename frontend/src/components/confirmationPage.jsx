import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const ConfirmationPage = () => {
  const [counter, setCounter] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      navigate("/login");
    }

    return () => clearInterval(timer);
  }, [counter, navigate]);

  return (
    <>
      <CustomNavbar />
      <div
        className="d-flex flex-column justify-content-center align-items-center vh-150"
        style={{
          backgroundColor: "#f8f9fa",
          color: "#343a40",
          padding: "20px",
        }}
      >
        <div
          className="text-center p-5"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
          }}
        >
          <h1 style={{ color: "#F83002", marginBottom: "20px" }}>
            Confirmation
          </h1>
          <p style={{ color: "#000", fontSize: "18px", marginBottom: "10px" }}>
            Your registration is under review. Please log in again and wait for
            the admin to accept your registration.
          </p>
          <p style={{ color: "#000", fontSize: "16px", marginBottom: "20px" }}>
            You will be redirected to the login page in{" "}
            <span style={{ color: "#F83002", fontWeight: "bold" }}>
              {counter}
            </span>{" "}
            seconds.
          </p>
          <a
            href="/login"
            className="btn btn-primary"
            style={{
              backgroundColor: "#F83002",
              borderColor: "#F83002",
              color: "#fff",
              borderRadius: "4px",
              padding: "10px 20px",
              textDecoration: "none",
            }}
          >
            Go to Login
          </a>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
