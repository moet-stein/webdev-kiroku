import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
  },
  noPaddingSide: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  paper: {
    height: '20px',
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
    <React.Fragment>
      <Paper elevation={0} className={classes.paper}></Paper>
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
    </React.Fragment>
  );
}
