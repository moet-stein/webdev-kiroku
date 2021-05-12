import React from 'react';
import Modal from './Modal';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: red[500],
  },
  author: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const Video = ({ video }) => {
  const classes = useStyles();

  return (
    <Card key={video.id.videoId} className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {video.snippet.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {video.snippet.publishedAt}
          </Typography>
        </CardContent>
        <div className={classes.author}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
          <Typography variant="subtitle1" color="textSecondary">
            {video.snippet.channelTitle}
          </Typography>
        </div>
      </div>

      <CardMedia
        className={classes.cover}
        image={video.snippet.thumbnails.high.url}
      >
        <Modal video={video} />
      </CardMedia>
    </Card>
  );
};

export default Video;
