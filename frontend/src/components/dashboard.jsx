import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";
import ForumCards from "./forumCards";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [showSkills, setShowSkills] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDesiredSkills, setSelectedDesiredSkills] = useState([]);
  const [forumPostsList, setForumPostsList] = useState([]);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const skillsRef = useRef(null);
  const locationsRef = useRef(null);
  const forumRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/")
      .then((response) => response.json())
      .then((data) => {
        const skills = new Set();
        const cities = new Set();
        const formattedData = data.map((user) => {
          const emailEncoded = user.email.replace("@", "%40");
          const profilePictureURL = `http://127.0.0.1:8000/api/users/profile-picture/${emailEncoded}/`;

          // Fetch the profile picture using the encoded email
          fetch(profilePictureURL)
            .then((response) => response.json())
            .then((profileData) => {
              const profilePicture = `http://127.0.0.1:8000${profileData.profile_picture}`;
              // Update the user's profile picture
              setForumPostsList((prevPosts) =>
                prevPosts.map((post) =>
                  post.id === user.id ? { ...post, img: profilePicture } : post
                )
              );
            })
            .catch((error) =>
              console.error("Error fetching profile picture:", error)
            );

          skills.add(user.skills);
          cities.add(user.city);
          return {
            id: user.id,
            name: user.full_name,
            location: `${user.city}, ${user.state}`,
            skills: user.skills ? user.skills.split(", ") : [],
            desiredSkills: user.desired_skills
              ? user.desired_skills.split(", ")
              : [],
            rating: "4.5", // Assuming a default rating as the API does not provide it
            img: "", // Placeholder until the image is fetched
            message: `Looking to exchange ${user.skills} skills for ${user.desired_skills} knowledge.`,
          };
        });
        setSkillsOptions([...skills]);
        setCitiesOptions([...cities]);
        setForumPostsList(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
      setForumPostsList([
        ...forumPostsList,
        {
          id: forumPostsList.length + 1,
          name: topic,
          location: "Unknown",
          skills: ["Skill1", "Skill2"],
          desiredSkills: selectedDesiredSkills,
          rating: "4.5",
          img: "https://via.placeholder.com/150",
          message,
        },
      ]);
      e.target.reset();
      setSelectedDesiredSkills([]);
    }
  };

  const handleSearchBySkill = () => {
    if (selectedSkill) {
      navigate("/profile-view", {
        state: { searchType: "skill", searchTerm: selectedSkill },
      });
    }
  };

  const handleSearchByLocation = () => {
    if (selectedLocation) {
      navigate("/profile-view", {
        state: { searchType: "location", searchTerm: selectedLocation },
      });
    }
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
                disabled={!selectedSkill}
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
                  {citiesOptions.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleSearchByLocation}
                disabled={!selectedLocation}
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      <ForumCards forumPosts={forumPostsList} />

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
        <div
          className="mt-5"
          style={{ maxHeight: "400px", overflowY: "scroll" }}
        >
          <h3>All Forum Posts</h3>
          {forumPostsList.length === 0 ? (
            <p>No posts yet. Be the first to post!</p>
          ) : (
            <>
              <ul className="list-group">
                {forumPostsList.slice(0, 5).map((post, index) => (
                  <li key={index} className="list-group-item">
                    <h5>{post.name}</h5>
                    <p>{post.message}</p>
                    <p>
                      <strong>Desired Skills:</strong>{" "}
                      {post.desiredSkills.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
              {forumPostsList.length > 5 && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setForumPostsList(forumPostsList.slice(5))}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
