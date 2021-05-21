import React from 'react';
import AppBar from '../components/AppBar';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../components/SearchBar';
import NoteDate from '../components/NoteDate';

const Notes = () => {
  const dates = ['May 19, 2021', 'May 18, 2021', 'May 17, 2021', 'May 16 2021'];
  return (
    <React.Fragment>
      <Typography>User's Notes</Typography>
      <SearchBar />
      {dates.map((date) => (
        <NoteDate date={date} />
      ))}
      <AppBar />
    </React.Fragment>
  );
};

export default Notes;
