import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CustomNavbar from "../shared/Navbar";
import { Modal, Button, Alert } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email) {
      errors.email = "Email is required.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // First, check if the user exists and is approved
      const usersResponse = await axios.get("http://localhost:8000/api/users/");
      const user = usersResponse.data.find((user) => user.email === email);

      if (!user) {
        setMessage("Please complete your registration.");
        setShowModal(true);
        return;
      }

      if (!user.is_approved) {
        setMessage(
          "Your account is not approved yet. Please wait for approval."
        );
        setShowModal(true);
        return;
      }

      // Proceed with login if the user exists and is approved
      const response = await axios.post(
        "http://localhost:8000/api/users/login/",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        // Save token and user info in localStorage or any state management library like Redux
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setMessage("Login successful!");
        navigate("/dashboard"); // Redirect to a dashboard or homepage after login
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        let errorMessages = "";
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            errorMessages += `${key}: ${errors[key]}\n`;
          }
        }
        setAlertMessage(errorMessages);
        setAlertVariant("danger");
        setShowAlert(true);
      } else {
        setAlertMessage("Error during login");
        setAlertVariant("danger");
        setShowAlert(true);
      }
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <CustomNavbar className="fixed-top" />
      <div
        style={{
          height: "calc(100vh - 230px)", // Adjust based on your navbar height, 56px is common for Bootstrap
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          paddingTop: "56px", // Adjust based on your navbar height
          boxSizing: "border-box",
        }}
      >
        <div className="card p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <h2 className="mb-4">Login</h2>
          {showAlert && (
            <Alert
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${
                  fieldErrors.email ? "is-invalid" : ""
                }`}
                id="email"
                placeholder="Enter a valid Email Address"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {fieldErrors.email && (
                <div className="invalid-feedback">{fieldErrors.email}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  fieldErrors.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Enter a Strong Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {fieldErrors.password && (
                <div className="invalid-feedback">{fieldErrors.password}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">
              Login
            </button>
            {message && <p className="mt-3 text-center">{message}</p>}
            <div className="mt-3 text-center">
              <span>Don't have an account? </span>
              <a href="/signup" className="text-primary">
                Signup
              </a>
            </div>
          </form>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate("/registration")}>
            Go to Registration
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
