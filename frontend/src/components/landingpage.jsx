import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../shared/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { skillsOptions } from "../auth/skills"; // Import skillsOptions

function LandingPage() {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handlePrevClick = () => {
    setCurrentSkill(
      (prev) => (prev - 1 + skillsOptions.length) % skillsOptions.length
    );
  };

  const handleNextClick = () => {
    setCurrentSkill((prev) => (prev + 1) % skillsOptions.length);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  };

  const filteredSkills = skillsOptions.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CustomNavbar />
      <div className="container text-center my-5">
        <div
          className="badge bg-warning text-dark mb-2"
          style={{ fontSize: "0.9rem" }}
        >
          No. 1 Skill Swap Website
        </div>
        <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>Find & Swap</h1>
        <h2
          style={{ color: "#6f42c1", fontWeight: "bold", fontSize: "2.5rem" }}
        >
          Get Your Dream Skill
        </h2>
        <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Get Your Dream Skill By Bartering
        </p>
        <div
          ref={wrapperRef}
          className="input-group my-4 position-relative"
          style={{ maxWidth: "700px", margin: "auto" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Find Your Dream Skill"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              padding: "15px",
            }}
          />
          <button
            className="btn btn-primary d-flex align-items-center"
            type="button"
            style={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              padding: "0 15px",
              borderLeft: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon style={{ fontSize: "24px" }} />
          </button>
          {showSuggestions && searchTerm && (
            <div
              className="list-group position-absolute w-100"
              style={{
                top: "100%",
                zIndex: 1,
                maxHeight: "200px",
                overflowY: "auto",
                left: "0",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "0 0 10px 10px",
              }}
            >
              {filteredSkills.map((skill, index) => (
                <button
                  type="button"
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setSearchTerm(skill);
                    setShowSuggestions(false);
                  }}
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#e9ecef")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#f8f9fa")
                  }
                >
                  {skill}
                </button>
              ))}
            </div>
          )}
        </div>
        <div
          className="d-flex justify-content-center align-items-center mb-4"
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <button
            className="btn btn-outline-secondary mx-2"
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handlePrevClick}
          >
            <ArrowBackIcon />
          </button>
          <div className="mx-2 flex-grow-1 d-flex justify-content-center">
            <button
              className="btn btn-outline-secondary"
              style={{ borderRadius: "20px", padding: "10px 20px" }}
            >
              {skillsOptions[currentSkill]}
            </button>
          </div>
          <button
            className="btn btn-outline-secondary mx-2"
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleNextClick}
          >
            <ArrowForwardIcon />
          </button>
        </div>
        <h3 style={{ color: "#6f42c1", fontWeight: "bold" }}>
          Latest and Top Job Openings
        </h3>
      </div>
    </>
  );
}

export default LandingPage;
