import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 400,
    position: 'fixed',
    bottom: 0,
  },
  noPaddingSide: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default function AppBar() {
  const classes = useStyles();
  const location = useLocation();
  const pageLoc = () => {
    if (location.pathname === '/search') return 0;
  };
  const [value, setValue] = React.useState(pageLoc());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        className={classes.noPaddingSide}
        component={Link}
        to="/search"
        label="Search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        className={classes.noPaddingSide}
        label="Login"
        component={Link}
        to="/login"
        icon={<ExitToAppIcon />}
      />
    </BottomNavigation>
  );
}
