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
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
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

  const handlePasswordResetRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/password-reset/",
        {
          email: resetEmail,
        }
      );
      setAlertVariant("success");
      setAlertMessage(response.data.message);
      setShowAlert(true);
      setShowResetModal(false);
      setShowOtpModal(true); // Show OTP modal to enter OTP and new password
    } catch (error) {
      if (error.response && error.response.data) {
        setAlertMessage(error.response.data.error);
      } else {
        setAlertMessage("Error during password reset request");
      }
      setAlertVariant("danger");
      setShowAlert(true);
      setShowResetModal(false);
      console.error(
        "Password reset error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePasswordResetConfirm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/password-reset-confirm/",
        {
          email: resetEmail,
          otp: otp,
          new_password: newPassword,
        }
      );
      setAlertVariant("success");
      setAlertMessage(response.data.message);
      setShowAlert(true);
      setShowOtpModal(false);
    } catch (error) {
      if (error.response && error.response.data) {
        setAlertMessage(error.response.data.error);
      } else {
        setAlertMessage("Error during password reset confirmation");
      }
      setAlertVariant("danger");
      setShowAlert(true);
      console.error(
        "Password reset confirmation error:",
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
            <div className="mt-3 text-center">
              <a
                href="#"
                className="text-primary"
                onClick={() => setShowResetModal(true)}
              >
                Forgot Password?
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

      {/* Password Reset Request Modal */}
      <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="resetEmail" className="form-label">
              Enter your email to receive a password reset link:
            </label>
            <input
              type="email"
              className="form-control"
              id="resetEmail"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePasswordResetRequest}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* OTP and New Password Modal */}
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label htmlFor="otp" className="form-label">
              OTP
            </label>
            <input
              type="text"
              className="form-control"
              id="otp"
              placeholder="Enter the OTP you received"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePasswordResetConfirm}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
