import React from 'react';
import AppBarComponent from '../components/AppBarComponent';
import ProfileMenu from '../components/ProfileMenu';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../components/SearchBar';
import NoteDate from '../components/NoteDate';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const Notes = () => {
  const classes = useStyles();
  const dates = ['May 19, 2021', 'May 18, 2021', 'May 17, 2021', 'May 16 2021'];
  return (
    <React.Fragment className={classes.root}>
      <Box display="flex" p={1}>
        <Box flexGrow={1} mt={3}>
          <Typography variant="h5">User's Notes</Typography>
        </Box>
        <Box p={1}>
          <ProfileMenu />
        </Box>
      </Box>
      <SearchBar />
      {dates.map((date) => (
        <NoteDate date={date} />
      ))}
      <AppBarComponent />
    </React.Fragment>
  );
};

export default Notes;
