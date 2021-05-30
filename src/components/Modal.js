import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../context/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { FetchedVideosContext } from '../context/fetchedVideosContext';
import { VideoForNewNoteContext } from '../context/videoForNewNoteContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  playIcon: {
    width: '80px',
    height: '80px',
  },
  videoCard: {
    marginTop: theme.spacing(7),
  },
  videoMedia: {
    height: '300px',
    border: 'none',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ video }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const location = useLocation();
  const [onNoteDetails, setOnNoteDetails] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoId, setVideoId] = useState('');
  const [open, setOpen] = React.useState(false);
  const { fetchAgain, setFetchAgain, setLoading } = useContext(
    FetchedVideosContext
  );
  const {
    videoForNewNote,
    setVideoForNewNote,
    clearVideoForNewNote,
  } = useContext(VideoForNewNoteContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const storeVideoContext = () => {
    setFetchAgain(false);
    setLoading(false);
    console.log(video);
    setVideoForNewNote(video);
  };

  useEffect(() => {
    if (location.pathname.includes('notedetail')) {
      setVideoTitle(video.title);
      setVideoId(video.url.substring(video.url.length - 11));
      setOnNoteDetails(true);
    } else {
      setVideoTitle(video.snippet.title);
      setVideoId(video.id.videoId);
      setOnNoteDetails(false);
    }
  }, []);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <PlayCircleOutlineIcon
          className={classes.playIcon}
          style={{ fill: 'rgba(255,255,255, 0.8)' }}
        />
      </IconButton>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {videoTitle}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
            {currentUser && !onNoteDetails && (
              <Link to={`/newnote/${videoId}`}>
                <IconButton aria-label="settings" onClick={storeVideoContext}>
                  <NoteAddIcon />
                </IconButton>
              </Link>
            )}
          </Toolbar>
        </AppBar>
        <Card className={classes.videoCard}>
          <CardMedia
            className={classes.videoMedia}
            component="iframe"
            src={`https://www.youtube.com/embed/${videoId}`}
            autoPlay
          />
        </Card>
      </Dialog>
    </div>
  );
};
export default Modal;
