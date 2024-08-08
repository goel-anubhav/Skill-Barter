import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const CardComponent = ({ profile }) => {
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
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={profilePicture ? profilePicture : "default-image.jpg"}
        alt={profile.full_name}
      />
      <Card.Body>
        <Card.Title>{profile.full_name}</Card.Title>
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
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
