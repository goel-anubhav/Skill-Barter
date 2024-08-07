import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import CustomNavbar from "../shared/Navbar";

const SentRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSentRequests = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await axios.get(
          `http://localhost:8000/api/friends/sent-requests/${user.email}/`
        );
        setSentRequests(response.data);
      } catch (error) {
        console.error("Error fetching sent requests", error);
      }
    };

    fetchSentRequests();
  }, []);

  if (sentRequests.length === 0) {
    return (
      <div>
        <CustomNavbar />
        <Container className="mt-5 d-flex flex-column align-items-center">
          <h2 className="mb-4">No Sent Requests</h2>
          <Button
            onClick={() => navigate("/dashboard")}
            style={{
              backgroundColor: "#6A38C2",
              border: "none",
              borderRadius: "20px",
              padding: "10px 20px",
              fontWeight: "bold",
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
        <h2 className="text-center mb-4">Sent Requests</h2>
        <div className="d-flex flex-column align-items-center">
          {sentRequests.map((request) => (
            <Card key={request.id} className="mb-3 w-75">
              <Card.Body>
                <Card.Title>{request.receiver_email}</Card.Title>
                <Card.Text>{request.message}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SentRequests;
