import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../shared/Navbar";

function SignupForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
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
          <h3 className="text-center">Sign Up</h3>
          <form>
            <div className="form-group">
              <label htmlFor="fullName" className="font-weight-bold">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter your full name"
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
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            </div>
            {otpSent && (
              <div className="form-group">
                <label htmlFor="otp" className="font-weight-bold">
                  OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  placeholder="Enter the OTP"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="phoneNumber" className="font-weight-bold">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter your phone number"
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
                placeholder="Enter your password"
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
                <div className="mt-2">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
            <p className="mt-3 text-center">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupForm;