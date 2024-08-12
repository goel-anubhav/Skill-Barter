// src/shared/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { FaBars, FaBell, FaEnvelopeOpenText, FaUserPlus } from "react-icons/fa";
import axios from "axios";

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
        setProfilePicture(`http://localhost:8000${parsedUser.profile_picture}`);
        fetchNotifications(parsedUser.id);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();

    // Re-check login status on page focus to handle logout from other tabs
    window.addEventListener("focus", checkLoginStatus);

    return () => {
      window.removeEventListener("focus", checkLoginStatus);
    };
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/friends/notifications/${userId}/`
      );
      setNotifications(response.data);
      setUnreadCount(response.data.filter((notif) => !notif.is_read).length);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const handleNotificationRead = async (notificationId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/friends/notifications/read/${notificationId}/`
      );

      if (response.data.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif.id === notificationId ? { ...notif, is_read: true } : notif
          )
        );
        setUnreadCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const handleSignOut = () => {
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Reset states
    setIsLoggedIn(false);
    setUser(null);

    // Redirect to the login page
    navigate("/login");

    // Optional: Force a re-render or reload the page to clear any cached states
    window.location.reload();
  };

  const handleEnquiry = () => {
    const subject = encodeURIComponent("Enquiry about SkillBarter");
    const body = encodeURIComponent(
      "Hello,\n\nI have some questions about the SkillBarter platform.\n\nBest regards,\n[Your Name]"
    );
    window.location.href = `mailto:skillbarter.in@gmail.com?subject=${subject}&body=${body}`;
  };

  const renderNotificationIcon = (type) => {
    switch (type) {
      case "friend_request":
        return <FaUserPlus className="text-primary" />;
      case "message":
        return <FaEnvelopeOpenText className="text-success" />;
      default:
        return <FaBell className="text-warning" />;
    }
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="shadow-sm"
      style={{ padding: "10px 20px" }}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="font-weight-bold"
          style={{ transition: "transform 0.3s ease" }}
        >
          Skill<span style={{ color: "#F83002" }}>Barter</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center text-center text-lg-left">
            <Nav.Link
              as={Link}
              to={isLoggedIn ? "/dashboard" : "/"}
              className="font-weight-bold"
            >
              {isLoggedIn ? "Dashboard" : "Home"}
            </Nav.Link>
            <Nav.Link as={Link} to="/skills" className="font-weight-bold">
              Skills
            </Nav.Link>
            <Nav.Link as={Link} to="/locations" className="font-weight-bold">
              Locations
            </Nav.Link>
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/about-us" className="font-weight-bold">
                About Us
              </Nav.Link>
            )}
            {isLoggedIn ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/sent-requests"
                  className="font-weight-bold"
                >
                  Sent Requests
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/friend-requests"
                  className="font-weight-bold"
                >
                  Friend Requests
                </Nav.Link>
                <Dropdown align="end" className="mr-lg-3 mb-2 mb-lg-0">
                  <Dropdown.Toggle
                    as={Button}
                    variant="link"
                    id="dropdown-notifications"
                    className="position-relative p-0"
                  >
                    <FaBell size={24} />
                    {unreadCount > 0 && (
                      <Badge
                        variant="danger"
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: "320px" }}>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <span className="font-weight-bold">Notifications</span>
                      <Button variant="link" size="sm" onClick={handleClearAll}>
                        Clear All
                      </Button>
                    </div>
                    <Dropdown.Divider />
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <Dropdown.Item
                          key={notification.id}
                          className="d-flex align-items-center p-2"
                          onClick={() =>
                            handleNotificationRead(notification.id)
                          }
                          style={{
                            backgroundColor: notification.is_read
                              ? "#f8f9fa"
                              : "#e9ecef",
                            borderRadius: "5px",
                            marginBottom: "5px",
                          }}
                        >
                          {renderNotificationIcon(notification.type)}
                          <div className="ml-2">
                            <span className="font-weight-bold">
                              {notification.message}
                            </span>
                            <small className="d-block text-muted">
                              {new Date(
                                notification.created_at
                              ).toLocaleString()}
                            </small>
                          </div>
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item>No bartering requests</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as={Nav.Link}
                    className="p-0"
                    style={{ border: "none", background: "none" }}
                  >
                    <img
                      src={profilePicture}
                      alt="Profile"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        transition: "transform 0.3s ease",
                      }}
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/40")
                      }
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/view-profile")}>
                      View Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut}>
                      Sign Out
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleEnquiry}>
                      Enquiry
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <div className="d-flex flex-column flex-lg-row align-items-center mt-2 mt-lg-0">
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="p-0 mb-2 mb-lg-0 mr-lg-2"
                >
                  <Button
                    variant="outline-secondary"
                    className="w-100 w-lg-auto"
                    style={{ transition: "transform 0.3s ease" }}
                  >
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="p-0">
                  <Button
                    className="w-100 w-lg-auto"
                    style={{
                      backgroundColor: "#6A38C2",
                      color: "white",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    Signup
                  </Button>
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
