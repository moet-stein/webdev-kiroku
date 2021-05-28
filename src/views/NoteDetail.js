import React, { useContext, useState, useEffect } from 'react';
import GoBackPage from '../components/GoBackPage';
import { useAuth } from '../context/AuthContext';
import { firestore, database, users, datesNotes } from '../firebase';
import { NotesContext } from '../context/notesContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

export default function NoteDetail(props) {
  const { notesArr, setNotesArr } = useContext(NotesContext);
  const { id } = useParams();
  const [noteForDetail, setNoteForDetail] = useState([]);
  const { currentUser } = useAuth();
  const uesrDatesNotesRef = database.users.doc(currentUser.uid);

  //    get note data from firestore
  useEffect(() => {
    uesrDatesNotesRef
      .collection('tempnote')
      .doc(id)
      .get()
      .then((doc) => {
        setNoteForDetail(doc.data().note);
      });
  }, []);

  console.log(notesArr);
  console.log(noteForDetail);
  return (
    <div>
      <GoBackPage />
      <h2>{noteForDetail.title}</h2>
    </div>
  );
}
