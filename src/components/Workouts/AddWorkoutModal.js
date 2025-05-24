import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddWorkoutModal({ show, onHide, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: '',
      duration: '',
      status: 'Pending'
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Workout Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Morning Run"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="e.g., 30 mins"
            />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
          
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Save Workout
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddWorkoutModal;