import React, { useState, useEffect, useContext } from 'react';
import FavChan from '../components/FavChan';
import AppBarComponent from '../components/AppBarComponent';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import ProfileMenu from '../components/ProfileMenu';
import { useAuth } from '../context/AuthContext';
import { auth, database, users, favChannels } from '../firebase';
import { FavChansContext } from '../context/favChansContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '360',
    backgroundColor: theme.palette.background.paper,
  },
}));

const FavoriteChannels = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
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
      );
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
      <List className={classes.root}>
        {favChansArr &&
          favChansArr.map((ch) => {
            return <FavChan key={ch.channelId} channel={ch} />;
          })}
      </List>
      <AppBarComponent />
    </React.Fragment>
  );
};

export default FavoriteChannels;
