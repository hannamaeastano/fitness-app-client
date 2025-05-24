import React from 'react';
import UserProfile from '../components/Profile/UserProfile';

function ProfilePage() {
  return (
    <div>
      <h1 className="mb-4">My Profile</h1>
      <UserProfile />
    </div>
  );
}

export default ProfilePage;