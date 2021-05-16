import './App.css';
import Search from './views/Search';
import Login from './views/Login';
import Channel from './views/Channel';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
        <div className="App">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/channel/:id" children={<Channel />}></Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
