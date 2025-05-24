import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaQuoteLeft, FaRunning, FaChartLine, FaDumbbell } from 'react-icons/fa';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate(); // Add this import from 'react-router-dom'

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Optional: scroll to top
  };

  const features = [
    {
      icon: <FaRunning size={40} className="text-primary mb-3" />,
      title: "Track Workouts",
      description: "Log your exercises and monitor your progress over time.",
      img: "https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?cs=srgb&dl=pexels-victor-freitas-841131.jpg&fm=jpg"
    },
    {
      icon: <FaChartLine size={40} className="text-primary mb-3" />,
      title: "View Analytics",
      description: "See detailed charts of your fitness journey.",
      img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      icon: <FaDumbbell size={40} className="text-primary mb-3" />,
      title: "Set Goals",
      description: "Create and achieve your fitness milestones.",
      img: "https://images.pexels.com/photos/1117493/pexels-photo-1117493.jpeg?cs=srgb&dl=pexels-the-lazy-artist-gallery-1117493.jpg&fm=jpg"
    }
  ];

  return (
    <>
      <section className="hero-section bg-dark text-white py-5">
        <Container className="py-lg-5">
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4">Transform Your Fitness Journey</h1>
              <p className="lead mb-4">Track, analyze, and improve your workouts with our powerful fitness tracker</p>
              <Button 
              variant="primary" 
              size="lg" 
              className="px-4"
              style={{position: 'relative', zIndex: 1}} // Force above other elements
              onClick={() => handleNavigation(user ? '/workouts' : '/register')}
            >
              {user ? 'Go to Dashboard' : 'Get Started Now'}
            </Button>
            </Col>
            <Col lg={6}>
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Fitness" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 display-4 fw-bold">Why Choose Our Fitness Tracker</h2>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0 overflow-hidden">
                  <div className="feature-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                    <Card.Img 
                      variant="top" 
                      src={feature.img} 
                      className="img-fluid h-100 w-100 object-fit-cover"
                    />
                  </div>
                  <Card.Body className="text-center p-4">
                    {feature.icon}
                    <Card.Title className="fs-4">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <div className="mb-5">
                <FaQuoteLeft className="text-primary" size={48} />
              </div>
              <blockquote className="blockquote">
                <p className="mb-4 fs-4">This fitness tracker completely changed how I approach my workouts. Being able to see my progress visually keeps me motivated!</p>
                <footer className="blockquote-footer mt-3">Sarah Johnson, <cite>Fitness Enthusiast</cite></footer>
              </blockquote>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;