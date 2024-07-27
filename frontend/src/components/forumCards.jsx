// ForumCards.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ForumCards = ({ forumPosts }) => {
  const navigate = useNavigate();

  const handleCardClick = (post) => {
    navigate("/profile-view", {
      state: { searchType: "user", searchTerm: post.name },
    });
  };

  return (
    <Container
      className="mt-5"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <h2 className="text-center mb-4">Recent Bartering Requests</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "scroll-left 15s linear infinite",
          }}
        >
          {forumPosts.map((post, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(post)}
              style={{
                display: "inline-block",
                marginRight: "10px",
                width: "300px",
                cursor: "pointer",
              }}
            >
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/150"
                alt={post.name}
              />
              <Card.Body>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {post.location}
                </Card.Text>
                <Card.Text>
                  <strong>Skills:</strong> {post.skills.join(", ")}
                </Card.Text>
                <Card.Text>
                  <strong>Desired Skills:</strong>{" "}
                  {post.desiredSkills.join(", ")}
                </Card.Text>
                <Card.Text>
                  <strong>Rating:</strong> {post.rating}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ForumCards;
