import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { statesOfIndia } from "./states";
import { citiesOfIndia } from "./cities";
import { qualifications } from "./qualifications";
import CustomNavbar from "../shared/Navbar";
import { skillsOptions } from "./skills";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const years = Array.from({ length: 31 }, (_, i) => ({
  value: i,
  label: `${i} years`,
}));

function Registration() {
  const navigate = useNavigate();

  const initialFormData = {
    full_name: "",
    email: "",
    phone_number: "",
    city: "",
    state: null,
    skills: [],
    desiredSkills: [],
    year_of_experience: null,
    qualification: null,
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState(initialFormData);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [disabledFields, setDisabledFields] = useState(false);

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    setFormData(initialFormData);
    setSelectedFile1(null);
    setSelectedFile2(null);
    setMessage("");
  }, []);

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.full_name)) {
      Swal.fire("Invalid Name", "Name should contain only characters.", "error");
      return false;
    }

    if (!phoneRegex.test(formData.phone_number)) {
      Swal.fire("Invalid Phone Number", "Phone number must be 10 digits long.", "error");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
      return false;
    }

    if (formData.skills.length === 0) {
      Swal.fire("Skills Required", "Please select at least one skill.", "error");
      return false;
    }

    return true;
  };

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

  const handleStateChange = (selectedOption) => {
    handleChange("state", selectedOption);
    setCities(citiesOfIndia[selectedOption.value] || []);
  };

  const handleSkillChange = (selectedOptions) => {
    handleChange("skills", selectedOptions);
    const filteredDesiredSkills = formData.desiredSkills.filter(
      (desiredSkill) =>
        !selectedOptions.some((skill) => skill.value === desiredSkill.value)
    );
    handleChange("desiredSkills", filteredDesiredSkills);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("email", formData.email);
    data.append("phone_number", formData.phone_number);
    data.append("city", formData.city ? formData.city.value : "");
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
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/users/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setMessage("Registration successful!");
      Swal.fire("Success", "Registration successful!", "success");
      navigate("/confirm-registration");
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Registration failed. Please try again.";
      setMessage(errorMessage);
      Swal.fire("Error", errorMessage, "error");
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
              <h3 className="text-center mb-4">Registration Form</h3>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="full_name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={(e) =>
                        handleChange("full_name", e.target.value)
                      }
                      placeholder="Full Name"
                      autoComplete="off"
                      required
                      disabled={disabledFields}
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
                      disabled={disabledFields}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone_number" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={(e) =>
                        handleChange("phone_number", e.target.value)
                      }
                      placeholder="Phone Number"
                      autoComplete="off"
                      required
                      disabled={disabledFields}
                    />
                  </div>
                  <div className="col-md-6">
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
                      onChange={handleStateChange}
                      placeholder="Select your state"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <Select
                      id="city"
                      name="city"
                      options={cities.map((city) => ({
                        value: city,
                        label: city,
                      }))}
                      value={formData.city}
                      onChange={(selectedOption) =>
                        handleChange("city", selectedOption)
                      }
                      placeholder="Select your city"
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
                  <div className="col-md-6 mb-3">
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
                        required
                        styles={{
                          container: (provided) => ({
                            ...provided,
                            width: "100%",
                          }),
                        }}
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
                      onChange={handleSkillChange}
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
                      options={skillsOptions
                        .map((skill) => ({
                          value: skill,
                          label: skill,
                        }))
                        .filter(
                          (option) =>
                            !formData.skills.some(
                              (skill) => skill.value === option.value
                            )
                        )}
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
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Submit"}
                </button>
                {message && <p className="mt-3 text-center">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
