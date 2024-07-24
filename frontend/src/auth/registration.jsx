import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { statesOfIndia } from "./states";
import { qualifications } from "./qualifications";
import CustomNavbar from "../shared/Navbar";
import { skillsOptions } from "./skills";

const years = Array.from({ length: 31 }, (_, i) => ({
  value: i,
  label: `${i} years`,
}));
const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: `${i} months`,
}));

function Registration({ email }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: email || "",
    phoneNumber: "",
    city: "",
    state: null,
    skills: [],
    desiredSkills: [],
    yearsOfExperience: null,
    monthsOfExperience: null,
    qualification: null,
  });
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile1(file.name);
    }
  };

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile2(file.name);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    // Add your form submission logic here
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
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label">Years of Experience</label>
                    <div className="d-flex">
                      <Select
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                        options={years}
                        value={formData.yearsOfExperience}
                        onChange={(selectedOption) =>
                          handleChange("yearsOfExperience", selectedOption)
                        }
                        placeholder="Years"
                        className="mr-2"
                      />
                      <Select
                        id="monthsOfExperience"
                        name="monthsOfExperience"
                        options={months}
                        value={formData.monthsOfExperience}
                        onChange={(selectedOption) =>
                          handleChange("monthsOfExperience", selectedOption)
                        }
                        placeholder="Months"
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
                          <p>{selectedFile1}</p>
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
                          <p>{selectedFile2}</p>
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
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
