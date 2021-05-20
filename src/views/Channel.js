import React, { useState, useEffect, useCallback } from 'react';
import GoBackPage from '../components/GoBackPage';
import { makeStyles } from '@material-ui/core/styles';
import ShowVideo from '../components/ShowVideo';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { grey, red } from '@material-ui/core/colors';
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
    width: 400,
    marginTop: theme.spacing(3),
  },
  root: {
    width: 400,
  },
  media: {
    height: 140,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  displayFlex: {
    display: 'flex',
  },
  marginCenter: {
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  marginEverything: {
    margin: theme.spacing(1),
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
  const classes = useStyles();
  const [channel, setChannel] = useState([]);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [show, setShow] = useState(false);
  const [added, setAdded] = useState(false);
  const [heartColor, setHeartColor] = useState('grey');

  const numberConverter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

  const htmlEntities = (str) => {
    return String(str)
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, `'`);
  };

  const showVideos = () => {
    show ? setShow(false) : setShow(true);
  };
  const toggleFavorite = () => {
    added ? setAdded(false) : setAdded(true);
    added ? setHeartColor('grey') : setHeartColor('red');
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
      <GoBackPage />
      {channel.length > 0 &&
        channel.map((c) => {
          return (
            <div key={c.etag} className={classes.flex}>
              <Card className={classes.firstRoot}>
                <IconButton
                  onClick={toggleFavorite}
                  aria-label="add to favorites"
                >
                  <FavoriteIcon
                    fontSize="large"
                    style={{ color: heartColor }}
                  />
                </IconButton>
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
                  <CardContent className={classes.marginEverything}>
                    {/* <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography> */}
                    <div className={classes.displayFlex}>
                      <Paper className={classes.marginCenter}>
                        <Typography className={classes.marginEverything}>
                          Subscribers: <br />
                          {numberConverter(c.statistics.subscriberCount)}
                        </Typography>
                      </Paper>
                      <Paper className={classes.marginCenter}>
                        <Typography className={classes.marginEverything}>
                          Total Videos: <br />
                          {numberConverter(c.statistics.videoCount)}
                        </Typography>
                      </Paper>
                      <Paper className={classes.marginCenter}>
                        <Typography className={classes.marginEverything}>
                          Total Views: <br />
                          {numberConverter(c.statistics.viewCount)}
                        </Typography>
                      </Paper>
                    </div>
                    <Paper
                      color="textSecondary"
                      className={classes.widthCard}
                      elevation={0}
                    >
                      <Typography align="left">
                        {htmlEntities(c.snippet.description)}
                      </Typography>
                    </Paper>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={showVideos}>
                    {show ? 'Hide Videos' : 'Show Videos'}
                  </Button>
                </CardActions>
              </Card>
              {show && (
                <ShowVideo
                  channelId={c.id}
                  channelIcon={c.snippet.thumbnails.high.url}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Channel;
