import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CustomNavbar from "../shared/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // First, check if the user exists and is approved
      const usersResponse = await axios.get("http://localhost:8000/api/users/");
      const user = usersResponse.data.find((user) => user.email === email);

      if (!user) {
        setMessage("User does not exist. Please complete your registration.");
        return;
      }

      if (!user.is_approved) {
        setMessage(
          "Your account is not approved yet. Please wait for approval."
        );
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
      setMessage("Error during login");
      console.error(error.response ? error.response.data : error.message);
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
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter a valid Email Address"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
    </>
  );
}

export default Login;
