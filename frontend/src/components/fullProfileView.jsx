import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import CustomNavbar from "../shared/Navbar";
import axios from "axios";

const FullProfileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = location.state || {};

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Uncomment for the login validation
  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   if (!userData) {
  //     navigate("/login");
  //   } else {
  //     setUser(JSON.parse(userData)); // Assuming you have a user state to set
  //   }
  // }, [navigate]);

  useEffect(() => {
    // Check if there is a pending request for the user
    const checkPendingRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/check-pending-request?profile_id=${profile.id}`
        );
        if (response.data.hasPendingRequest) {
          setHasPendingRequest(true);
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
      }
    };
    if (profile) {
      checkPendingRequest();
    }
  }, [profile]);

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/send-request`,
        {
          profile_id: profile.id,
          message: message,
        }
      );

      if (response.data.success) {
        setAlertMessage("Message sent successfully!");
        setAlertVariant("success");
      } else {
        setAlertMessage("Check network connectivity or try again later");
        setAlertVariant("danger");
      }

      setShowModal(false);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage("Check network connectivity or try again later");
      setAlertVariant("danger");
      setShowModal(false);
      setShowAlert(true);
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const handleAcceptRequest = () => {
    setShowContactModal(true);
  };

  const handleContactChoice = async (choice) => {
    setShowContactModal(false);

    if (choice === "yes") {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/accept-request`,
          {
            profile_id: profile.id,
          }
        );

        if (response.data.success) {
          setAlertMessage("Contact details shared successfully!");
          setAlertVariant("success");
        } else {
          setAlertMessage("Check network connectivity or try again later");
          setAlertVariant("danger");
        }
      } catch (error) {
        setAlertMessage("Check network connectivity or try again later");
        setAlertVariant("danger");
        console.error(error.response ? error.response.data : error.message);
      }
    } else if (choice === "no") {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/delete-request`,
          {
            profile_id: profile.id,
          }
        );

        if (response.data.success) {
          setAlertMessage("Request has been deleted.");
          setAlertVariant("success");
          setHasPendingRequest(false);
        } else {
          setAlertMessage("Check network connectivity or try again later");
          setAlertVariant("danger");
        }
      } catch (error) {
        setAlertMessage("Check network connectivity or try again later");
        setAlertVariant("danger");
        console.error(error.response ? error.response.data : error.message);
      }
    }

    setShowAlert(true);
  };

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5 mb-5">
        {profile ? (
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
              {hasPendingRequest ? (
                <Button
                  variant="primary"
                  onClick={handleAcceptRequest}
                  style={{
                    backgroundColor: "#6A38C2",
                    border: "none",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  Accept Request
                </Button>
              ) : (
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
              )}
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
        ) : (
          <div className="text-center mt-5">
            <h3>Profile not found</h3>
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
          </div>
        )}
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

      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {alertVariant === "success" ? "Success" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{alertMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAlert(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showContactModal} onHide={() => setShowContactModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Accept Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to share your contact details with the user?</p>
          <div className="d-flex justify-content-around">
            <Button
              variant="success"
              onClick={() => handleContactChoice("yes")}
            >
              Yes
            </Button>
            <Button variant="danger" onClick={() => handleContactChoice("no")}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FullProfileView;
