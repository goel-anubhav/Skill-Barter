import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CustomNavbar from "../shared/Navbar";
import { Modal, Button, Spinner } from "react-bootstrap";

function SignupForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
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
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("full_name", formData.fullName);
    data.append("email", formData.email);
    data.append("phone_number", formData.phoneNumber);
    data.append("password", formData.password);
    if (selectedImage) {
      data.append("profile_picture", selectedImage);
    }

    // Log the FormData contents for debugging
    for (let [key, value] of data.entries()) {
      console.log(key, value);
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
      console.log("Signup response:", response.data);
      setMessage("Signup successful! Please enter the OTP sent to your email.");
      setShowOtpModal(true);
    } catch (error) {
      setMessage("Error during signup");
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleOtpVerification = async () => {
    setIsOtpLoading(true);
    const otpPayload = {
      email: formData.email,
      otp: otp,
    };

    console.log("OTP Payload:", otpPayload); // Log the OTP payload

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/verify-otp/",
        otpPayload
      );
      console.log("OTP verification response:", response.data);
      setMessage("OTP verified successfully!");
      setShowOtpModal(false);
      navigate("/registration");
    } catch (error) {
      setMessage("Error verifying OTP");
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
        className="container d-flex justify-content-center align-items-start vh-100 pt-2"
        style={{ marginTop: "70px" }}
      >
        <div className="card p-4 w-100" style={{ maxWidth: "600px" }}>
          <h3 className="text-center mb-4">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName" className="font-weight-bold">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                autoComplete="off"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="font-weight-bold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber" className="font-weight-bold">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                autoComplete="off"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="font-weight-bold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="off"
                value={formData.password}
                onChange={handleChange}
                required
              />
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
              Sign Up
            </button>
            {message && <p className="mt-3 text-center">{message}</p>}
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
    </>
  );
}

export default SignupForm;
