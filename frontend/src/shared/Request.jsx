import React, { useState, useEffect } from "react";
import { Container, Card, Button, Alert } from "react-bootstrap";
import CustomNavbar from "../shared/Navbar";
import axios from "axios";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect(() => {
    const fetchRequests = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/friends/list-requests/${user.email}/`
          );
          setRequests(response.data);
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
          prevRequests.filter((request) => request.id !== requestId)
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

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <h2 className="text-center mb-4">Friend Requests</h2>
        {alertMessage && (
          <Alert
            variant={alertVariant}
            onClose={() => setAlertMessage("")}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
        {requests.length === 0 ? (
          <p className="text-center">No friend requests found.</p>
        ) : (
          <div className="d-flex flex-column align-items-center">
            {requests.map((request) => (
              <Card key={request.id} className="mb-3 w-75">
                <Card.Body>
                  <Card.Title>{request.sender_email}</Card.Title>
                  <Card.Text>{request.message}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleAcceptRequest(request.id, request.receiver_email)
                    }
                  >
                    Accept Request
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default FriendRequests;
