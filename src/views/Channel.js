import React, { useState, useEffect, useCallback } from 'react';
import GoBackPage from '../components/GoBackPage';
import AppBarComponent from '../components/AppBarComponent';
import Favorite from '../components/Favorite';
import VisitorAppBar from '../components/VisitorAppBar';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../context/AuthContext';
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
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import ProfileMenu from '../components/ProfileMenu';

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
  const { currentUser } = useAuth();
  const classes = useStyles();
  const [channel, setChannel] = useState([]);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

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
        setError(true);
      }
    };
    fetchChannel();
  }, [error]);

  return (
    <div>
      {currentUser ? (
        <Box display="flex" p={1}>
          <Box flexGrow={1}>
            <GoBackPage />
          </Box>
          <Box p={1}>
            <ProfileMenu />
          </Box>
        </Box>
      ) : (
        <GoBackPage />
      )}

      <Typography variant="h5" color="textSecondary">
        Channel Detail
      </Typography>
      {error && (
        <Typography variant="h2" color="textSecondary">
          Channel Not Found
        </Typography>
      )}
      {!error &&
        channel.length > 0 &&
        channel.map((c) => {
          return (
            <Box mb={8}>
              <div key={c.etag} className={classes.flex}>
                <Card className={classes.firstRoot}>
                  {currentUser && <Favorite channel={c} />}
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
                      image={
                        c.brandingSettings.image
                          ? c.brandingSettings.image.bannerExternalUrl
                          : ''
                      }
                      title="Contemplative Reptile"
                    />
                    <CardContent className={classes.marginEverything}>
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
                  <Box mb={5}>
                    <ShowVideo
                      channelId={c.id}
                      channelIcon={c.snippet.thumbnails.high.url}
                    />
                  </Box>
                )}
              </div>
            </Box>
          );
        })}
      {currentUser ? <AppBarComponent /> : <VisitorAppBar />}
    </div>
  );
};

export default Channel;
