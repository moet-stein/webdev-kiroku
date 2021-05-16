import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShowVideo from '../components/ShowVideo';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstRoot: {
    display: 'flex',
    width: 345,
    marginTop: theme.spacing(3),
  },
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4),
  },
}));

const Channel = (props) => {
  const { id } = useParams();
  console.log(id);
  const classes = useStyles();
  const [channel, setChannel] = useState([]);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [show, setShow] = useState(false);

  const showVideos = () => {
    show ? setShow(false) : setShow(true);
  };

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics%2CbrandingSettings%2CtopicDetails&id=${id}&key=${apiKey}`
        );
        console.log(res.data.items);
        setChannel(res.data.items);
      } catch (e) {
        console.log('error', e);
      }
    };
    fetchChannel();
  }, []);

  return (
    <div>
      {channel.length > 0 &&
        channel.map((c) => {
          return (
            <div key={c.etag} className={classes.flex}>
              <Card className={classes.firstRoot}>
                <Avatar
                  className={classes.large}
                  src={c.snippet.thumbnails.high.url}
                  title={c.snippet.title}
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {c.snippet.title}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={c.brandingSettings.image.bannerExternalUrl}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography> */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {c.snippet.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={showVideos}>
                    Show Videos
                  </Button>
                </CardActions>
              </Card>
              {show && <ShowVideo channelId={c.id} />}
            </div>
          );
        })}
    </div>
  );
};

export default Channel;
