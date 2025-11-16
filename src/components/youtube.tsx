import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const API_KEY = ''; 
const CHANNEL_ID = ''; // ID do canal
const MAX_RESULTS = 10;

export default function YouTubeChannelVideos() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
      );
      const data = await res.json();
      console.log(data);
      const videoItems = data.items.filter((item: any) => item.id.kind === 'youtube#video');
      setVideos(videoItems);
      setSelectedVideo(videoItems[0]);
    };
    fetchVideos();
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem' }}>
      {/*selectedVideo && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>{selectedVideo.snippet.title}</h2>
          <ReactPlayer src={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`} controls  />
        </div>
      )*/}
      <div style={{ display: 'flex', flexDirection: 'row', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', height: '300px', overflowY: 'hidden', overflowX: 'auto'  }}>
        {videos.map((video: any) => (
          <div
            key={video.id.videoId}
            onClick={() => setSelectedVideo(video)}
            style={{ cursor: 'pointer', border: '1px solid #ccc', borderRadius: '8px', width: '250px', minWidth: selectedVideo.id.videoId === video.id.videoId ? '302px' : '200px' }}
          >
            {selectedVideo.id.videoId !== video.id.videoId &&  <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} style={{ width: '100%', height: '210px', objectFit: 'cover' }} />}
            {selectedVideo && selectedVideo.id.videoId === video.id.videoId && (
                <ReactPlayer src={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`} width={'250px'} height="210px" controls  />
            )}
            <div style={{ padding: '0.5rem', fontSize: '0.9rem', height: '4rem' }}>{video.snippet.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
