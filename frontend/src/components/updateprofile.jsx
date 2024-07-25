import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { statesOfIndia } from "../auth/states";
import { qualifications } from "../auth/qualifications";
import CustomNavbar from "../shared/Navbar";
import { skillsOptions } from "../auth/skills";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const years = Array.from({ length: 31 }, (_, i) => ({
  value: i,
  label: `${i} years`,
}));

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: null,
    skills: [],
    desiredSkills: [],
    year_of_experience: null,
    qualification: null,
  });
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the server or local storage
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          setFormData({
            fullName: userData.full_name || "",
            email: userData.email || "",
            phoneNumber: userData.phone_number || "",
            city: userData.city || "",
            state: userData.state
              ? { value: userData.state, label: userData.state }
              : null,
            skills: userData.skills
              ? userData.skills
                  .split(", ")
                  .map((skill) => ({ value: skill, label: skill }))
              : [],
            desiredSkills: userData.desired_skills
              ? userData.desired_skills
                  .split(", ")
                  .map((skill) => ({ value: skill, label: skill }))
              : [],
            year_of_experience: userData.year_of_experience
              ? {
                  value: userData.year_of_experience,
                  label: `${userData.year_of_experience} years`,
                }
              : null,
            qualification: userData.qualification
              ? { value: userData.qualification, label: userData.qualification }
              : null,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile1(file);
    }
  };

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile2(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("full_name", formData.fullName);
    data.append("email", formData.email);
    data.append("phone_number", formData.phoneNumber);
    data.append("city", formData.city);
    data.append("state", formData.state ? formData.state.value : "");
    data.append(
      "year_of_experience",
      formData.year_of_experience ? formData.year_of_experience.value : 0
    );
    data.append(
      "qualification",
      formData.qualification ? formData.qualification.value : ""
    );
    data.append(
      "skills",
      formData.skills.map((skill) => skill.value).join(", ")
    );
    data.append(
      "desired_skills",
      formData.desiredSkills.map((skill) => skill.value).join(", ")
    );
    if (selectedFile1) {
      data.append("certification_1", selectedFile1);
    }
    if (selectedFile2) {
      data.append("certification_2", selectedFile2);
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/api/users/update-profile/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      setMessage("Error updating profile");
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg p-4 mb-5 bg-white rounded">
              <h3 className="text-center mb-4">Update Profile</h3>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="Full Name"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Email"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleChange("phoneNumber", e.target.value)
                      }
                      placeholder="Phone Number"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="City"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <Select
                      id="state"
                      name="state"
                      options={statesOfIndia.map((state) => ({
                        value: state,
                        label: state,
                      }))}
                      value={formData.state}
                      onChange={(selectedOption) =>
                        handleChange("state", selectedOption)
                      }
                      placeholder="Select your state"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="qualification" className="form-label">
                      Qualification
                    </label>
                    <Select
                      id="qualification"
                      name="qualification"
                      options={qualifications.map((q) => ({
                        value: q,
                        label: q,
                      }))}
                      value={formData.qualification}
                      onChange={(selectedOption) =>
                        handleChange("qualification", selectedOption)
                      }
                      placeholder="Select your qualification"
                      isSearchable
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label">Years of Experience</label>
                    <div className="d-flex">
                      <Select
                        id="year_of_experience"
                        name="year_of_experience"
                        options={years}
                        value={formData.year_of_experience}
                        onChange={(selectedOption) =>
                          handleChange("year_of_experience", selectedOption)
                        }
                        placeholder="Years"
                        className="mr-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="skills" className="form-label">
                      Skills
                    </label>
                    <Select
                      isMulti
                      name="skills"
                      options={skillsOptions.map((skill) => ({
                        value: skill,
                        label: skill,
                      }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={formData.skills}
                      onChange={(selectedOptions) =>
                        handleChange("skills", selectedOptions)
                      }
                      placeholder="Select or type your skills"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="certifications1" className="form-label">
                      Certification 1
                    </label>
                    <div className="d-block">
                      <input
                        type="file"
                        className="form-control-file mb-2"
                        id="certifications1"
                        name="certifications1"
                        onChange={handleFileChange1}
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="certifications1"
                        className="btn btn-outline-primary mt-2"
                        style={{ cursor: "pointer" }}
                      >
                        Choose File 1
                      </label>
                      {selectedFile1 && (
                        <div className="mt-2 text-center">
                          <p>{selectedFile1.name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="certifications2" className="form-label">
                      Certification 2
                    </label>
                    <div className="d-block">
                      <input
                        type="file"
                        className="form-control-file mb-2"
                        id="certifications2"
                        name="certifications2"
                        onChange={handleFileChange2}
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="certifications2"
                        className="btn btn-outline-primary mt-2"
                        style={{ cursor: "pointer" }}
                      >
                        Choose File 2
                      </label>
                      {selectedFile2 && (
                        <div className="mt-2 text-center">
                          <p>{selectedFile2.name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="desiredSkills" className="form-label">
                      Desired Skills
                    </label>
                    <Select
                      isMulti
                      name="desiredSkills"
                      options={skillsOptions.map((skill) => ({
                        value: skill,
                        label: skill,
                      }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={formData.desiredSkills}
                      onChange={(selectedOptions) =>
                        handleChange("desiredSkills", selectedOptions)
                      }
                      placeholder="Select or type your desired skills"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Update Profile
                </button>
                {message && <p className="mt-3 text-center">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
