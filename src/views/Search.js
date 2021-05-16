import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Video from '../components/Video';
import axios from 'axios';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const Search = () => {
  // const videos = [
  //   {
  //     etag: 'hsXy8QV1mkSzQOogluYxTd_nlEc',
  //     id: { videoId: 'se4CJPJLHnY' },
  //     snippet: {
  //       channelId: 'UCTLZ1jlmY-VogpQXng48iKQ',
  //       channelTitle: 'Hungry Birds',
  //       description:
  //         'Download Nostra Pro App & Earn Money from Cricket T20 Festival with your Sports Knowledge. App Link- https://nstra.pro/niWlbTA6OV Rs 100 Sign up Bonus ...',
  //       liveBroadcastContent: 'none',
  //       publishTime: '2019-04-12T09:48:22Z',
  //       publishedAt: '2019-04-12T09:48:22Z',

  //       thumbnails: {
  //         default: {
  //           url: 'https://i.ytimg.com/vi/se4CJPJLHnY/default.jpg',
  //           width: 120,
  //           height: 90,
  //         },
  //         high: {
  //           height: 360,
  //           url: 'https://i.ytimg.com/vi/se4CJPJLHnY/hqdefault.jpg',
  //           width: 480,
  //         },
  //         medium: {
  //           url: 'https://i.ytimg.com/vi/se4CJPJLHnY/mqdefault.jpg',
  //           width: 320,
  //           height: 180,
  //         },
  //       },
  //     },
  //     title: 'Guess The Cold Drink Challenge | Soft Drink Challenge',
  //   },
  // ];
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const queries = [
      'javascript',
      'react app',
      'mern stack',
      'web developer',
      'coding challenge',
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
      <SearchBar />
      {videos.map((video) => {
        return <Video key={video.etag} video={video} />;
      })}
    </div>
  );
};

export default Search;
