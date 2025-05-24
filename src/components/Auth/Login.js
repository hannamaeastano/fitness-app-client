import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

function Login() {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      console.log('Sending login request with:', formData); // Debug log
      
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Received response status:', response.status); // Debug log
      
      const data = await response.json();
      console.log('Received response data:', data); // Debug log
  
      if (!response.ok) {
        throw new Error(data.message || `Login failed with status ${response.status}`);
      }  

      localStorage.setItem('token', data.access);
      login({ 
        email: formData.email,
        token: data.access,
        // Add any additional user data you might need
      });
      
      navigate('/workouts');
    } catch (err) {
      console.error('Full login error:', {
        message: err.message,
        stack: err.stack,
        response: err.response // if available
      });
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className="shadow border-0">
            <Card.Body className="p-4 p-md-5">
              <h1 className="text-center mb-4">Log In</h1>
              
              {error && (
                <Alert 
                  variant="danger" 
                  className="mb-4"
                  onClose={() => setError('')}
                  dismissible
                >
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({
                      ...formData, 
                      email: e.target.value
                    })}
                    required
                    autoComplete="username"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({
                      ...formData, 
                      password: e.target.value
                    })}
                    required
                    minLength="6"
                    autoComplete="current-password"
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-2"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Logging in...
                    </>
                  ) : 'Log In'}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <a href="/register" className="text-decoration-none">
                      Register here
                    </a>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;