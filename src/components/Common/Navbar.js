import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';

function CustomNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const expand = 'md'; // Collapse at medium screen size

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand={expand} 
      sticky="top"
      className="custom-navbar"
      collapseOnSelect // This will make the navbar collapse when an item is selected
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          Fitness Tracker
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls={`offcanvasNavbar-expand-${expand}`} 
          className="navbar-toggle"
        />
        
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          bg="dark"
          variant="dark"
          className="custom-offcanvas"
        >
          <Offcanvas.Header closeButton className="offcanvas-header">
            <Offcanvas.Title 
              id={`offcanvasNavbarLabel-expand-${expand}`}
              className="offcanvas-title"
            >
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-body">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link 
                as={Link} 
                to="/" 
                className="nav-link"
                eventKey="1" // Required for collapseOnSelect to work
              >
                Home
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/workouts" 
                    className="nav-link"
                    eventKey="2"
                  >
                    Workouts
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/profile" 
                    className="nav-link"
                    eventKey="3"
                  >
                    Profile
                  </Nav.Link>
                  <Button 
                    variant="outline-light" 
                    onClick={handleLogout}
                    className="logout-btn ms-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/login" 
                    className="nav-link"
                    eventKey="4"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/register" 
                    className="nav-link"
                    eventKey="5"
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;