import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ profile }) => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(profile.profile_picture);
        setProfilePicture(response.data.profile_picture);
      } catch (error) {
        console.error("Error fetching profile picture", error);
      }
    };

    fetchProfilePicture();
  }, [profile.profile_picture]);

  const skills = Array.isArray(profile.skills) ? profile.skills : [profile.skills];
  const desiredSkills = Array.isArray(profile.desired_skills) ? profile.desired_skills : [profile.desired_skills];

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
        src={profilePicture ? profilePicture : "default-image.jpg"}
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
          onClick={() => navigate("/full-profile-view", { state: { profile } })}
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
