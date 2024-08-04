import React from 'react';
import { auth } from '../firebase'; // Ensure this imports your Firebase auth

const Profile = () => {
  const user = auth.currentUser;

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.displayName || 'Not provided'}</p>
          <p>Email: {user.email}</p>
          <p>Status: {user.emailVerified ? 'Email Verified' : 'Email Not Verified'}</p>
        </div>
      ) : (
        <p>No user signed in</p>
      )}
    </div>
  );
};

export default Profile;
