import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import CustomNavbar from "../shared/Navbar";

const SentRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSentRequestsAndUsers = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await axios.get(
          `${API_URL}/api/friends/sent-requests/${user.email}/`
        );
        setSentRequests(response.data);

        const usersResponse = await axios.get(`${API_URL}/api/users/`);
        const usersData = usersResponse.data.reduce((acc, user) => {
          acc[user.email] = {
            full_name: user.full_name,
            phone_number: user.phone_number,
          };
          return acc;
        }, {});
        setUsersMap(usersData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchSentRequestsAndUsers();
  }, []);

  const handleShowPhone = (request) => {
    setSelectedRequest(request);
    setShowPhoneModal(true);
  };

  const handleGiveRating = (request) => {
    setSelectedRequest(request);
    setShowRatingModal(true);
  };

  const handleRatingSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.post(`${API_URL}/api/friends/rate-user/`, {
        rater_email: user.email,
        ratee_email: selectedRequest.receiver_email,
        score: rating,
        comment: comment,
      });
      if (response.data.success) {
        alert("Rating submitted successfully!");

        // Update the state to mark this request as rated
        setSentRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === selectedRequest.id
              ? { ...request, rated: true }
              : request
          )
        );
      }
      setShowRatingModal(false);
    } catch (error) {
      console.error("Error submitting rating", error);
      alert("Error submitting rating. Please try again.");
    }
  };

  if (sentRequests.length === 0) {
    return (
      <div>
        <CustomNavbar />
        <Container className="mt-5 d-flex flex-column align-items-center text-center">
          <h2 className="mb-4" style={{ color: "#343a40", fontWeight: "bold" }}>
            No Sent Requests
          </h2>
          <Button
            onClick={() => navigate("/dashboard")}
            style={{
              backgroundColor: "#6A38C2",
              border: "none",
              borderRadius: "50px",
              padding: "10px 40px",
              fontWeight: "bold",
              color: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#F83002")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#6A38C2")
            }
          >
            Search for Bartering
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <Container className="mt-5">
        <h2
          className="text-center mb-5"
          style={{ fontWeight: "bold", color: "#343a40" }}
        >
          Sent Requests
        </h2>
        <Row className="justify-content-center">
          {sentRequests.map((request) => (
            <Col md={8} lg={6} key={request.id} className="mb-4">
              <Card
                className="shadow-lg border-0"
                style={{ borderRadius: "15px" }}
              >
                <Card.Body>
                  <Card.Title
                    className="mb-3"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      color: "#6A38C2",
                    }}
                  >
                    {usersMap[request.receiver_email]?.full_name ||
                      request.receiver_email}
                  </Card.Title>
                  <Card.Text
                    className="mb-4"
                    style={{ color: "#555", fontSize: "1rem" }}
                  >
                    {request.message}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="info"
                      onClick={() => handleShowPhone(request)}
                      style={{
                        backgroundColor: "#6A38C2",
                        border: "none",
                        borderRadius: "30px",
                        padding: "10px 20px",
                        fontWeight: "bold",
                        color: "white",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Show Phone Number
                    </Button>
                    {!request.rated && (
                      <Button
                        variant="primary"
                        onClick={() => handleGiveRating(request)}
                        style={{
                          backgroundColor: "#F83002",
                          border: "none",
                          borderRadius: "30px",
                          padding: "10px 20px",
                          fontWeight: "bold",
                          color: "white",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        Give Rating
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Phone Number Modal */}
      <Modal
        show={showPhoneModal}
        onHide={() => setShowPhoneModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <p>
              The phone number of{" "}
              {usersMap[selectedRequest.receiver_email]?.full_name ||
                selectedRequest.receiver_email}{" "}
              is:{" "}
              <strong>
                {usersMap[selectedRequest.receiver_email]?.phone_number}
              </strong>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPhoneModal(false)}
            style={{
              backgroundColor: "#6A38C2",
              border: "none",
              borderRadius: "50px",
              color: "white",
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Rating Modal */}
      <Modal
        show={showRatingModal}
        onHide={() => setShowRatingModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Give Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rating">
              <Form.Label style={{ fontWeight: "bold", color: "#6A38C2" }}>
                Rating
              </Form.Label>
              <Form.Control
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Group>
            <Form.Group controlId="comment" className="mt-3">
              <Form.Label style={{ fontWeight: "bold", color: "#6A38C2" }}>
                Comment
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRatingModal(false)}
            style={{
              backgroundColor: "#6A38C2",
              border: "none",
              borderRadius: "50px",
              color: "white",
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleRatingSubmit}
            style={{
              backgroundColor: "#F83002",
              border: "none",
              borderRadius: "50px",
              color: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            Submit Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SentRequests;
