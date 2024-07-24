import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomNavbar from "./shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import LandingPage from "./components/landingpage";
import Login from "./auth/login";
import SignupForm from "./auth/signup";
import Registration from "./auth/registration";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Uncomment the following lines as you create these components */}
          {/* <Route path="/skills" element={<Skills />} />
          <Route path="/browse" element={<Browse />} />
          */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          {/* <Route path="/registration" component={Registration} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
