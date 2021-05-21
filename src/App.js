import Search from './views/Search';
import Dashboard from './views/Dashboard';
import UpdateProfile from './views/UpdateProfile';
import Signup from './views/Signup';
import Login from './views/Login';
import ForgotPassword from './views/ForgotPassword';
import Notes from './views/Notes';
import Channel from './views/Channel';
import NewNote from './views/NewNote';
import NewNoteWithoutVideo from './views/NewNoteWithoutVideo';
import FavoriteChannels from './views/FavoriteChannels';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { VideoForNewNoteContextProvider } from './context/videoForNewNoteContext';
import { FetchedVideosContextProvider } from './context/fetchedVideosContext';
import { SearchInputContextProvider } from './context/searchInputContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

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
      <Router>
        <AuthProvider>
          <SearchInputContextProvider>
            <FetchedVideosContextProvider>
              <div className="App">
                <Switch>
                  {/* PRivate route is only for users who are logged in */}
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/update-profile"
                    component={UpdateProfile}
                  />
                  <Route exact path="/signup" children={<Signup />} />
                  <Route exact path="/login" children={<Login />} />
                  <Route path="/forgot-password" component={ForgotPassword} />

                  <PrivateRoute
                    exact
                    path="/favoritechannels"
                    component={FavoriteChannels}
                  />

                  <PrivateRoute
                    exact
                    path="/newnotewithoutvideo"
                    component={NewNoteWithoutVideo}
                  />

                  {/* <FetchedVideosContextProvider> */}
                  <VideoForNewNoteContextProvider>
                    <Route exact path="/search" component={Search} />

                    <PrivateRoute exact path="/notes" component={Notes} />

                    <Route exact path="/channel/:id" component={Channel} />
                    <PrivateRoute
                      exact
                      path="/newnote/:id"
                      component={NewNote}
                    />
                  </VideoForNewNoteContextProvider>
                  {/* </FetchedVideosContextProvider> */}
                </Switch>
              </div>
            </FetchedVideosContextProvider>
          </SearchInputContextProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
