import React, { useState } from 'react';
import { storage } from '../firebase'; // Ensure this imports your Firebase storage
import { ref, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UploadContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const UploadInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const UploadButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const Upload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) return;

    const storageRef = ref(storage, `videos/${videoName}`);
    try {
      await uploadBytes(storageRef, videoFile);
      alert('Video uploaded successfully!');
      navigate('/'); // Redirect to Home page after successful upload
    } catch (error) {
      console.error('Error uploading video:', error);
      alert(error.message);
    }
  };

  return (
    <UploadContainer>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <UploadInput
          type="text"
          placeholder="Enter video name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
          required
        />
        <UploadInput
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
        />
        <UploadButton type="submit">Upload</UploadButton>
      </form>
    </UploadContainer>
  );
};

export default Upload;
