import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import VideoDetail from './pages/VideoDetail';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verify from './pages/Verify'; // Import the new Verify component
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} /> {/* Add the Verify route */}
      </Routes>
    </Router>
  );
}

export default App;
