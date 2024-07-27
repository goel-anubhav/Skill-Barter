import React from "react";
import { Card } from "react-bootstrap";

const CardComponent = ({ profile }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={profile.img} alt={profile.name} />
      <Card.Body>
        <Card.Title>{profile.name}</Card.Title>
        <Card.Text>
          <strong>Location:</strong> {profile.location}
        </Card.Text>
        <Card.Text>
          <strong>Skills:</strong> {profile.skills.join(", ")}
        </Card.Text>
        <Card.Text>
          <strong>Desired Skills:</strong> {profile.desiredSkills.join(", ")}
        </Card.Text>
        <Card.Text>
          <strong>Rating:</strong> {profile.rating}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
