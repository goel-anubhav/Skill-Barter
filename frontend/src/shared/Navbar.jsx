import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in localStorage to manage authentication status
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="font-weight-bold">
          Skill<span style={{ color: "#F83002" }}>Barter</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto align-items-center">
            <Nav.Link as={Link} to="/" className="font-weight-bold">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/skills" className="font-weight-bold">
              Skills
            </Nav.Link>
            <Nav.Link as={Link} to="/locations" className="font-weight-bold">
              Locations
            </Nav.Link>
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle as={Nav.Link} className="p-0">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/update-profile")}>
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="p-0">
                  <Button
                    variant="outline-secondary"
                    className="mr-2"
                    style={{ marginRight: "10px" }}
                  >
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="p-0">
                  <Button
                    style={{ backgroundColor: "#6A38C2", color: "white" }}
                  >
                    Signup
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
