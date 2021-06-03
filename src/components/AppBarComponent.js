import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 410,
    position: 'fixed',
    height: '40px',
    bottom: 0,
  },
  noPaddingSide: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default function AppBarComponent() {
  const classes = useStyles();
  const location = useLocation();
  const pageLoc = () => {
    if (location.pathname === '/search') return 0;
    if (location.pathname === '/newnotewithoutvideo') return 1;
    if (location.pathname.includes('newnote')) return 1;
    if (location.pathname === '/notes') return 2;
    if (location.pathname === '/favoritechannels') return 3;
  };
  const [value, setValue] = React.useState(pageLoc());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
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
          label="Create"
          component={Link}
          to="/newnotewithoutvideo"
          icon={<CreateIcon />}
        />
        <BottomNavigationAction
          className={classes.noPaddingSide}
          component={Link}
          to="/notes"
          label="Notes"
          icon={<MenuBookIcon />}
        />

        <BottomNavigationAction
          className={classes.noPaddingSide}
          component={Link}
          to="/favoritechannels"
          label="Favorites"
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    </React.Fragment>
  );
}
