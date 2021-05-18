// 1. import the modules
import React, { createContext, useState } from 'react';
// 2. initialize the context
const initSearchInputContext = {
  searchInput: '',
};
// 3. create context
export const SearchInputContext = createContext(initSearchInputContext);

// 4. make provider => value / children
export const SearchInputContextProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState(
    initSearchInputContext.searchInput
  );

  return (
    <SearchInputContext.Provider
      value={{
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </SearchInputContext.Provider>
  );
};
