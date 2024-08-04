import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Ensure this imports your Firebase auth
import { signOut } from 'firebase/auth';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  background-color: #181818;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin-left: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  margin: 0 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const NavLink = styled(Link)`
  color: white;
  margin-right: 20px;
  text-decoration: none;
  position: relative;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background: none;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 20px;
  font: inherit; /* Inherit font styles from parent */
  
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Successfully logged out!');
      navigate('/'); // Redirect to Home page after logging out
    } catch (error) {
      console.error('Error signing out:', error);
      alert(error.message);
    }
  };

  return (
    <NavbarContainer>
      <Logo>Stream Studio</Logo>
      <SearchInput type="text" placeholder="Search..." />
      <div>
        {!user ? (
          <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/upload">Upload Video</NavLink>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        )}
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
