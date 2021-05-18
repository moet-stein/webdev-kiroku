// 1. import the modules
import React, { createContext, useState } from 'react';
// 2. initialize the context
const initVideoForNewNoteContext = {
  videoForNewNote: [],
};
// 3. create context
export const VideoForNewNoteContext = createContext(initVideoForNewNoteContext);

// 4. make provider => value / children
export const VideoForNewNoteContextProvider = ({ children }) => {
  const [videoForNewNote, setVideoForNewNote] = useState(
    initVideoForNewNoteContext.video
  );

  const clearVideoForNewNote = () => {
    setVideoForNewNote([]);
  };
  return (
    <VideoForNewNoteContext.Provider
      value={{
        videoForNewNote,
        setVideoForNewNote,
        clearVideoForNewNote,
      }}
    >
      {children}
    </VideoForNewNoteContext.Provider>
  );
};
