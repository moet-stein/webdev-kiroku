import React, { useContext, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../context/AuthContext';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import teal from '@material-ui/core/colors/teal';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { FetchedVideosContext } from '../context/fetchedVideosContext';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    width: '100vw',
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolColor: { backgroundColor: teal[800] },
}));

const SearchBar = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const { searchInput, setSearchInput, setFetchAgain } = useContext(
    FetchedVideosContext
  );

  const [query, setQuery] = useState('');
  const onKeyPressed = (e) => {
    if (e.key === 'Enter') {
      setSearchInput(e.target.value);
      setFetchAgain(true);
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.toolColor}>
        <Box display="flex" justifyContent="center">
          <Toolbar>
            {/* <Typography className={classes.title} variant="h3" noWrap>
              KIROKU
            </Typography> */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyPressed}
                tabIndex="0"
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {currentUser && (
              <Box mr={2}>
                <ProfileMenu />
              </Box>
            )}
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
};

export default SearchBar;
