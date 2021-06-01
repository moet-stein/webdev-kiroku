import React, { useContext, useState } from 'react';
import { NotesContext } from '../context/notesContext';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function FilterNotes() {
  const [query, setQuery] = useState('');
  const { notesArr, setFilteredNotesArr } = useContext(NotesContext);

  const onKeyPressed = (e) => {
    query === 0
      ? setFilteredNotesArr([...notesArr])
      : setFilteredNotesArr(
          notesArr.filter(
            (note) =>
              note.categories.filter((category) => category.includes(query))
                .length > 0
          )
        );
    // if (e.key === 'Enter') {
    //   e.target.value.length === 0
    //     ? setFilteredNotesArr([...notesArr])
    //     : setFilteredNotesArr(
    //         notesArr.filter(
    //           (note) =>
    //             note.categories.filter((category) =>
    //               category.includes(e.target.value)
    //             ).length > 0
    //         )
    //       );
    // } else {
    //   query === 0
    //     ? setFilteredNotesArr([...notesArr])
    //     : setFilteredNotesArr(
    //         notesArr.filter(
    //           (note) =>
    //             note.categories.filter((category) => category.includes(query))
    //               .length > 0
    //         )
    //       );
    // }
  };

  return (
    <div>
      <TextField
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={onKeyPressed}
        id="standard-basic"
        label="Find by Categories"
      />
    </div>
  );
}
