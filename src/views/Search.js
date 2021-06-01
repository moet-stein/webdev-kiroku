import React, { useState, useEffect, useContext } from 'react';
import Loading from '../img/loading.gif';
import NotFound from '../img/notfound.png';
import Box from '@material-ui/core/Box';
import AppBarComponent from '../components/AppBarComponent';
import ProfileMenu from '../components/ProfileMenu';
import VisitorAppBar from '../components/VisitorAppBar';
import { makeStyles } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import Video from '../components/Video';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { FetchedVideosContext } from '../context/fetchedVideosContext';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const useStyles = makeStyles(() => ({
  fontColor: {
    color: '#008B8B',
  },
  boxWidth: {
    width: '350px',
  },
  picSize: {
    width: '350px',
    height: '350px',
  },
}));

const Search = () => {
  const { currentUser } = useAuth();
  const classes = useStyles();
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
    'react js',
    'mern stack',
    'web developer',
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
      setLoading(true);
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
      {loading && (
        <Box mt={15}>
          <img src={Loading} />
        </Box>
      )}

      {!loading ? (
        fetchedVideos.map((video) => {
          return <Video key={video.etag} video={video} />;
        })
      ) : (
        <Typography>Loading</Typography>
      )}
      {!loading && fetchedVideos.length === 0 && (
        <Box className={classes.boxWidth}>
          <Box mt={7} ml={5}>
            <Typography variant="h4" className={classes.fontColor}>
              No {searchQuery} videos found
            </Typography>
          </Box>
          <Box mt={3} ml={4}>
            <img className={classes.picSize} src={NotFound} />
          </Box>
        </Box>
      )}

      {currentUser ? <AppBarComponent /> : <VisitorAppBar />}
    </React.Fragment>
  );
};

export default Search;
