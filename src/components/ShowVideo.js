import React, { useState, useEffect } from 'react';
import Video from './Video';
import axios from 'axios';

const ShowVideo = ({ channelId, channelIcon }) => {
  const [channelVideos, setChannelVideos] = useState([]);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        const res = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&key=${apiKey}`
        );
        console.log(res.data.items);
        setChannelVideos(res.data.items);
      } catch (e) {
        console.log('error', e);
      }
    };
    fetchChannelVideos();
  }, []);

  return (
    <React.StrictMode>
      {channelVideos.map((video) => {
        return (
          <Video key={video.etag} video={video} channelIcon={channelIcon} />
        );
      })}
    </React.StrictMode>
  );
};

export default ShowVideo;
