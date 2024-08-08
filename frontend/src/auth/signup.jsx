import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CustomNavbar from "../shared/Navbar";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";

function SignupForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const validateForm = () => {
    const { full_name, email, phone_number, password } = formData;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^\d{10}$/;

    let errors = {};

    if (!full_name) errors.full_name = "Full name is required.";
    if (!email) errors.email = "Email is required.";
    if (!phone_number) errors.phone_number = "Phone number is required.";
    if (!password) errors.password = "Password is required.";

    if (phone_number && !phoneRegex.test(phone_number)) {
      errors.phone_number = "Phone number must be exactly 10 digits.";
    }

    if (
      password &&
      !passwordRegex.test(password)
    ) {
      errors.password =
        "Password must contain at least one capital letter, one number, one special character, and be at least 8 characters long.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSignUpLoading(true);

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("email", formData.email);
    data.append("phone_number", formData.phone_number);
    data.append("password", formData.password);
    if (selectedImage) {
      data.append("profile_picture", selectedImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/signup/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Signup successful! Please enter the OTP sent to your email.");
      setShowOtpModal(true);
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        let errorMessages = "";
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            errorMessages += `${key}: ${errors[key]}\n`;
          }
        }
        setErrorDetails(errorMessages);
        setErrorModal(true);
      } else {
        setAlertMessage("Error during signup");
        setAlertVariant("danger");
        setShowAlert(true);
      }
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setIsOtpLoading(true);
    const otpPayload = {
      email: formData.email,
      otp: otp,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/verify-otp/",
        otpPayload
      );
      setMessage("OTP verified successfully!");
      setShowOtpModal(false);
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(formData));
      navigate("/registration");
    } catch (error) {
      setAlertMessage("Error verifying OTP");
      setAlertVariant("danger");
      setShowAlert(true);
      console.error(
        "OTP Verification Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsOtpLoading(false);
    }
  };

  return (
    <>
      <CustomNavbar className="fixed-top" />
      <div
        className="container d-flex justify-content-center align-items-start pt-4"
        style={{ marginTop: "70px", minHeight: "100vh" }}
      >
        <div
          className="card p-4 w-100"
          style={{ maxWidth: "600px", marginBottom: "50px" }}
        >
          <h3 className="text-center mb-4">Sign Up</h3>
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
            <div className="form-group">
              <label htmlFor="full_name" className="font-weight-bold">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  fieldErrors.full_name ? "is-invalid" : ""
                }`}
                id="full_name"
                name="full_name"
                placeholder="Enter your full name"
                autoComplete="off"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
              {fieldErrors.full_name && (
                <div className="invalid-feedback">{fieldErrors.full_name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="font-weight-bold">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${
                  fieldErrors.email ? "is-invalid" : ""
                }`}
                id="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {fieldErrors.email && (
                <div className="invalid-feedback">{fieldErrors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone_number" className="font-weight-bold">
                Phone Number
              </label>
              <input
                type="text"
                className={`form-control ${
                  fieldErrors.phone_number ? "is-invalid" : ""
                }`}
                id="phone_number"
                name="phone_number"
                placeholder="Enter your phone number"
                autoComplete="off"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              {fieldErrors.phone_number && (
                <div className="invalid-feedback">
                  {fieldErrors.phone_number}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="font-weight-bold">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  fieldErrors.password ? "is-invalid" : ""
                }`}
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="off"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {fieldErrors.password && (
                <div className="invalid-feedback">{fieldErrors.password}</div>
              )}
              <small className="form-text text-muted">
                Password must contain at least one capital letter, one number,
                one special character, and be at least 8 characters long.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="profilePicture" className="font-weight-bold">
                Profile Picture
              </label>
              <div className="d-block">
                <input
                  type="file"
                  className="form-control-file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="profilePicture"
                  className="btn btn-success mt-2"
                  style={{ cursor: "pointer" }}
                >
                  Choose File
                </label>
              </div>
              {selectedImage && (
                <div className="mt-2 text-center">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      maxHeight: "200px",
                      marginTop: "10px",
                    }}
                  />
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {isSignUpLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ml-2">Signing Up...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            {message && (
              <p className="mt-3 text-center text-danger">{message}</p>
            )}
            <p className="mt-3 text-center">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>

      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="otp" className="font-weight-bold">
              Enter OTP
            </label>
            <input
              type="text"
              className="form-control"
              id="otp"
              name="otp"
              placeholder="Enter the OTP"
              autoComplete="off"
              value={otp}
              onChange={handleOtpChange}
              required
            />
          </div>
          <div className="text-center">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className={isOtpLoading ? "" : "d-none"}
            />
            <span className={isOtpLoading ? "ml-2" : "d-none"}>
              Sending OTP...
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOtpVerification}>
            {isOtpLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={errorModal} onHide={() => setErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Signup Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{errorDetails}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupForm;
