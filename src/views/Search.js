import React, { useState, useEffect, useContext } from 'react';
import AppBarComponent from '../components/AppBarComponent';
import ProfileMenu from '../components/ProfileMenu';
import VisitorAppBar from '../components/VisitorAppBar';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import Video from '../components/Video';
import axios from 'axios';
import { Box, Typography } from '@material-ui/core';
import { FetchedVideosContext } from '../context/fetchedVideosContext';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const Search = () => {
  const { currentUser } = useAuth();
  const {
    fetchedVideos,
    setFetchedVideos,
    searchInput,
    setSearchInput,
    fetchAgain,
    setFetchAgain,
    loading,
    setLoading,
  } = useContext(FetchedVideosContext);
  console.log(fetchedVideos);
  const queries = [
    'javascript',
    'react app',
    'mern stack',
    'web developer',
    'codingchallenge',
    'node js',
    'mongo db',
    'html css',
    'typescript',
    'gatsby js',
  ];

  let searchQuery =
    searchInput.length > 0
      ? searchInput
      : queries[Math.floor(Math.random() * queries.length)];

  const fetchVideos = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&order=viewCount&relevanceLanguage=en&key=${apiKey}`
      );
      setFetchedVideos(res.data.items);
      setLoading(false);
      console.log(res.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (fetchAgain) fetchVideos();
  }, [searchInput]);

  return (
    <React.Fragment>
      {currentUser ? (
        <Box display="flex" p={1}>
          <Box flexGrow={1} mt={3}>
            <Typography variant="h5">Kiroku</Typography>
          </Box>
          <Box p={1}>
            <ProfileMenu />
          </Box>
        </Box>
      ) : (
        <Typography variant="h5">Kiroku</Typography>
      )}

      <SearchBar />

      {!loading ? (
        fetchedVideos.map((video) => {
          return <Video key={video.etag} video={video} />;
        })
      ) : (
        <Typography>Loading</Typography>
      )}

      {currentUser ? <AppBarComponent /> : <VisitorAppBar />}
    </React.Fragment>
  );
};

export default Search;
