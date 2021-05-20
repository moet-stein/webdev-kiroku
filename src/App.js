import './App.css';
import Search from './views/Search';
import Login from './views/Login';
import Notes from './views/Notes';
import Channel from './views/Channel';
import NewNote from './views/NewNote';
import FavoriteChannels from './views/FavoriteChannels';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { VideoForNewNoteContextProvider } from './context/videoForNewNoteContext';
import { FetchedVideosContextProvider } from './context/fetchedVideosContext';
import { SearchInputContextProvider } from './context/searchInputContext';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SearchInputContextProvider>
        <FetchedVideosContextProvider>
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/favoritechannels">
                  <FavoriteChannels />
                </Route>

                {/* <FetchedVideosContextProvider> */}
                {/* <VideoForNewNoteContextProvider> */}

                <Route exact path="/search">
                  <Search />
                </Route>

                <Route exact path="/notes">
                  <Notes />
                </Route>

                <Route exact path="/channel/:id" children={<Channel />}></Route>
                <Route exact path="/newnote/:id" children={<NewNote />}></Route>
                {/* </VideoForNewNoteContextProvider> */}
                {/* </FetchedVideosContextProvider> */}
              </Switch>
            </div>
          </Router>
        </FetchedVideosContextProvider>
      </SearchInputContextProvider>
    </ThemeProvider>
  );
}

export default App;
