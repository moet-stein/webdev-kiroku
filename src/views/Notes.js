import React, { useEffect, useContext, useState } from 'react';
import FilterNotes from '../components/FilterNotes';
import Loading from '../img/loading.gif';
import AppBarComponent from '../components/AppBarComponent';
import ProfileMenu from '../components/ProfileMenu';
import Typography from '@material-ui/core/Typography';
import NoteDate from '../components/NoteDate';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import { useAuth } from '../context/AuthContext';
import { firestore, database, users, datesNotes } from '../firebase';
import { NotesContext } from '../context/notesContext';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
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

const Notes = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const {
    notesArr,
    setNotesArr,
    setFilteredNotesArr,
    datesArr,
    setDatesArr,
  } = useContext(NotesContext);
  // const [datesArr, setDatesArr] = useState([]);

  const getDates = async () => {
    console.log(currentUser.uid);
    setNotesArr([]);
    setDatesArr([]);
    setFilteredNotesArr([]);
    try {
      // const deleteEmptyDates = await database.users
      //   .doc(currentUser.uid)
      //   .collection('notes')
      //   .get()
      // .then((query))
      const snapshot = await database.users
        .doc(currentUser.uid)
        .collection('notes')
        .get()
        .then((querySnapshot) =>
          querySnapshot.forEach((doc) => {
            console.log(doc.data().date);
            // setNotesArr((oldArr) => [...oldArr, doc.data().date]);
            setDatesArr((oldArr) =>
              [...oldArr, doc.data().date].sort(
                (a, b) => Date.parse(b) - Date.parse(a)
              )
            );
          })
        )
        .then(() => setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDates();
    database.users
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setUserName(doc.data().userName);
      });
    console.log(datesArr);
  }, []);

  return (
    <div className={classes.root}>
      <Box display="flex" p={1}>
        <Box flexGrow={1} mt={3}>
          <Typography variant="h5" color="textSecondary">
            {userName}'s Notes
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
      {!loading && datesArr.length > 0 && (
        <Box mb={5}>
          <FilterNotes />
          {datesArr.map((d) => (
            <NoteDate key={d} date={d} />
          ))}
        </Box>
      )}
      {!loading && datesArr.length === 0 && (
        <Box>
          <Box mt={7}>
            <Typography variant="h3" className={classes.fontColor}>
              No notes yet
            </Typography>
          </Box>
          <Box mt={6}>
            <Typography variant="h6">
              Search for a video to make a note?
            </Typography>
            <IconButton href="/search">
              <SearchIcon className={classes.largeIcon} />
            </IconButton>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">
              Or make a note without a video?
            </Typography>
            <IconButton href="/newnotewithoutvideo">
              <CreateIcon className={classes.largeIcon} />
            </IconButton>
          </Box>
        </Box>
      )}

      <AppBarComponent />
    </div>
  );
};

export default Notes;
