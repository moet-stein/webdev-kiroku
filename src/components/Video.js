import React from 'react';
import Modal from './Modal';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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

const Video = ({ video }) => {
  const classes = useStyles();
  const channelTitle =
    video.snippet.channelTitle.length > 20
      ? video.snippet.channelTitle.slice(0, 20) + '...'
      : video.snippet.channelTitle;

  return (
    <div className={classes.flex}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            // <Avatar aria-label="recipe" className={classes.avatar}>
            //   R
            // </Avatar>
            <Link to={`channel/${video.snippet.channelId}`}>
              <Button key={video.etag} variant="outlined" color="primary">
                {channelTitle}
              </Button>
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <NoteAddIcon />
            </IconButton>
          }
          //   title={video.snippet.channelTitle}
          subheader={video.snippet.publisedAt}
        />
        <CardMedia
          className={classes.media}
          image={video.snippet.thumbnails.high.url}
          title="Paella dish"
        />
        <div className={classes.overlay}>
          <Modal video={video} />
        </div>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {video.snippet.title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Video;
