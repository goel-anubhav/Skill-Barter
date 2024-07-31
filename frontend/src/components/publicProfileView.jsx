import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";
import CardComponent from "./cardComponent";

const PublicProfileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchType, searchTerm } = location.state || {};
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filterOption, setFilterOption] = useState("");

  // Sample data, replace with actual data fetching logic
  const sampleProfiles = [
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
    // Simulate fetching data
    setProfiles(sampleProfiles);
    setFilteredProfiles(sampleProfiles);
  }, []);

  const handleFilter = (option) => {
    setFilterOption(option);
    if (searchType === "skill") {
      setFilteredProfiles(
        profiles.filter((profile) => profile.location === option)
      );
    } else {
      setFilteredProfiles(
        profiles.filter((profile) => profile.skills.includes(option))
      );
    }
  };

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
        <div className="d-flex justify-content-center mb-4">
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="filter-dropdown"
              style={{
                backgroundColor: "#6A38C2",
                border: "none",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "25px",
              }}
            >
              {searchType === "skill"
                ? "Filter by Location"
                : "Filter by Skill"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {(searchType === "skill"
                ? profiles.map((profile) => profile.location)
                : profiles.flatMap((profile) => profile.skills)
              )
                .filter((value, index, self) => self.indexOf(value) === index) // unique values
                .map((option, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleFilter(option)}
                  >
                    {option}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row>
          {filteredProfiles.map((profile) => (
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
              backgroundColor: "#6A38C2",
              borderColor: "#6A38C2",
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
