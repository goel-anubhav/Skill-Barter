import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardComponent = ({ profile }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");
  const defaultImage = "https://via.placeholder.com/150"; // Placeholder image URL
  const baseURL = `${API_URL}`; // Base URL for your API

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const encodedEmail = encodeURIComponent(profile.email); // Encode the email to handle '@'
        const response = await axios.get(`${baseURL}/api/users/profile-picture/${encodedEmail}/`);
        const imageUrl = response.data.profile_picture
          ? `${baseURL}${response.data.profile_picture}`
          : defaultImage;
        setProfilePicture(imageUrl);
      } catch (error) {
        console.error("Error fetching profile picture", error);
        setProfilePicture(defaultImage);
      }
    };

    fetchProfilePicture();
  }, [profile.email]);

  // Ensure that profile.skills is treated as an array
  const skills = Array.isArray(profile.skills)
    ? profile.skills
    : typeof profile.skills === 'string'
      ? profile.skills.split(", ")
      : [];

  const desiredSkills = Array.isArray(profile.desired_skills)
    ? profile.desired_skills
    : typeof profile.desired_skills === 'string'
      ? profile.desired_skills.split(", ")
      : [];

  const handleViewProfile = () => {
    navigate("/full-profile-view", { state: { profile } });
  };

  return (
    <Card
      className="mx-auto"
      style={{
        width: "18rem",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Img
        variant="top"
        src={profilePicture || defaultImage}
        alt={profile.full_name}
        style={{ height: "150px", objectFit: "cover" }}
      />
      <Card.Body style={{ textAlign: "left" }}>
        <Card.Title
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {profile.full_name}
        </Card.Title>
        <Card.Text>
          <strong>Location:</strong> {profile.city}, {profile.state}
        </Card.Text>
        <Card.Text>
          <strong>Skills:</strong> {skills.join(", ")}
        </Card.Text>
        <Card.Text>
          <strong>Desired Skills:</strong> {desiredSkills.join(", ")}
        </Card.Text>
        <Card.Text>
          <strong>Qualification:</strong> {profile.qualification}
        </Card.Text>
        <Card.Text>
          <strong>Experience:</strong> {profile.year_of_experience} years
        </Card.Text>
        <Button
          variant="primary"
          onClick={handleViewProfile}
          style={{
            backgroundColor: "#6A38C2",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          View Profile
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
