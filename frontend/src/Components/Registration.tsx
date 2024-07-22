import React from 'react';
import { Button, Form, Input, Segment } from 'semantic-ui-react';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  state: string;
  skills: string;
  yearsOfExperience: string;
  certifications: FileList | null; // Updated to accept file uploads
  qualifications: string;
}

function Registration() {
  const [formData, setFormData] = React.useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    state: '',
    skills: '',
    yearsOfExperience: '',
    certifications: null, // Initialize as null
    qualifications: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }: any) => {
    if (event.target.type === 'file') {
      // Handle file inputs separately
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form data submitted:', formData);
    // FormData handling for file uploads typically needs to be done with FormData API if sending to a server
  };

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Full Name</label>
          <Input
            placeholder='Full Name'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Input
            type='email'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <Input
            type='tel'
            placeholder='Phone Number'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <Input
            placeholder='City'
            name='city'
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>State</label>
          <Input
            placeholder='State'
            name='state'
            value={formData.state}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Skills</label>
          <Input
            placeholder='Skills'
            name='skills'
            value={formData.skills}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Years of Experience</label>
          <Input
            type='number'
            placeholder='Years of Experience'
            name='yearsOfExperience'
            value={formData.yearsOfExperience}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Certifications (Upload file)</label>
          <Input
            type='file'
            name='certifications'
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Qualifications</label>
          <Input
            placeholder='Qualifications'
            name='qualifications'
            value={formData.qualifications}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type='submit' color='blue'>Submit</Button>
      </Form>
    </Segment>
  );
}

export default Registration;
