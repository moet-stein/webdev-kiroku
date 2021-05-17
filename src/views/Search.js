import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Video from '../components/Video';
import axios from 'axios';
import { Typography } from '@material-ui/core';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const Search = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const queries = [
      'javascript',
      'react app',
      'mern stack',
      'web developer',
      'codingchallenge',
      'node js',
      'mongo db',
      'firebase',
      'html css',
      'typescript',
      'gatsby js',
    ];
    let searchQuery = queries[Math.floor(Math.random() * queries.length)];
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&order=viewCount&relevanceLanguage=en&key=${apiKey}`
        );
        setVideos(res.data.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <Typography>WebDev Kiroku</Typography>
      <SearchBar />
      {videos.map((video) => {
        return <Video key={video.etag} video={video} />;
      })}
    </div>
  );
};

export default Search;
