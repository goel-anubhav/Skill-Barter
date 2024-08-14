import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";
import CardComponent from "./cardComponent";

const LocationProfileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchType, searchTerm, profiles = [] } = location.state || {};  // Default profiles to an empty array if undefined
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (profiles.length > 0) {  // Check if profiles are not empty
      filterProfiles(searchTerm, searchType);
    }
  }, [searchType, searchTerm, profiles]);

  const filterProfiles = (term, type) => {
    let filtered;
    if (type === "skill") {
      filtered = profiles.filter((profile) =>
        Array.isArray(profile.skills)
          ? profile.skills.includes(term)
          : profile.skills?.split(", ").includes(term)
      );
    } else {
      filtered = profiles.filter((profile) => profile.state === term);
    }
    setFilteredProfiles(filtered);
    updateFilterOptions(filtered, type);
  };

  const updateFilterOptions = (filteredProfiles, type) => {
    let options;
    if (type === "skill") {
      options = [...new Set(filteredProfiles.map((profile) => profile.state))];
    } else {
      options = [
        ...new Set(
          filteredProfiles.flatMap((profile) =>
            Array.isArray(profile.skills)
              ? profile.skills
              : profile.skills?.split(", ")
          )
        ),
      ];
    }
    setFilterOptions(options);
  };

  const handleFilter = (option) => {
    if (searchType === "skill") {
      setFilteredProfiles(
        profiles.filter(
          (profile) =>
            profile.state === option &&
            (Array.isArray(profile.skills)
              ? profile.skills.includes(searchTerm)
              : profile.skills?.split(", ").includes(searchTerm))
        )
      );
    } else {
      setFilteredProfiles(
        profiles.filter(
          (profile) =>
            (Array.isArray(profile.skills)
              ? profile.skills.includes(option)
              : profile.skills?.split(", ").includes(option)) &&
            profile.state === searchTerm
        )
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
        <h2
          className="text-center mb-4"
          style={{ fontFamily: "Arial, sans-serif", color: "#343a40" }}
        >
          Public Profiles -{" "}
          {searchType === "skill"
            ? `Skill: ${searchTerm}`
            : `Location: ${searchTerm}`}
        </h2>
        {filterOptions.length > 0 && (
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
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {searchType === "skill"
                  ? "Filter by Location"
                  : "Filter by Skill"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {filterOptions.map((option, index) => (
                  <Dropdown.Item key={index} onClick={() => handleFilter(option)}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        <Row>
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <Col md={6} lg={4} key={profile.id} className="mb-4">
                <CardComponent profile={profile} />
              </Col>
            ))
          ) : (
            <p className="text-center">No profiles found.</p>
          )}
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
              marginTop: "20px",
              fontFamily: "Arial, sans-serif",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#F83002")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#6A38C2")}
          >
            Search Again
          </Button>
        </div>
      </Container>
    </>
  );
};

export default LocationProfileView;
