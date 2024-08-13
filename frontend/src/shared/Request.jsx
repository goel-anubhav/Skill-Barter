import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Alert,
  Badge,
  Modal,
  Form,
  Row,
  Col,
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
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/friends/list-requests/${user.email}/`
          );
          const sortedRequests = response.data.sort((a, b) => b.id - a.id);
          setRequests(sortedRequests);

          const emails = sortedRequests.map((req) => req.sender_email);
          const usersResponse = await axios.get(
            `http://localhost:8000/api/users/`
          );
          const users = usersResponse.data;

          const detailsMap = {};
          emails.forEach((email) => {
            const user = users.find((u) => u.email === email);
            if (user) {
              detailsMap[email] = {
                full_name: user.full_name,
                phone_number: user.phone_number,
              };
            }
          });
          setUserDetails(detailsMap);
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
          style={{
            fontWeight: "bold",
            color: "#343a40",
            fontSize: "calc(1.5rem + 1vw)",
          }}
        >
          Friend Requests
        </h2>
        {alertMessage && (
          <Alert
            variant={alertVariant}
            onClose={() => setAlertMessage("")}
            dismissible
            className="text-center mx-auto"
            style={{
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              maxWidth: "90%",
            }}
          >
            {alertMessage}
          </Alert>
        )}
        {requests.length === 0 ? (
          <p
            className="text-center"
            style={{
              color: "#6A38C2",
              fontWeight: "bold",
              fontSize: "calc(1rem + 0.5vw)",
            }}
          >
            No friend requests found.
          </p>
        ) : (
          <Row className="justify-content-center">
            {requests.map((request) => (
              <Col xs={12} md={10} lg={8} key={request.id} className="mb-4">
                <Card
                  className="shadow-lg border-0"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Card.Title
                      className="mb-3"
                      style={{
                        fontWeight: "bold",
                        fontSize: "calc(1.25rem + 0.3vw)",
                        color: "#6A38C2",
                      }}
                    >
                      {userDetails[request.sender_email]?.full_name ||
                        request.sender_email}
                    </Card.Title>
                    <Card.Text
                      className="mb-4"
                      style={{
                        color: "#555",
                        fontSize: "calc(0.9rem + 0.2vw)",
                      }}
                    >
                      {request.message}
                    </Card.Text>
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                      <Badge
                        pill
                        bg={
                          request.status === "accepted" ? "success" : "warning"
                        }
                        style={{
                          fontSize: "calc(0.8rem + 0.2vw)",
                          padding: "10px 20px",
                          marginBottom: "1rem",
                          marginRight: "0",
                        }}
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
                          className="mb-2 mb-sm-0"
                          style={{
                            backgroundColor: "#F83002",
                            border: "none",
                            borderRadius: "30px",
                            padding: "10px 20px",
                            fontWeight: "bold",
                            color: "white",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            fontSize: "calc(0.9rem + 0.2vw)",
                          }}
                        >
                          Accept Request
                        </Button>
                      ) : (
                        <div className="d-flex flex-column flex-sm-row justify-content-end">
                          <Button
                            variant="info"
                            onClick={() => handleShowPhone(request)}
                            className="mb-2 mb-sm-0"
                            style={{
                              backgroundColor: "#6A38C2",
                              border: "none",
                              borderRadius: "30px",
                              padding: "10px 20px",
                              fontWeight: "bold",
                              color: "white",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              fontSize: "calc(0.9rem + 0.2vw)",
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
                              fontSize: "calc(0.9rem + 0.2vw)",
                            }}
                          >
                            Give Rating
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Phone Number Modal */}
      <Modal
        show={showPhoneModal}
        onHide={() => setShowPhoneModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "calc(1.2rem + 0.2vw)" }}>
            Phone Number
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <p style={{ fontSize: "calc(1rem + 0.2vw)" }}>
              The phone number of{" "}
              {userDetails[selectedRequest.sender_email]?.full_name ||
                selectedRequest.sender_email}{" "}
              is:{" "}
              <strong>
                {userDetails[selectedRequest.sender_email]?.phone_number}
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
              fontSize: "calc(0.9rem + 0.2vw)",
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
          <Modal.Title style={{ fontSize: "calc(1.2rem + 0.2vw)" }}>
            Give Rating
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rating">
              <Form.Label
                style={{
                  fontWeight: "bold",
                  color: "#6A38C2",
                  fontSize: "calc(1rem + 0.2vw)",
                }}
              >
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
                  fontSize: "calc(1rem + 0.2vw)",
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
              fontSize: "calc(0.9rem + 0.2vw)",
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
              fontSize: "calc(0.9rem + 0.2vw)",
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