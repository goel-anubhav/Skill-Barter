import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../shared/Navbar";

function Login() {
  return (
    <>
      <CustomNavbar />
      <div
        style={{
          height: "calc(100vh - 210px)", // Adjust based on your navbar height, 56px is common for Bootstrap
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
          <form>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter a valid Email Address"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter a Strong Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">
              Login
            </button>
            <div className="mt-3 text-center">
              <span>Don't have an account? </span>
              <a href="/signup" className="text-primary">
                Signup
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
