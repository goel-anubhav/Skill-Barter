import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomNavbar from "./shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import LandingPage from "./components/landingpage";
import Login from "./auth/login";
import SignupForm from "./auth/signup";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <CustomNavbar /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Uncomment the following lines as you create these components */}
          {/* <Route path="/skills" element={<Skills />} />
          <Route path="/browse" element={<Browse />} />
          */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
