import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const VideoDetail = () => {
    const { id } = useParams();
    const videoUrl = `https://firebasestorage.googleapis.com/v0/b/stream-studio-723d5.appspot.com/o/videos%2F${id}?alt=media`;
  
    return (
        <div style={{ textAlign: 'center' }}>
        <h1>Video Detail for {id}</h1>
        <VideoPlayer url={videoUrl} />
        <p>This is a description of the video.</p>
      </div>
    );
  };
  
  export default VideoDetail;
  
