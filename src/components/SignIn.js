import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Ensure this imports your Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignInContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

const SignInInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SignInButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  color: ${({ type }) => (type === 'error' ? 'red' : 'green')};
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError('Please verify your email before logging in.');
        return;
      }

      // Navigate to Home if email is verified
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message);
    }
  };

  return (
    <SignInContainer>
      <h2>Sign In</h2>
      {error && <Message type="error">{error}</Message>}
      <form onSubmit={handleSignIn}>
        <SignInInput 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <SignInInput 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <SignInButton type="submit">Sign In</SignInButton>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
