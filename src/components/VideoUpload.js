import React, { useState } from 'react';
import { storage } from '../firebase'; // Import the storage object
import { ref, uploadBytes } from 'firebase/storage';

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!video) return;
    setUploading(true);

    const videoRef = ref(storage, `videos/${video.name}`); // Create a reference for the video

    uploadBytes(videoRef, video).then(() => {
        console.log(`Uploaded video: ${video.name}`);
      alert('Video uploaded successfully!');
      setUploading(false);
      setVideo(null);
    }).catch((error) => {
      console.error(error);
      alert('Error uploading video');
      setUploading(false);
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload} disabled={uploading} style={{ marginLeft: '10px' }}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default VideoUpload;
