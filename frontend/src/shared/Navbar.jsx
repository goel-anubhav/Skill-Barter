import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    <Navbar
      bg="white"
      expand="lg"
      className="shadow-sm"
      style={{ padding: "10px 20px" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="font-weight-bold">
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
              <Dropdown align="end">
                <Dropdown.Toggle
                  as={Nav.Link}
                  className="p-0"
                  style={{ border: "none", background: "none" }}
                >
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      transition: "transform 0.3s ease",
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
              <div className="d-flex flex-column flex-lg-row align-items-center mt-2 mt-lg-0">
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="p-0 mb-2 mb-lg-0 mr-lg-2"
                >
                  <Button
                    variant="outline-secondary"
                    className="w-100 w-lg-auto"
                    style={{
                      transition: "transform 0.3s ease",
                    }}
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
