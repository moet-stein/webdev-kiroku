import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';
import moduleClasses from './NoteDate.module.css';
import { NotesContext } from '../context/notesContext';
import { useAuth } from '../context/AuthContext';
import { firestore, database, users, datesNotes } from '../firebase';
import { blueGrey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100vw',
    // maxWidth: 380,
    backgroundColor: theme.palette.background.paper,
  },
  grey: {
    color: blueGrey[700],
  },
  marginSide: {
    width: '100vw',
    // maxWidth: '330px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const NoteDate = ({ date }) => {
  const { currentUser } = useAuth();
  const {
    notesArr,
    setNotesArr,
    filteredNotesArr,
    setFilteredNotesArr,
  } = useContext(NotesContext);
  const classes = useStyles();

  useEffect(() => {
    setNotesArr([]);
    database.users
      .doc(currentUser.uid)
      .collection('notes')
      .doc(date)
      .collection(`${date}notes`)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          setNotesArr((oldArr) => [...oldArr, doc.data()]);
          setFilteredNotesArr((oldArr) => [...oldArr, doc.data()]);
          // const notesForDate = doc.data().filter((d) => d.date === date);
          console.log(doc.data());
        })
      );
  }, []);

  const breakpoints = {
    default: 3,
    1100: 5,
    700: 4,
  };

  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="h6" className={classes.grey}>
                {date}
              </Typography>
            }
          />
        </ListItem>
        <Divider component="li" variant="inset" />
      </List>
      {/* <div className={classes.marginSide}> */}
      {/* <Masonry
        breakpointCols={+breakpoints}
        className={moduleClasses.myMasonryGrid}
        columnClassName={moduleClasses.myMasonryGridColumn}
      > */}
      <Grid container>
        {filteredNotesArr.length > 0 &&
          filteredNotesArr.map((note) => {
            return (
              <Grid item xs={6} sm={3} md={2}>
                <NoteCard key={note.noteId} note={note} />{' '}
              </Grid>
            );
          })}
      </Grid>

      {/* </Masonry> */}
      {/* </div> */}
    </div>
  );
};

export default NoteDate;
