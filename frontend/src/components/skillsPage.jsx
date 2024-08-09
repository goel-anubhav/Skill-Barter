import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { skillsOptions } from "../auth/skills"; // Import as named export

const SkillsPage = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/");
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const springProps = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: { opacity: 0, transform: "scale(0.5)" },
    config: { tension: 200, friction: 20 },
  });

  const handleSkillClick = (skill) => {
    const skillProfiles = profiles.filter((profile) => {
      if (Array.isArray(profile.skills)) {
        return profile.skills.includes(skill);
      } else if (profile.skills) {
        return profile.skills.split(", ").includes(skill);
      }
      return false;
    });

    if (skillProfiles.length > 0) {
      navigate("/skill-profile-view", {
        state: { searchType: "skill", searchTerm: skill, profiles: skillProfiles },
      });
    } else {
      alert(`No users found with the skill: ${skill}`);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div
        className="container my-5"
        style={{
          backgroundColor: "#f8f9fa",
          color: "#343a40",
          padding: "20px",
        }}
      >
        <h1 className="text-center mb-4">Skills For Bartering</h1>
        <div className="row">
          {skillsOptions.map((skill, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <animated.div
                style={{
                  ...springProps,
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() => handleSkillClick(skill)}
              >
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#343a40",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {skill.charAt(0)}
                </div>
                <h3 style={{ color: "#343a40" }}>{skill}</h3>
                <p style={{ color: "#6c757d" }}>Learn more about {skill}</p>
              </animated.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillsPage;
