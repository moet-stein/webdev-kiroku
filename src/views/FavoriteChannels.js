import React, { useState, useEffect, useContext } from 'react';
import Loading from '../img/loading.gif';
import FavChan from '../components/FavChan';
import AppBarComponent from '../components/AppBarComponent';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import ProfileMenu from '../components/ProfileMenu';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useAuth } from '../context/AuthContext';
import { auth, database, users, favChannels } from '../firebase';
import { FavChansContext } from '../context/favChansContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '360',
    backgroundColor: theme.palette.background.paper,
  },
  largeIcon: {
    width: 100,
    height: 100,
    color: '#a2d895',
  },
  fontColor: {
    color: '#008B8B',
  },
}));

const FavoriteChannels = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const { favChansArr, setFavChansArr } = useContext(FavChansContext);

  useEffect(() => {
    // setFavChans([]);
    setFavChansArr([]);
    database.favChannels
      .where('userId', '==', currentUser.uid)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          // setFavChans((oldArr) => [...oldArr, doc.data()]);
          setFavChansArr((oldArr) => [...oldArr, doc.data()]);
        })
      )
      .then(() => setLoading(false));
  }, []);

  return (
    <React.Fragment>
      <Box display="flex" p={1}>
        <Box flexGrow={1} mt={3}>
          <Typography variant="h5" color="textSecondary">
            Favorite Channels
          </Typography>
        </Box>
        <Box p={1}>
          <ProfileMenu />
        </Box>
      </Box>
      {loading && (
        <Box mt={15}>
          <img src={Loading} />
        </Box>
      )}
      <List className={classes.root}>
        {!loading &&
          favChansArr &&
          favChansArr.map((ch) => {
            return <FavChan key={ch.channelId} channel={ch} />;
          })}
      </List>
      {!loading && favChansArr.length === 0 && (
        <Box>
          <Box mt={7}>
            <Typography variant="h3" className={classes.fontColor}>
              No favorite channels yet
            </Typography>
          </Box>
          <Box mt={6}>
            <Typography variant="h6">
              Search for a video to find a favorite channel?
            </Typography>
            <IconButton href="/search">
              <SearchIcon className={classes.largeIcon} />
            </IconButton>
          </Box>
        </Box>
      )}
      <AppBarComponent />
    </React.Fragment>
  );
};

export default FavoriteChannels;
