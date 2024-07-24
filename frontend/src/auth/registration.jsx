import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Registration({ email }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: email,
    phoneNumber: "",
    city: "",
    state: "",
    skills: "",
    yearsOfExperience: "",
    certifications: null,
    qualifications: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: event.target.files,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ paddingTop: "4em" }}
    >
      <div className="card p-4 w-100" style={{ maxWidth: "800px" }}>
        <h3 className="text-center mb-4">Registration</h3>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                autoComplete="off"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="skills" className="form-label">
                Skills
              </label>
              <input
                type="text"
                className="form-control"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="yearsOfExperience" className="form-label">
                Years of Experience
              </label>
              <input
                type="number"
                className="form-control"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                placeholder="Years of Experience"
                autoComplete="off"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="qualifications" className="form-label">
                Qualifications
              </label>
              <input
                type="text"
                className="form-control"
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="Qualifications"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="certifications" className="form-label">
              Certifications (Upload file)
            </label>
            <input
              type="file"
              className="form-control"
              id="certifications"
              name="certifications"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
