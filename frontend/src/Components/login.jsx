import React, { useState } from 'react';
import { Button, Form, Input, Segment, Grid, Header, Icon } from 'semantic-ui-react';

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, { name, value }: any) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data submitted:', formData);
    // Add form submission logic here
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh', paddingTop: '4em', backgroundColor: '#f9f9f9' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment
          raised
          style={{
            padding: '2em',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
            borderRadius: '8px'
          }}
        >
          <Header as='h2' icon textAlign='center'>
            <Icon name='sign in' circular />
            <Header.Content>Login to Job Portal</Header.Content>
          </Header>
          <Form onSubmit={handleSubmit} style={{ marginTop: '2em' }}>
            <Form.Field>
              <label>Email</label>
              <Input
                type='email'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                icon='mail'
                iconPosition='left'
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                icon='lock'
                iconPosition='left'
              />
            </Form.Field>
            <Button type='submit' color='blue' fluid size='large' style={{ marginTop: '2em' }}>Login</Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
