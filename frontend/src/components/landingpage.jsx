import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../shared/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { skillsOptions } from "../auth/skills";
import ForumCards from "./forumCards";
import axios from "axios";

function LandingPage() {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [forumPosts, setForumPosts] = useState([]);
  const wrapperRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/`);
        const formattedData = await Promise.all(
          response.data.map(async (user) => {
            const emailEncoded = user.email.replace("@", "%40");
            let profilePicture = "https://via.placeholder.com/150";

            try {
              const profilePicResponse = await axios.get(
                `${API_URL}/api/users/profile-picture/${emailEncoded}/`
              );
              const profilePicturePath =
                profilePicResponse.data.profile_picture;
              profilePicture = `${API_URL}${profilePicturePath}`;
            } catch (error) {
              console.error(
                `Error fetching profile picture for ${user.email}`,
                error
              );
            }

            return {
              id: user.id,
              name: user.full_name,
              location: `${user.city}, ${user.state}`,
              skills: user.skills ? user.skills.split(", ") : [],
              desiredSkills: user.desired_skills
                ? user.desired_skills.split(", ")
                : [],
              rating: "4.5", // Assuming a default rating as the API does not provide it
              img: profilePicture,
              message: `Looking to exchange ${user.skills} skills for ${user.desired_skills} knowledge.`,
            };
          })
        );
        setForumPosts(formattedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

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

        <ForumCards forumPosts={forumPosts} />
      </div>
    </>
  );
}

export default LandingPage;
