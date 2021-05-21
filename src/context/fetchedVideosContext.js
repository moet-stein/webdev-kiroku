// 1. import the modules
import React, { createContext, useState } from 'react';
// 2. initialize the context
const initFetchedVideosContext = {
  fetchedVideos: [],
  loading: true,
  fetchAgain: true,
  searchInput: '',
};
// 3. create context
export const FetchedVideosContext = createContext(initFetchedVideosContext);

// 4. make provider => value / children
export const FetchedVideosContextProvider = ({ children }) => {
  const [fetchedVideos, setFetchedVideos] = useState(
    initFetchedVideosContext.fetchedVideos
  );
  const [loading, setLoading] = useState(initFetchedVideosContext.loading);
  const [fetchAgain, setFetchAgain] = useState(
    initFetchedVideosContext.fetchAgain
  );
  const [searchInput, setSearchInput] = useState(
    initFetchedVideosContext.searchInput
  );

  // const isFetchAgain = () => {
  //   fetchedVideos.length === 0 || searchInput === ''
  //     ? setFetchAgain(true)
  //     : setFetchAgain(false);
  // };
  // isFetchAgain();
  return (
    <FetchedVideosContext.Provider
      value={{
        fetchedVideos,
        setFetchedVideos,
        loading,
        setLoading,
        searchInput,
        setSearchInput,
        fetchAgain,
        setFetchAgain,
      }}
    >
      {children}
    </FetchedVideosContext.Provider>
  );
};
