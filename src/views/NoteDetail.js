import React, { useContext, useState, useEffect } from 'react';
import AppBarComponent from '../components/AppBarComponent';
import Modal from '../components/Modal';
import ProfileMenu from '../components/ProfileMenu';
import GoBackPage from '../components/GoBackPage';
import { useAuth } from '../context/AuthContext';
import { firestore, database, users, datesNotes } from '../firebase';
import { NotesContext } from '../context/notesContext';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '40px',
  },
  media: {
    height: 140,
  },
  marginChip: {
    margin: '5px',
  },
  overlay: {
    position: 'absolute',
    top: '5%',
    left: '35%',
    color: 'black',
  },
});

export default function NoteDetail(props) {
  const classes = useStyles();
  const { notesArr, setNotesArr } = useContext(NotesContext);
  const [readyToShow, setReadyToShow] = useState(false);
  const { date, id } = useParams();
  const [noteForDetail, setNoteForDetail] = useState();
  const { currentUser } = useAuth();
  const uesrDatesNotesRef = database.users.doc(currentUser.uid);

  //    get note data from firestore
  useEffect(async () => {
    if (notesArr.length > 0) {
      const targetNote = notesArr.find((n) => n.noteId === id);
      setNoteForDetail(targetNote);
      setReadyToShow(true);
    } else {
      uesrDatesNotesRef
        .collection('notes')
        .doc(date)
        .collection(`${date}notes`)
        .doc(id)
        .get()
        .then((doc) => {
          setNoteForDetail(doc.data());
          console.log(doc.data());
        })
        .then(() => setReadyToShow(true))
        .catch((e) => console.log('error: ', e));
    }
    console.log(notesArr, notesArr.length > 0);
    // const getNote = await uesrDatesNotesRef
    //   .collection('tempnote')
    //   .doc(id)
    //   .get()
    //   .then((doc) => {
    //     setNoteForDetail(doc.data());
    //     console.log(doc.data());
    //   })
    //   .catch((e) => console.log('error: ', e));
    // const show = await setReadyToShow(true);
  }, []);

  console.log(readyToShow);
  console.log(noteForDetail);
  return (
    <div>
      {readyToShow ? (
        <div>
          <Box p={1} display="flex">
            <Box flexGrow={1}>
              <GoBackPage />
            </Box>
            <Box p={1}>
              <ProfileMenu />
            </Box>
          </Box>
          <div>
            <h2>{noteForDetail.title}</h2>
          </div>
          <Card className={classes.root}>
            <CardActionArea>
              {noteForDetail.thumbnail.length > 0 && (
                <div>
                  <CardMedia
                    className={classes.media}
                    image={noteForDetail.thumbnail}
                    title={noteForDetail.title}
                  />
                  <div className={classes.overlay}>
                    <Modal video={noteForDetail} />
                  </div>
                </div>
              )}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="textSecondary"
                  component="h2"
                >
                  {noteForDetail.date}
                </Typography>
                <Typography variant="body1" component="p">
                  {noteForDetail.details}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                target="_blank"
                href={noteForDetail.url}
              >
                {noteForDetail.thumbnail.length === 0 && (
                  <Typography>Link: {noteForDetail.url}</Typography>
                )}
              </Button>
            </CardActions>
            {noteForDetail.categories.length > 0 &&
              noteForDetail.categories.map((category) => {
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
          </Card>
          <AppBarComponent />
        </div>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
}
