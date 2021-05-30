import React, { useEffect, useState, useContext } from 'react';
import Modal from './Modal';
import { useAuth } from '../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Avatar, Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { VideoForNewNoteContext } from '../context/videoForNewNoteContext';
import { FetchedVideosContext } from '../context/fetchedVideosContext';
const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  root: {
    width: '350px',
    maxWidth: '350px',
    margin: theme.spacing(2),
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  overlay: {
    position: 'absolute',
    top: '37%',
    left: '35%',
    color: 'black',
  },
  //   avatar: {
  //     backgroundColor: red[500],
  //   },
}));

const Video = ({ video, channelIcon }) => {
  const { currentUser } = useAuth();
  const { fetchAgain, setFetchAgain, setLoading } = useContext(
    FetchedVideosContext
  );
  const {
    videoForNewNote,
    setVideoForNewNote,
    clearVideoForNewNote,
  } = useContext(VideoForNewNoteContext);

  const storeVideoContext = () => {
    setFetchAgain(false);
    setLoading(false);
    console.log(video);
    setVideoForNewNote(video);
  };

  const location = useLocation();
  const [searchPage, setSearchPage] = useState(true);
  useEffect(() => {
    setSearchPage(location.pathname === '/search' ? true : false);
  }, []);

  const classes = useStyles();
  const channelTitle =
    video.snippet.channelTitle.length > 20
      ? video.snippet.channelTitle.slice(0, 20) + '...'
      : video.snippet.channelTitle;

  const publishTime = video.snippet.publishTime.split('T')[0];

  const htmlEntities = (str) => {
    return String(str)
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, `'`);
  };
  const videoTitle = htmlEntities(video.snippet.title);

  return (
    <div className={classes.flex}>
      <Card className={classes.root}>
        {searchPage && (
          <CardHeader
            avatar={
              <Link to={`channel/${video.snippet.channelId}`}>
                <Button
                  key={video.etag}
                  variant="outlined"
                  color="primary"
                  onClick={storeVideoContext}
                >
                  {channelTitle}
                </Button>
              </Link>
            }
            action={
              currentUser && (
                <Link to={`/newnote/${video.id.videoId}`}>
                  <IconButton aria-label="settings" onClick={storeVideoContext}>
                    <NoteAddIcon />
                  </IconButton>
                </Link>
              )
            }
          />
        )}
        {!searchPage && (
          <CardHeader
            avatar={
              <Avatar
                alt="Remy Sharp"
                src={channelIcon}
                title={video.snippet.title}
                onClick={storeVideoContext}
              />
            }
            action={
              currentUser && (
                <Link to={`/newnote/${video.id.videoId}`}>
                  <IconButton aria-label="settings" onClick={storeVideoContext}>
                    <NoteAddIcon />
                  </IconButton>
                </Link>
              )
            }
          />
        )}
        <CardMedia
          className={classes.media}
          image={video.snippet.thumbnails.high.url}
          title={videoTitle}
        />
        <div className={classes.overlay}>
          <Modal video={video} />
        </div>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {publishTime}
          </Typography>
          <Typography> {videoTitle}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Video;
