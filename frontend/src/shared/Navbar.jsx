import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/update-profile");
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand className="font-weight-bold ml-2">
          <h1 style={{ fontSize: "24px", margin: 0 }}>
            Skill<span style={{ color: "#F83002" }}>Barter</span>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              className="font-weight-bold"
              style={{
                color: "black",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#6A38C2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "black";
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/skills"
              className="font-weight-bold"
              style={{
                color: "black",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#6A38C2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "black";
              }}
            >
              Skills
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/locations"
              className="font-weight-bold"
              style={{
                color: "black",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#6A38C2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "black";
              }}
            >
              Locations
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Dropdown alignRight>
                  <Dropdown.Toggle
                    as={Button}
                    variant="link"
                    id="dropdown-basic"
                    className="p-0"
                  >
                    <img
                      src={user?.profilePicture || "default-profile.png"}
                      alt="Profile"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleProfileClick}>
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut}>
                      Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button
                    variant="outline-secondary"
                    className="mr-2"
                    style={{
                      borderRadius: "4px",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#6A38C2";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "black";
                    }}
                  >
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button
                    style={{
                      backgroundColor: "#6A38C2",
                      color: "white",
                      borderRadius: "4px",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#5f32ad")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#6A38C2")
                    }
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
