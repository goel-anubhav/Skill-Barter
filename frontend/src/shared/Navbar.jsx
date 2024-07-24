import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const CustomNavbar = () => {
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
            <Nav.Link as={Link} to="/Login">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
