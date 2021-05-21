import React, { useState, useEffect, useContext } from 'react';
import AppBar from '../components/AppBar';
import VisitorAppBar from '../components/VisitorAppBar';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import Video from '../components/Video';
import axios from 'axios';
import { Typography } from '@material-ui/core';
// import { SearchInputContext } from '../context/searchInputContext';
import { FetchedVideosContext } from '../context/fetchedVideosContext';
import useLocalStorage from '../components/useLocalStorage';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const Search = () => {
  // const { searchInput, setSearchInput } = useContext(SearchInputContext);
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
  // const [fetchedVs, setFetchedVs] = useLocalStorage('fetchedVideos', []);
  console.log(fetchedVideos);
  // const [loading, setLoading] = useState(true);

  // const [videos, setVideos] = useState([]);
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
      // setVideos(res.data.items);
      // setFetchAgain(false)
      setLoading(false);
      console.log(res.data.items);
    } catch (e) {
      console.log(e);
    }
  };
  // const isFetchAgain = () => {
  //   fetchedVideos.length === 0 || searchInput === ''
  //     ? fetchVideos()
  //     : setLoading(false);
  // };

  useEffect(() => {
    // isFetchAgain();
    // if (fetchedVideos.length === 0) {

    // } else {
    // setLoading(false);
    // }
    if (fetchAgain) fetchVideos();
  }, [searchInput]);

  return (
    <React.Fragment>
      <Typography>WebDev Kiroku</Typography>
      <SearchBar />
      {!loading ? (
        fetchedVideos.map((video) => {
          return <Video key={video.etag} video={video} />;
        })
      ) : (
        <Typography>Loading</Typography>
      )}
      {currentUser ? <AppBar /> : <VisitorAppBar />}
    </React.Fragment>
  );
};

export default Search;
