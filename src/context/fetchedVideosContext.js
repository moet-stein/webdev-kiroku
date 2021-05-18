// 1. import the modules
import React, { createContext, useState } from 'react';
// 2. initialize the context
const initFetchedVideosContext = {
  fetchedVideos: [],
  loading: true,
};
// 3. create context
export const FetchedVideosContext = createContext(initFetchedVideosContext);

// 4. make provider => value / children
export const FetchedVideosContextProvider = ({ children }) => {
  const [fetchedVideos, setFetchedVideos] = useState(
    initFetchedVideosContext.fetchedVideos
  );
  const [loading, setLoading] = useState(initFetchedVideosContext.loading);

  return (
    <FetchedVideosContext.Provider
      value={{
        fetchedVideos,
        setFetchedVideos,
        loading,
        setLoading,
      }}
    >
      {children}
    </FetchedVideosContext.Provider>
  );
};
