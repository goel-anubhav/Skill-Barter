import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../shared/Navbar";

const publicProfileView = () => {
  // Sample data, replace with actual data fetching logic
  const profiles = [
    {
      id: 1,
      name: "John Doe",
      skills: ["Web Development", "Graphic Design"],
      location: "New York",
      experience: "5 years",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      skills: ["Data Science", "Machine Learning"],
      location: "San Francisco",
      experience: "3 years",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <h2 className="text-center mb-4">Public Profiles</h2>
        <Row>
          {profiles.map((profile) => (
            <Col md={6} lg={4} key={profile.id} className="mb-4">
              <Card
                className="h-100 shadow-lg"
                style={{ borderRadius: "15px", overflow: "hidden" }}
              >
                <Card.Img
                  variant="top"
                  src={profile.img}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      fontWeight: "bold",
                      color: "#6A38C2",
                    }}
                  >
                    {profile.name}
                  </Card.Title>
                  <Card.Text>
                    <strong>Skills:</strong> {profile.skills.join(", ")}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong> {profile.location}
                  </Card.Text>
                  <Card.Text>
                    <strong>Experience:</strong> {profile.experience}
                  </Card.Text>
                  <Button
                    variant="outline-secondary"
                    className="w-100"
                    style={{
                      borderRadius: "25px",
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
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default publicProfileView;
