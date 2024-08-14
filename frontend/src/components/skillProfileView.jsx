import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";
import CardComponent from "./cardComponent";

const SkillProfileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchType, searchTerm, profiles } = location.state || {};
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [filterOptions, setFilterOptions] = useState([]);
  const [showNoProfilesModal, setShowNoProfilesModal] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    filterProfiles(searchTerm, searchType);
  }, [searchType, searchTerm, profiles]);

  const filterProfiles = (term, type) => {
    let filtered;
    if (type === "skill") {
      filtered = profiles.filter((profile) =>
        Array.isArray(profile.skills)
          ? profile.skills.includes(term)
          : profile.skills.split(", ").includes(term)
      );
    } else {
      filtered = profiles.filter((profile) => profile.state === term);
    }
    setFilteredProfiles(filtered);
    if (filtered.length === 0) {
      setShowNoProfilesModal(true);
    } else {
      updateFilterOptions(filtered, type);
    }
  };

  const updateFilterOptions = (profiles, type) => {
    let options;
    if (type === "skill") {
      options = [...new Set(profiles.map((profile) => profile.state))];
    } else {
      options = [
        ...new Set(
          profiles.flatMap((profile) =>
            Array.isArray(profile.skills)
              ? profile.skills
              : profile.skills.split(", ")
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
          (profile) => profile.state === option && profile.skills.includes(searchTerm)
        )
      );
    } else {
      setFilteredProfiles(
        profiles.filter(
          (profile) =>
            (Array.isArray(profile.skills)
              ? profile.skills.includes(option)
              : profile.skills.split(", ").includes(option)) && profile.state === searchTerm
        )
      );
    }
  };

  const handleSearchAgain = () => {
    navigate("/dashboard");
  };

  const handleViewProfile = (profile) => {
    navigate("/full-profile-view", { state: { profile } });
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
              marginTop: "20px",
              fontFamily: "Arial, sans-serif",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#F83002")}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#6A38C2")}
          >
            Search Again
          </Button>
        </div>
      </Container>

      <Modal
        show={showNoProfilesModal}
        onHide={() => setShowNoProfilesModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>No Users Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>No users found with the selected skill. Be the first to sign up and barter your skills!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNoProfilesModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SkillProfileView;
