import React, { useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { yellow, green, pink, blue, lightBlue } from '@material-ui/core/colors';
import { NotesContext } from '../context/notesContext';
import DeleteNote from './DeleteNote';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { database, notes } from '../firebase';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === 'work') {
        return yellow[700];
      }
      if (note.category === 'money') {
        return green[500];
      }
      if (note.category === 'todos') {
        return pink[700];
      }
      return blue[500];
    },
  },
  title: { color: lightBlue[800] },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    width: '180px',
    transition: 'all .25s linear',
    boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.4)',
    '&:hover , &:active': { boxShadow: ' -1px 10px 29px 0px rgba(0,0,0,0.8)' },
  },
  headerWidth: {
    width: '120px',
  },
  marginChip: {
    margin: '5px',
  },
});

export default function NoteCard({ note }) {
  const classes = useStyles();
  const { notesArr, setNotesArr } = useContext(NotesContext);
  const { currentUser } = useAuth();
  const uesrDatesNotesRef = database.users.doc(currentUser.uid);

  useEffect(() => {
    uesrDatesNotesRef
      .collection('tempnote')
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
  }, []);

  const details =
    note.details.length > 100
      ? note.details.slice(0, 100) + '...'
      : note.details;

  return (
    <div>
      <Link
        to={`/notedetail/${note.date}/${note.noteId}`}
        style={{ textDecoration: 'none' }}
      >
        <Card className={classes.card} elevation={1}>
          <Box mt={2}>
            <Typography variant="h6" className={classes.title}>
              {note.title}
            </Typography>
          </Box>
          <CardContent>
            {note.thumbnail.length > 0 && (
              <CardMedia
                className={classes.media}
                image={note.thumbnail}
                title={note.title}
              />
            )}
            <Typography variant="body2" color="textSecondary">
              {details}
            </Typography>
          </CardContent>
          <div>
            {note.categories.length > 0 &&
              note.categories.map((category) => {
                return (
                  <Chip
                    className={classes.marginChip}
                    label={category}
                    variant="outlined"
                    color="primary"
                    key={category}
                  />
                );
              })}
          </div>
          <DeleteNote note={note} />
        </Card>
      </Link>
    </div>
  );
}
