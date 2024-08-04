import React, { useEffect } from 'react';
import { auth } from '../firebase'; // Ensure this imports your Firebase auth
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const mode = queryParams.get('mode');
    const oobCode = queryParams.get('oobCode');

    if (mode === 'verifyEmail') {
      // Complete email verification
      auth.applyActionCode(oobCode)
        .then(() => {
          // Email verified successfully
          alert('Your email has been verified!');
          navigate('/'); // Navigate to Home page after verification
        })
        .catch((error) => {
          console.error('Error verifying email:', error);
          alert('Error verifying email. Please try again.');
        });
    }
  }, [navigate]);

  return <div>Verifying your email...</div>;
};

export default Verify;
