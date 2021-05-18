import React, { useState, useEffect, useContext } from 'react';
import SearchBar from '../components/SearchBar';
import Video from '../components/Video';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { FetchedVideosContext } from '../context/fetchedVideosContext';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const Search = () => {
  const { fetchedVideos, setFetchedVideos, loading, setLoading } = useContext(
    FetchedVideosContext
  );

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
        setFetchedVideos(res.data.items);
        setLoading(false);
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
      {!loading ? (
        videos.map((video) => {
          return <Video key={video.etag} video={video} />;
        })
      ) : (
        <Typography>Loading</Typography>
      )}
    </div>
  );
};

export default Search;
