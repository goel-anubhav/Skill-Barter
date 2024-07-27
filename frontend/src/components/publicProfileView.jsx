import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";
import CardComponent from "./cardComponent";

const PublicProfileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchType, searchTerm } = location.state || {};

  // Sample data, replace with actual data fetching logic
  const profiles = [
    {
      id: 1,
      name: "John Doe",
      skills: ["Web Development", "Graphic Design"],
      desiredSkills: ["Project Management", "SEO"],
      location: "New York",
      rating: "4.5",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      skills: ["Data Science", "Machine Learning"],
      desiredSkills: ["Cloud Computing", "Blockchain"],
      location: "San Francisco",
      rating: "4.8",
      img: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchAgain = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <h2 className="text-center mb-4">
          Public Profiles -{" "}
          {searchType === "skill"
            ? `Skill: ${searchTerm}`
            : `Location: ${searchTerm}`}
        </h2>
        <Row>
          {profiles.map((profile) => (
            <Col md={6} lg={4} key={profile.id} className="mb-4">
              <CardComponent profile={profile} />
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button
            variant="primary"
            onClick={handleSearchAgain}
            style={{
              width: "200px",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "25px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#5f32ad")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#6A38C2")
            }
          >
            Search Again
          </Button>
        </div>
      </Container>
    </>
  );
};

export default PublicProfileView;
