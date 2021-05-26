// 1. import the modules
import React, { createContext, useState } from 'react';
// 2. initialize the context
const initfavChansContext = {
  favChansArr: [],
};
// 3. create context
export const FavChansContext = createContext(initfavChansContext);

// 4. make provider => value / children
export const FavChansContextProvider = ({ children }) => {
  const [favChansArr, setFavChansArr] = useState(initfavChansContext.favChans);

  return (
    <FavChansContext.Provider
      value={{
        favChansArr,
        setFavChansArr,
      }}
    >
      {children}
    </FavChansContext.Provider>
  );
};
