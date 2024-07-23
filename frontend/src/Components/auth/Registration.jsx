import React, { useState } from 'react';
import { Button, Form, Input, Segment, Grid } from 'semantic-ui-react';

const Registration = ({ email }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: email,
    phoneNumber: '',
    city: '',
    state: '',
    skills: '',
    yearsOfExperience: '',
    certifications: null,
    qualifications: ''
  });

  const handleChange = (event, { name, value }) => {
    if (event.target.type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: event.target.files
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Form data submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh', paddingTop: '4em' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 1400, width: '100%' }}>
        <Segment
          padded="very"
          style={{
            minHeight: '80vh',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
            borderRadius: '8px',
            marginTop: '2em'
          }}
        >
          <Form
            onSubmit={handleSubmit}
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}
          >
            <Form.Group widths="equal">
              <Form.Field>
                <label>Full Name</label>
                <Input
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>City</label>
                <Input
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>State</label>
                <Input
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Skills</label>
                <Input
                  placeholder="Skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Years of Experience</label>
                <Input
                  type="number"
                  placeholder="Years of Experience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Qualifications</label>
                <Input
                  placeholder="Qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Certifications (Upload file)</label>
              <Input
                type="file"
                name="certifications"
                onChange={handleChange}
              />
            </Form.Field>
            <Button type="submit" color="blue" fluid style={{ marginTop: '2em' }}>Submit</Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Registration;
