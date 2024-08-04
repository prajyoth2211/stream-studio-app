import React, { useEffect, useState } from 'react';
import { storage } from '../firebase'; 
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin: 20px;
`;

const VideoCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const VideoTitle = styled.h2`
  font-size: 16px;
  padding: 10px;
  text-align: center;
`;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [videoNames, setVideoNames] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoListRef = ref(storage, 'videos/');
      try {
        const videoList = await listAll(videoListRef);
        const videoUrls = await Promise.all(
          videoList.items.map(item => getDownloadURL(item))
        );

        // Store video names by extracting them from the item names
        const names = videoList.items.map(item => item.name);
        setVideos(videoUrls);
        setVideoNames(names);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1 style={{ marginLeft: '20px' }}>Trending</h1>
      <VideoGrid>
        {videos.map((url, index) => (
          <VideoCard key={index}>
            <video width="320" height="240" controls>
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <VideoTitle>{videoNames[index] || `Video ${index + 1}`}</VideoTitle>
          </VideoCard>
        ))}
      </VideoGrid>
    </div>
  );
};

export default Home;
