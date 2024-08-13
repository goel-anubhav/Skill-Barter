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
import Dashboard from "./components/dashboard";
import FullProfileView from "./components/fullProfileView";
import LocationProfileView from "./components/locationProfileView";
import ViewProfile from "./shared/ViewProfile";
import LoginProtectedRoute from "./auth/loginProtectedRoute";
import NotFound from "./components/notFound";
import SentRequests from "./components/sentRequests";
import FriendRequests from "./shared/Request"; // Import FriendRequests component
import AlreadyLoggedIn from "./auth/alreadyLoggedIn";
import skillProfileView from "./components/skillProfileView";
import recentBarterReqProfile from "./components/recentBarterReqProfile";
import AboutUs from "./shared/aboutUs";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <AlreadyLoggedIn pageName="Login" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <AlreadyLoggedIn pageName="Signup" />
                ) : (
                  <SignupForm />
                )
              }
            />
            <Route
              path="/registration"
              element={
                isAuthenticated ? (
                  <AlreadyLoggedIn pageName="Registration" />
                ) : (
                  <Registration />
                )
              }
            />
            <Route path="/locations" element={<LocationFile />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route
              path="/confirm-registration"
              element={<ConfirmationPage />}
            />
            <Route
              path="/dashboard"
              element={<LoginProtectedRoute element={Dashboard} />}
            />
            <Route
              path="/location-profile-view"
              element={<LoginProtectedRoute element={LocationProfileView} />}
            />
              <Route
              path="/skill-profile-view"
              element={<LoginProtectedRoute element={skillProfileView} />}
            />
            <Route
              path="/full-profile-view"
              element={<LoginProtectedRoute element={FullProfileView} />}
            />
            <Route
              path="/recent-barter-profile-view"
              element={<LoginProtectedRoute element={recentBarterReqProfile} />}
            />
            <Route
              path="/view-profile"
              element={<LoginProtectedRoute element={ViewProfile} />}
            />
            <Route
              path="/sent-requests"
              element={<LoginProtectedRoute element={SentRequests} />}
            />
            <Route
              path="/friend-requests"
              element={<LoginProtectedRoute element={FriendRequests} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
