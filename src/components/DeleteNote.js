import React, { useContext } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase';
import { NotesContext } from '../context/notesContext';

const useStyles = makeStyles(() => ({
  marginTop: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  iconSize: {
    fontSize: '30px',
  },
}));

const DeleteNote = ({ note }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const {
    notesArr,
    setNotesArr,
    setFilteredNotesArr,
    filteredNotesArr,
    datesArr,
    setDatesArr,
  } = useContext(NotesContext);

  const handleDelete = () => {
    database.users
      .doc(currentUser.uid)
      .collection('notes')
      .doc(note.date)
      .collection(`${note.date}notes`)
      .doc(note.noteId)
      .delete()
      .then(() => {
        setFilteredNotesArr(notesArr.filter((n) => n.noteId !== note.noteId));
        setNotesArr(notesArr.filter((n) => n.noteId !== note.noteId));
      })
      .then(() => {
        console.log('successfully deleted it');
        console.log(notesArr, filteredNotesArr);
        database.users
          .doc(currentUser.uid)
          .collection('notes')
          .doc(note.date)
          .collection(`${note.date}notes`)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              database.users
                .doc(currentUser.uid)
                .collection('notes')
                .doc(note.date)
                .delete();
              setDatesArr(datesArr.filter((date) => date !== note.date));
            }
          });
      });
  };
  return (
    <React.Fragment>
      <div className={classes.marginTop}>
        <DeleteForeverIcon
          className={classes.iconSize}
          onClick={handleDelete}
          color="disabled"
        />
      </div>
    </React.Fragment>
  );
};

export default DeleteNote;
