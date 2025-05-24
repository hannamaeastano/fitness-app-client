import React, { useState, useEffect } from 'react';
import WorkoutCard from '../components/Workouts/WorkoutCard';
import AddWorkoutModal from '../components/Workouts/AddWorkoutModal';
import { Button, Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';

function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
 

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch workouts');
        }

        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleAddWorkout = async (workoutData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addWorkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...workoutData,
          status: 'pending'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add workout');
      }

      setWorkouts([...workouts, data]);
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompleteWorkout = async (id, updatedWorkout) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/completeWorkoutStatus/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete workout');
      }

      setWorkouts(workouts.map(w => 
        w._id === id ? { ...w, status: 'completed' } : w
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/deleteWorkout/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete workout');
      }

      setWorkouts(workouts.filter(workout => workout._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateWorkout = (id, updatedWorkout) => {
    setWorkouts(prevWorkouts => 
      prevWorkouts.map(w => 
        w._id === id ? { ...w, ...updatedWorkout } : w
      )
    );
  };

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );

  if (error) return (
    <Container className="py-4">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">My Workouts</h1>
        <Button 
          variant="primary" 
          onClick={() => setShowModal(true)}
          className="ms-3"
        >
          + Add Workout
        </Button>
      </div>

      {workouts.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <h4 className="text-muted mb-4">No workouts yet</h4>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setShowModal(true)}
            >
              Add Your First Workout
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {workouts.map(workout => (
            <Col key={workout._id}>
              <WorkoutCard 
                workout={workout} 
                onDelete={handleDeleteWorkout}
                onComplete={handleCompleteWorkout}
                onUpdate={handleUpdateWorkout}
              />
            </Col>
          ))}
        </Row>
      )}

      <AddWorkoutModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleAddWorkout}
      />
    </Container>
  );
}

export default WorkoutsPage;