// src/components/AboutUs.jsx
import React from "react";
import CustomNavbar from "../shared/Navbar";

const AboutUs = () => {
  // Using a sample image for the founder
  const founderImage =
    "https://via.placeholder.com/150"; // Replace with an actual image link if available

  return (
    <>
      <CustomNavbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "calc(100vh - 150px)",
          paddingTop: "80px",
          paddingBottom: "50px",
          padding: "15px",
          background: "linear-gradient(120deg, #fdfbfb, #ebedee)",
          textAlign: "center",
        }}
      >
        <div
          className="card p-4 shadow-lg animate__animated animate__fadeInUp"
          style={{
            maxWidth: "800px",
            width: "100%",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h2
            className="mb-4"
            style={{
              color: "#6A38C2",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            About Us
          </h2>
          <p
            style={{
              color: "#343a40",
              lineHeight: "1.6",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Welcome to <strong>SkillBarter</strong>! We believe in the power of
            shared knowledge and the value of skills. Our platform connects
            individuals with unique skills and talents, enabling them to barter
            and exchange their expertise in a collaborative environment. Whether
            you're a professional looking to expand your network, or someone
            eager to learn a new skill, SkillBarter is here to help you make
            meaningful connections.
          </p>

          <h4
            className="mt-4"
            style={{
              color: "#F83002",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.5rem",
            }}
          >
            Meet Our Founder
          </h4>
          <div className="d-flex flex-column align-items-center mt-4">
            <img
              src={founderImage}
              alt="Founder"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "10px",
                marginBottom: "20px",
                border: "5px solid #6A38C2", // Frame color
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "#343a40",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Keshav Rawal
              </p>
              <p
                style={{
                  color: "#343a40",
                  lineHeight: "1.6",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                Keshav is the visionary behind SkillBarter. With a passion for
                learning and a deep belief in the power of community, Keshav
                founded SkillBarter to create a platform where skills could be
                exchanged freely, empowering individuals to achieve their
                personal and professional goals.
              </p>
            </div>
          </div>

          <h4
            className="mt-4"
            style={{
              color: "#F83002",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.5rem",
            }}
          >
            Our Mission
          </h4>
          <p
            style={{
              color: "#343a40",
              lineHeight: "1.6",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Our mission is to create a community where skills and knowledge are
            exchanged freely, fostering growth, innovation, and mutual support.
            We aim to bridge the gap between skill seekers and providers, making
            it easier for everyone to access the resources they need to succeed.
          </p>

          <h4
            className="mt-4"
            style={{
              color: "#F83002",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.5rem",
            }}
          >
            Why SkillBarter?
          </h4>
          <ul
            className="text-left"
            style={{
              color: "#343a40",
              lineHeight: "1.6",
              paddingLeft: "20px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            <li>
              <strong>Collaborative Learning:</strong> We provide a space where
              you can share your knowledge, learn from others, and grow your
              skillset.
            </li>
            <li>
              <strong>Diverse Community:</strong> Our platform is home to a
              diverse community of professionals from various industries and
              backgrounds.
            </li>
            <li>
              <strong>Flexible Exchange:</strong> With SkillBarter, you can
              barter your skills, offering what you know in exchange for
              learning something new.
            </li>
          </ul>

          <h4
            className="mt-4"
            style={{
              color: "#F83002",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.5rem",
            }}
          >
            Join Us Today
          </h4>
          <p
            style={{
              color: "#343a40",
              lineHeight: "1.6",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Be a part of our growing community and start bartering your skills
            today. Whether you’re looking to teach, learn, or simply connect
            with like-minded individuals, SkillBarter has something for
            everyone.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
