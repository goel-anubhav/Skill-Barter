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
import { FaBars, FaBell } from "react-icons/fa";
import { notifications as sampleNotifications } from "./notificationSample";

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setIsLoggedIn(true);
      setUser(parsedUser);
      setProfilePicture(`http://localhost:8000${parsedUser.profile_picture}`);
      fetchNotifications();
    }
  }, []);

  const fetchNotifications = async () => {
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter((notif) => !notif.read).length);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleNotificationClick = async (notificationId) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter((notif) => !notif.read).length);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
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
            {isLoggedIn ? (
              <>
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
                  <Dropdown.Menu style={{ minWidth: "250px" }}>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <span>Notifications</span>
                      <Button variant="link" size="sm" onClick={handleClearAll}>
                        Clear All
                      </Button>
                    </div>
                    <Dropdown.Divider />
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <Dropdown.Item
                          key={notification.id}
                          onClick={() =>
                            handleNotificationClick(notification.id)
                          }
                        >
                          {notification.message}
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
                    <Dropdown.Item onClick={() => navigate("/update-profile")}>
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut}>
                      Sign Out
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
