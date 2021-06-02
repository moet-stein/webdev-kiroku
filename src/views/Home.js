import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Image from '../img/home_pic.png';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { makeStyles } from '@material-ui/core/styles';
// import {  white } from '@material-ui/core/colors';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  background: {
    background: ` linear-gradient(
      rgba(0, 0, 0, 0.45), 
      rgba(0, 0, 0, 0.45)
    ),url(${Image})`,
    backgroundSize: 'cover',
    height: '100vh',
    color: '#f5f5f5',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: theme.spacing(17),
  },
  button: {
    color: 'black',
    fontSize: '30px',
    width: '150px',
  },
  white: {
    color: '#f5f5f5',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Box className={classes.background}>
      <Typography variant="h1">KIROKU</Typography>
      <Typography variant="h4">Youtube ✖️ Note APP</Typography>
      <Box className={classes.buttons}>
        <Box m={2}>
          <Link to={'/login'} style={{ textDecoration: 'none' }}>
            <Button size="large" variant="contained" className={classes.button}>
              LOGIN
            </Button>
          </Link>
        </Box>
        <Box m={2}>
          <Link to={'/signup'} style={{ textDecoration: 'none' }}>
            <Button size="large" variant="contained" className={classes.button}>
              SIGNUP
            </Button>
          </Link>
        </Box>
        <Box m={3}>
          <Link to={'/search'} style={{ textDecoration: 'none' }}>
            <Typography className={classes.white}>
              {' '}
              <EmojiPeopleIcon />
              See as a visitor
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
export default Home;
