// 1. import the modules
import React, { createContext, useState } from 'react';
// 2. initialize the context
const initnotesContext = {
  notesArr: [],
  uniDatesArr: [],
  filteredNotesArr: [],
};
// 3. create context
export const NotesContext = createContext(initnotesContext);

// 4. make provider => value / children
export const NotesContextProvider = ({ children }) => {
  const [notesArr, setNotesArr] = useState(initnotesContext.notesArr);
  const [uniDatesArr, setUniDatesArr] = useState(initnotesContext.uniDatesArr);
  const [filteredNotesArr, setFilteredNotesArr] = useState(
    initnotesContext.filteredNotesArr
  );

  return (
    <NotesContext.Provider
      value={{
        notesArr,
        setNotesArr,
        uniDatesArr,
        setUniDatesArr,
        filteredNotesArr,
        setFilteredNotesArr,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
