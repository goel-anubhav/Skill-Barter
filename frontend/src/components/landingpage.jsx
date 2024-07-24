import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const skills = [
  "Frontend Developer",
  "Backend Developer",
  "Data Engineer",
  "DevOps Engineer",
  "Machine Learning Engineer",
];

function LandingPage() {
  const [currentSkill, setCurrentSkill] = useState(0);

  const handlePrevClick = () => {
    setCurrentSkill((prev) => (prev - 1 + skills.length) % skills.length);
  };

  const handleNextClick = () => {
    setCurrentSkill((prev) => (prev + 1) % skills.length);
  };

  return (
    <div className="container text-center my-5">
      <div
        className="badge bg-warning text-dark mb-2"
        style={{ fontSize: "0.9rem" }}
      >
        No. 1 Skill Swap Website
      </div>
      <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>Find & Swap</h1>
      <h2 style={{ color: "#6f42c1", fontWeight: "bold", fontSize: "2.5rem" }}>
        Get Your Dream Skill
      </h2>
      <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        Get Your Dream Skill By Bartering
      </p>
      <div
        className="input-group my-4"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Find Your Dream Skill"
          style={{
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            padding: "15px",
          }}
        />
        <button
          className="btn btn-primary"
          type="button"
          style={{
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            padding: "15px",
          }}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="btn btn-outline-secondary mx-2"
          style={{ borderRadius: "50%" }}
          onClick={handlePrevClick}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div>
          <button
            className="btn btn-outline-secondary mx-2"
            style={{ borderRadius: "20px" }}
          >
            {skills[currentSkill]}
          </button>
        </div>
        <button
          className="btn btn-outline-secondary mx-2"
          style={{ borderRadius: "50%" }}
          onClick={handleNextClick}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
      <h3 style={{ color: "#6f42c1", fontWeight: "bold" }}>
        Latest and Top Job Openings
      </h3>
    </div>
  );
}

export default LandingPage;
