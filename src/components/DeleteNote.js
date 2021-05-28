import React, { useContext, useEffect } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { auth, database, users, favChannels } from '../firebase';
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
  const { notesArr, setNotesArr } = useContext(NotesContext);

  const handleDelete = () => {
    database.users
      .doc(currentUser.uid)
      .collection(note.date)
      .doc(note.noteId)
      .delete()
      .then(() => {
        setNotesArr(notesArr.filter((n) => n.noteId !== note.noteId));
        console.log('successfully deleted it');
        console.log(notesArr);
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
