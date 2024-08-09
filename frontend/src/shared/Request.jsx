import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Alert,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import CustomNavbar from "../shared/Navbar";
import axios from "axios";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/friends/list-requests/${user.email}/`
          );
          // Sort the requests by id in descending order (assuming higher IDs are newer)
          const sortedRequests = response.data.sort((a, b) => b.id - a.id);
          setRequests(sortedRequests);
        } catch (error) {
          console.error("Error fetching requests", error);
        }
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = async (requestId, receiverEmail) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/friends/respond-request/${requestId}/`,
        {
          status: "accepted",
          receiver: receiverEmail,
        }
      );

      if (response.data.success) {
        setAlertMessage("Friend request accepted!");
        setAlertVariant("success");
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId
              ? { ...request, status: "accepted" }
              : request
          )
        );
      } else {
        setAlertMessage(
          response.data.error || "Check network connectivity or try again later"
        );
        setAlertVariant("danger");
      }
    } catch (error) {
      setAlertMessage(
        error.response?.data?.error ||
          "Check network connectivity or try again later"
      );
      setAlertVariant("danger");
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const handleShowPhone = (request) => {
    setSelectedRequest(request);
    setShowPhoneModal(true);
  };

  const handleGiveRating = (request) => {
    setSelectedRequest(request);
    setShowRatingModal(true);
  };

  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/friends/give-rating/${selectedRequest.sender_email}/`,
        { rating }
      );
      if (response.data.success) {
        alert("Rating submitted successfully!");
      }
      setShowRatingModal(false);
    } catch (error) {
      console.error("Error submitting rating", error);
      alert("Error submitting rating. Please try again.");
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <h2
          className="text-center mb-5"
          style={{ fontWeight: "bold", color: "#343a40" }}
        >
          Friend Requests
        </h2>
        {alertMessage && (
          <Alert
            variant={alertVariant}
            onClose={() => setAlertMessage("")}
            dismissible
            className="text-center"
            style={{
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {alertMessage}
          </Alert>
        )}
        {requests.length === 0 ? (
          <p
            className="text-center"
            style={{ color: "#6A38C2", fontWeight: "bold" }}
          >
            No friend requests found.
          </p>
        ) : (
          <div className="d-flex flex-column align-items-center">
            {requests.map((request) => (
              <Card
                key={request.id}
                className="mb-4 shadow-lg border-0 w-75"
                style={{ borderRadius: "15px" }}
              >
                <Card.Body>
                  <Card.Title
                    className="mb-3"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.25rem",
                      color: "#6A38C2",
                    }}
                  >
                    {request.sender_email}
                  </Card.Title>
                  <Card.Text
                    className="mb-4"
                    style={{ color: "#555", fontSize: "1rem" }}
                  >
                    {request.message}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge
                      pill
                      bg={request.status === "accepted" ? "success" : "warning"}
                      style={{ fontSize: "0.9rem", padding: "10px 20px" }}
                    >
                      {request.status === "accepted" ? "Accepted" : "Pending"}
                    </Badge>
                    {request.status !== "accepted" ? (
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleAcceptRequest(
                            request.id,
                            request.receiver_email
                          )
                        }
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
                        Accept Request
                      </Button>
                    ) : (
                      <div className="d-flex justify-content-end">
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
                            marginRight: "10px",
                          }}
                        >
                          Show Phone Number
                        </Button>
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
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
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
              The phone number of {selectedRequest.sender_email} is:{" "}
              <strong>{selectedRequest.sender_phone}</strong>
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
    </>
  );
};

export default FriendRequests;
