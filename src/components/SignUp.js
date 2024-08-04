import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

const SignUpInput = styled.input`
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

const SignUpButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const Message = styled.p`
  color: ${({ type }) => (type === 'error' ? 'red' : 'green')};
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      // Send verification email with redirect URL
      const actionCodeSettings = {
        url: 'http://localhost:3000/verify', // Change this to your verification route
        handleCodeInApp: true,
      };

      await sendEmailVerification(user, actionCodeSettings);
      setMessage('Sign Up successful! Please check your email to verify your account.');
      navigate('/'); // Redirect to Home after sign-up

    } catch (error) {
      console.error('Error signing up:', error);
      setMessage(error.message);
    }
  };

  return (
    <SignUpContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <SignUpInput
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SignUpInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <SignUpInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SignUpButton type="submit">Sign Up</SignUpButton>
        {message && <Message type={message.includes('error') ? 'error' : 'success'}>{message}</Message>}
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
