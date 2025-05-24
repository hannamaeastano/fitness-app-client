import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge, ProgressBar, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaTrophy, FaChartLine, FaCalendarAlt, FaFacebook, FaFire, FaHeartbeat, FaRunning } from 'react-icons/fa';

function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userStats = {
    workoutsCompleted: 24,
    weeklyGoal: 5,
    currentWeekProgress: 3,
    streakDays: 7,
    joinDate: '2023-05-15',
    caloriesBurned: 1240,
    activeMinutes: 620
  };

  const progressPercentage = (userStats.currentWeekProgress / userStats.weeklyGoal) * 100;

  const handleStartWorkout = () => navigate('/workouts');
  const handleViewProgress = () => navigate('/workouts');
  const handleViewAchievements = () => navigate('/workouts');
  const handleShareAchievements = () => {
    window.open('https://www.facebook.com', '_blank');
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          {/* Profile Card */}
          <Card className="shadow mb-4">
            <Card.Body className="p-4 text-center">
              <div className="d-flex justify-content-center mb-3">
                <div className="rounded-circle bg-primary p-4 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                  <FaUser className="text-white" size={40} />
                </div>
              </div>
              
              <h2 className="mb-3">
                {user ? user.email.split('@')[0] : 'Guest User'}
                {user && <Badge bg="success" className="ms-2">Active</Badge>}
              </h2>

              {user ? (
                <>
                  {/* Stats Grid */}
                  <Row className="g-4 mb-4">
                    <Col xs={4}>
                      <div className="stat-item">
                        <FaRunning className="text-primary mb-2" size={24} />
                        <h3 className="mb-0">{userStats.workoutsCompleted}</h3>
                        <small className="text-muted">Workouts</small>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="stat-item">
                        <FaFire className="text-primary mb-2" size={24} />
                        <h3 className="mb-0">{userStats.streakDays}</h3>
                        <small className="text-muted">Day Streak</small>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="stat-item">
                        <FaHeartbeat className="text-primary mb-2" size={24} />
                        <h3 className="mb-0">{userStats.weeklyGoal}</h3>
                        <small className="text-muted">Weekly Goal</small>
                      </div>
                    </Col>
                  </Row>

                  {/* Progress Section */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <small>Weekly Progress</small>
                      <small>{userStats.currentWeekProgress}/{userStats.weeklyGoal}</small>
                    </div>
                    <ProgressBar now={progressPercentage} className="mb-4" />
                  </div>

                  {/* Additional Stats */}
                  <Row className="g-4 mb-4">
                    <Col sm={6}>
                      <Card className="h-100">
                        <Card.Body className="text-center">
                          <h4 className="text-primary">{userStats.caloriesBurned}</h4>
                          <p className="mb-0 text-muted">Calories Burned</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={6}>
                      <Card className="h-100">
                        <Card.Body className="text-center">
                          <h4 className="text-primary">{userStats.activeMinutes}</h4>
                          <p className="mb-0 text-muted">Active Minutes</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* Action Buttons */}
                  <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                    <Button variant="outline-primary" onClick={handleViewProgress}>
                      <FaChartLine className="me-1" /> Stats
                    </Button>
                    <Button variant="outline-secondary" onClick={handleViewProgress}>
                      <FaCalendarAlt className="me-1" /> History
                    </Button>
                  </div>

                  {/* Main Actions */}
                  <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center mb-3">
                    <Button variant="danger" onClick={logout} className="flex-grow-1">
                      <FaSignOutAlt className="me-1" /> Logout
                    </Button>
                    <Button variant="success" onClick={handleViewAchievements} className="flex-grow-1">
                      <FaTrophy className="me-1" /> Achievements
                    </Button>
                  </div>

                  <div className="text-muted mt-3">
                    <FaCalendarAlt className="me-1" /> Member since {new Date(userStats.joinDate).toLocaleDateString()}
                  </div>
                </>
              ) : (
                <Alert variant="info" className="text-center">
                  <p>Please login to view your complete profile and track your fitness journey</p>
                  <Button variant="primary" href="/login" className="mt-2">
                    Login Now
                  </Button>
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Quick Actions Card */}
          {user && (
            <Card className="shadow">
              <Card.Body className="p-4">
                <h4 className="mb-4 text-center">Quick Actions</h4>
                <div className="d-grid gap-3">
                  <Button variant="primary" size="lg" onClick={handleStartWorkout}>
                    Start New Workout
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={handleViewProgress}>
                    View Progress
                  </Button>
                  <Button variant="outline-info" size="lg" onClick={handleShareAchievements}>
                    <FaFacebook className="me-1" /> Share
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;