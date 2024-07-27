import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { statesOfIndia } from "../auth/states";
import { skillsOptions } from "../auth/skills";

const Dashboard = () => {
  const [showSkills, setShowSkills] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDesiredSkills, setSelectedDesiredSkills] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const skillsRef = useRef(null);
  const locationsRef = useRef(null);
  const forumRef = useRef(null);
  const navigate = useNavigate();

  const toggleSkills = () => {
    setShowSkills(!showSkills);
    setShowLocations(false);
    if (!showSkills) {
      setTimeout(() => {
        skillsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const toggleLocations = () => {
    setShowLocations(!showLocations);
    setShowSkills(false);
    if (!showLocations) {
      setTimeout(() => {
        locationsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleDesiredSkillsChange = (e) => {
    const { options } = e.target;
    const selectedValues = [];
    for (const option of options) {
      if (option.selected) {
        selectedValues.push(option.value);
      }
    }
    setSelectedDesiredSkills(selectedValues);
  };

  const handleForumSubmit = (e) => {
    e.preventDefault();
    const topic = e.target.forumTopic.value;
    const message = e.target.forumMessage.value;

    if (topic && message) {
      setForumPosts([
        ...forumPosts,
        { topic, message, desiredSkills: selectedDesiredSkills },
      ]);
      e.target.reset();
      setSelectedDesiredSkills([]);
    }
  };

  const handleSearchBySkill = () => {
    navigate("/profile-view", {
      state: { searchType: "skill", searchTerm: selectedSkill },
    });
  };

  const handleSearchByLocation = () => {
    navigate("/profile-view", {
      state: { searchType: "location", searchTerm: selectedLocation },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomNavbar />
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          color: "black",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            marginBottom: 0,
          }}
        >
          Welcome to
        </h1>
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            marginTop: 0,
          }}
        >
          <span style={{ color: "black" }}>Skill</span>
          <span style={{ color: "#F83002" }}>Barter</span>
          <span style={{ color: "black" }}>.in</span>
        </h1>
        <p
          className="lead"
          style={{
            fontFamily: "Arial, sans-serif",
            marginTop: 10,
          }}
        >
          <span style={{ color: "#F83002" }}>India</span> ka apna skill
          barteting <span style={{ color: "#F83002" }}>platform</span>
        </p>
        <div className="mt-4 d-flex justify-content-center">
          <button
            className="btn mx-2"
            style={{
              backgroundColor: "#6A38C2",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "25px",
              transition: "background-color 0.3s ease",
            }}
            onClick={toggleSkills}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#F83002")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#6A38C2")
            }
          >
            Search by Skill
          </button>
          <button
            className="btn mx-2"
            style={{
              backgroundColor: "#6A38C2",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "25px",
              transition: "background-color 0.3s ease",
            }}
            onClick={toggleLocations}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#F83002")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#6A38C2")
            }
          >
            Search by Location
          </button>
        </div>
      </div>

      <div className="container mt-5">
        {showSkills && (
          <div className="mt-4" ref={skillsRef}>
            <h2>Search by Skills</h2>
            <p>Find barter opportunities based on your skills.</p>
            <form>
              <div className="form-group">
                <label htmlFor="skillInput">Select Skill</label>
                <select
                  className="form-control"
                  id="skillInput"
                  value={selectedSkill}
                  onChange={handleSkillChange}
                >
                  <option value="" disabled>
                    Select a skill
                  </option>
                  {skillsOptions.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleSearchBySkill}
              >
                Search
              </button>
            </form>
          </div>
        )}
        {showLocations && (
          <div className="mt-4" ref={locationsRef}>
            <h2>Search by Location</h2>
            <p>Find barter opportunities based on your location.</p>
            <form>
              <div className="form-group">
                <label htmlFor="locationInput">Select Location</label>
                <select
                  className="form-control"
                  id="locationInput"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {statesOfIndia.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleSearchByLocation}
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="container mt-5" ref={forumRef}>
        <h2>Forum</h2>
        <p>Discuss and share your bartering experiences with others.</p>
        <form onSubmit={handleForumSubmit}>
          <div className="form-group">
            <label htmlFor="forumTopic">Topic</label>
            <input
              type="text"
              className="form-control"
              id="forumTopic"
              placeholder="Enter the topic"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="desiredSkillsInput">Select Desired Skills</label>
            <select
              className="form-control"
              id="desiredSkillsInput"
              multiple
              value={selectedDesiredSkills}
              onChange={handleDesiredSkillsChange}
            >
              {skillsOptions.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="forumMessage">Message</label>
            <textarea
              className="form-control"
              id="forumMessage"
              rows="3"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Post
          </button>
        </form>
        <div className="mt-5">
          <h3>All Forum Posts</h3>
          {forumPosts.length === 0 ? (
            <p>No posts yet. Be the first to post!</p>
          ) : (
            <ul className="list-group">
              {forumPosts.map((post, index) => (
                <li key={index} className="list-group-item">
                  <h5>{post.topic}</h5>
                  <p>{post.message}</p>
                  <p>
                    <strong>Desired Skills:</strong>{" "}
                    {post.desiredSkills.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
