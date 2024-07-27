import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import CustomNavbar from "../shared/Navbar";

const FullProfileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = location.state || {};

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendRequest = () => {
    // Logic to handle sending the barter request with the custom message
    setShowModal(false);
  };

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <Card
          className="mx-auto"
          style={{
            maxWidth: "600px",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            animation: "fadeIn 0.5s",
          }}
        >
          <Card.Img
            variant="top"
            src={profile.img}
            style={{ height: "300px", objectFit: "cover" }}
          />
          <Card.Body style={{ textAlign: "left" }}>
            <Card.Title style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {profile.name}
            </Card.Title>
            <Card.Text>
              <strong>Location:</strong> {profile.location}
            </Card.Text>
            <Card.Text>
              <strong>Skills:</strong> {profile.skills.join(", ")}
            </Card.Text>
            <Card.Text>
              <strong>Desired Skills:</strong>{" "}
              {profile.desiredSkills.join(", ")}
            </Card.Text>
            <Card.Text>
              <strong>Rating:</strong> {profile.rating}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => setShowModal(true)}
              style={{
                backgroundColor: "#6A38C2",
                border: "none",
                borderRadius: "20px",
                padding: "10px 20px",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              Send Barter Request
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/dashboard")}
              style={{
                borderRadius: "20px",
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              Go Back to Search
            </Button>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Barter Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your custom message"
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleSendRequest}
              style={{
                backgroundColor: "#6A38C2",
                border: "none",
                borderRadius: "20px",
                padding: "10px 20px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Send Request
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FullProfileView;
