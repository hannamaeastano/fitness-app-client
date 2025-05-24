import React, { useState } from 'react';
import { Card, Badge, Button, Stack, Modal, Form } from 'react-bootstrap';

function WorkoutCard({ workout, onDelete, onComplete, onUpdate }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState({
    name: workout.name,
    duration: workout.duration,
    status: workout.status
  });

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/completeWorkoutStatus/${workout._id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete workout');
      }

      onComplete(workout._id, data.workout);
    } catch (err) {
      console.error('Complete error:', err);
    }
  };

  const handleUpdateWorkout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/updateWorkout/${workout._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(editedWorkout)
        }
      );
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update workout');
      }
  
      // Call onUpdate with both id and the updated workout data
      onUpdate(workout._id, data.workout || editedWorkout);
      setShowEditModal(false);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const statusVariant = workout.status === 'completed' ? 'success' : 'warning';

  return (
    <>
      <Card className="mb-3 shadow-sm workout-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0">{workout.name}</Card.Title>
            <Badge pill bg={statusVariant} className="text-capitalize">
              {workout.status}
            </Badge>
          </div>
          
          <Card.Text as="div" className="text-muted mb-3">
            <div><strong>Duration:</strong> {workout.duration}</div>
            <div><strong>Date Added:</strong> {new Date(workout.dateAdded).toLocaleDateString()}</div>
          </Card.Text>
          
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => onDelete(workout._id)}
            >
              Delete
            </Button>
            {workout.status !== 'completed' && (
              <Button 
                variant="success" 
                size="sm"
                onClick={handleComplete}
              >
                ✓ Done
              </Button>
            )}
          </Stack>
        </Card.Body>
      </Card>

      {/* Edit Workout Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateWorkout}>
            <Form.Group className="mb-3">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                type="text"
                value={editedWorkout.name}
                onChange={(e) => setEditedWorkout({...editedWorkout, name: e.target.value})}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={editedWorkout.duration}
                onChange={(e) => setEditedWorkout({...editedWorkout, duration: e.target.value})}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editedWorkout.status}
                onChange={(e) => setEditedWorkout({...editedWorkout, status: e.target.value})}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
            
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WorkoutCard;