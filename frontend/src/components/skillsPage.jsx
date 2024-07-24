import React from "react";
import { useSpring, animated } from "react-spring";
import CustomNavbar from "../shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { skillsOptions } from "../auth/skills"; // Import as named export

const SkillsPage = () => {
  const springProps = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: { opacity: 0, transform: "scale(0.5)" },
    config: { tension: 200, friction: 20 },
  });

  const handleSkillClick = (skill) => {
    const searchQuery = encodeURIComponent(skill);
    window.open(
      `https://www.google.com/search?q=about%20${searchQuery}`,
      "_blank"
    );
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
                <p style={{ color: "#6c757d" }}>Learn more about </p>
              </animated.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillsPage;
