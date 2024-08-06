import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./shared/footer";
import LandingPage from "./components/landingpage";
import SkillsPage from "./components/skillsPage";
import LocationFile from "./components/locationFile";
import Login from "./auth/login";
import SignupForm from "./auth/signup";
import Registration from "./auth/registration";
import ConfirmationPage from "./components/confirmationPage";
import Example from "./components/dashboard";
import Updateprofile from "./components/updateprofile";
import FullProfileView from "./components/fullProfileView";
import PublicProfileView from "./components/publicProfileView";
import ViewProfile from "./shared/ViewProfile";
import ProtectedRoute from "./auth/protectedRoute";
import NotFound from "./components/notFound";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/locations" element={<LocationFile />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route
              path="/confirm-registration"
              element={<ConfirmationPage />}
            />
            <Route path="/dashboard" element={<Example />} />
            <Route path="/update-profile" element={<Updateprofile />} />
            <Route path="/profile-view" element={<PublicProfileView />} />
            <Route path="/full-profile-view" element={<FullProfileView />} />
            <Route path="/view-profile" element={<ViewProfile />} />{" "}
            {/* Add this route */}
            <Route path="*" element={<NotFound />} />{" "}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
