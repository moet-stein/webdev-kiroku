import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              {video.snippet.title}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
            <NoteAddIcon />
          </Toolbar>
        </AppBar>
        <Card className={classes.videoCard}>
          <CardMedia
            className={classes.videoMedia}
            component="iframe"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            autoPlay
          />
        </Card>
      </Dialog>
    </div>
  );
};
export default Modal;
