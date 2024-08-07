import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-center text-white"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Container className="pt-4">
        <section className="mb-4">
          <Button
            variant="link"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaFacebookF />
          </Button>

          <Button
            variant="link"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaTwitter />
          </Button>

          <Button
            variant="link"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaInstagram />
          </Button>

          <Button
            variant="link"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaLinkedin />
          </Button>
        </section>
      </Container>

      <div
        className="text-center text-dark p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2024 Copyright:
        <a
          className="text-dark ms-2"
          href="/"
          style={{ textDecoration: "none" }}
        >
          Skill Barter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
