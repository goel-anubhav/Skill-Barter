import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import CustomNavbar from "../shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { statesOfIndia } from "../auth/states";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LocationFile = () => {
  const [locations, setLocations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;


  const springProps = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: { opacity: 0, transform: "scale(0.5)" },
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/`);
        const data = response.data;

        const uniqueLocations = new Set(data.map((user) => user.state));
        setLocations([...uniqueLocations]);
      } catch (error) {
        console.error("Error fetching locations", error);
      }
    };

    fetchLocations();
  }, []);

  const handleStateClick = async (state) => {
    if (locations.includes(state)) {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/?state=${encodeURIComponent(state)}`
        );
        const data = response.data.map((user) => ({
          ...user,
          skills: user.skills ? user.skills.split(", ") : [],
          desired_skills: user.desired_skills ? user.desired_skills.split(", ") : [],
          profile_picture: `${API_URL}/api/users/profile-picture/${encodeURIComponent(user.email)}`,
        }));
        if (data.length > 0) {
          navigate("/location-profile-view", {
            state: { searchType: "location", searchTerm: state, profiles: data },
          });
          setShowAlert(false);
        } else {
          setAlertMessage(
            `No users found in ${state}. Be the first to sign up and barter your skills!`
          );
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error fetching users by state", error);
        setAlertMessage(
          "An error occurred while fetching user profiles. Please try again later."
        );
        setShowAlert(true);
      }
    } else {
      setAlertMessage(
        `No users found in ${state}. Be the first to sign up and barter your skills!`
      );
      setShowAlert(true);
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
        <h1 className="text-center mb-4">Locations For Skill Bartering</h1>
        <div className="row">
          {statesOfIndia.map((state, index) => (
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
                onClick={() => handleStateClick(state)}
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
                  {state.charAt(0)}
                </div>
                <h3 style={{ color: "#343a40" }}>{state}</h3>
                <p style={{ color: "#6c757d" }}>Learn more about</p>
              </animated.div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-5">
        {showAlert && (
          <Modal show={showAlert} onHide={() => setShowAlert(false)}>
            <Modal.Header closeButton>
              <Modal.Title>No Users Found</Modal.Title>
            </Modal.Header>
            <Modal.Body>{alertMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAlert(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );
};

export default LocationFile;
