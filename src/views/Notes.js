import React, { useEffect, useContext, useState } from 'react';
import AppBarComponent from '../components/AppBarComponent';
import ProfileMenu from '../components/ProfileMenu';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../components/SearchBar';
import NoteDate from '../components/NoteDate';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useAuth } from '../context/AuthContext';
import { firestore, database, users, datesNotes } from '../firebase';
import { NotesContext } from '../context/notesContext';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const Notes = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { notesArr, setNotesArr } = useContext(NotesContext);
  const [datesArr, setDatesArr] = useState([]);

  const getDates = async () => {
    console.log(currentUser.uid);
    try {
      const snapshot = await database.users
        .doc(currentUser.uid)
        .collection('notes')
        .get()
        .then((querySnapshot) =>
          querySnapshot.forEach((doc) => {
            console.log(doc.data().date);
            // setNotesArr((oldArr) => [...oldArr, doc.data().date]);
            setDatesArr((oldArr) => [...oldArr, doc.data().date]);
          })
        );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    setNotesArr([]);
    getDates();
  }, []);

  return (
    <div className={classes.root}>
      <Box display="flex" p={1}>
        <Box flexGrow={1} mt={3}>
          <Typography variant="h5">User's Notes</Typography>
        </Box>
        <Box p={1}>
          <ProfileMenu />
        </Box>
      </Box>
      <SearchBar />
      {datesArr.length > 0 &&
        datesArr.map((d) => {
          return <NoteDate key={d} date={d} />;
        })}
      <AppBarComponent />
    </div>
  );
};

export default Notes;
