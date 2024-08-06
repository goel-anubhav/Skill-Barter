import React from "react";
import { Card, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForumCards = ({ forumPosts = [] }) => {
  const navigate = useNavigate();

  const truncateStyle = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  const defaultImage = "https://via.placeholder.com/150"; // Placeholder image URL

  return (
    <div className="container mt-5">
      <h2
        className="text-center mb-4"
        style={{ color: "#6f42c1", fontWeight: "bold" }}
      >
        Recent Bartering Requests
      </h2>
      <Carousel
        indicators={false}
        style={{ maxWidth: "90%", margin: "auto" }}
        prevIcon={
          <span
            aria-hidden="true"
            className="carousel-control-prev-icon"
            style={{
              backgroundColor: "#6A38C2",
              borderRadius: "50%",
              padding: "10px",
            }}
          />
        }
        nextIcon={
          <span
            aria-hidden="true"
            className="carousel-control-next-icon"
            style={{
              backgroundColor: "#6A38C2",
              borderRadius: "50%",
              padding: "10px",
            }}
          />
        }
      >
        {forumPosts.map((post, index) => (
          <Carousel.Item key={index} interval={3000}>
            <Card
              className="mx-auto"
              style={{
                width: "18rem",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Img
                variant="top"
                src={post.img || defaultImage}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body style={{ textAlign: "left" }}>
                <Card.Title
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    ...truncateStyle,
                  }}
                >
                  {post.name}
                </Card.Title>
                <Card.Text style={truncateStyle}>
                  <strong>Location:</strong> {post.location}
                </Card.Text>
                <Card.Text style={truncateStyle}>
                  <strong>Skills:</strong> {post.skills.join(", ")}
                </Card.Text>
                <Card.Text style={truncateStyle}>
                  <strong>Desired Skills:</strong>{" "}
                  {post.desiredSkills.join(", ")}
                </Card.Text>
                <Card.Text style={truncateStyle}>
                  <strong>Rating:</strong> {post.rating}
                </Card.Text>
                <Card.Text
                  style={{
                    ...truncateStyle,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.message}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate("/full-profile-view", {
                      state: { profile: post },
                    })
                  }
                  style={{
                    backgroundColor: "#6A38C2",
                    border: "none",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                  }}
                >
                  View Profile
                </Button>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ForumCards;
