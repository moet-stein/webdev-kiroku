import React from 'react';
import ConfirmImg from '../img/confirm.png';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import indigo from '@material-ui/core/colors/indigo';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  confirm: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F5FF;',
  },
  imgSize: {
    width: '350px',
  },
  fontColor: {
    color: indigo[600],
  },
}));

export default function ConfirmNewNote() {
  const classes = useStyles();
  return (
    <Box className={classes.confirm}>
      <Box>
        <Typography variant="h3" className={classes.fontColor}>
          You made a new note!
        </Typography>
      </Box>
      <img className={classes.imgSize} src={ConfirmImg} />
      <Box mt={3}>
        <Link to="/notes" style={{ textDecoration: 'none' }}>
          <Button
            size="large"
            variant="contained"
            className={classes.fontColor}
          >
            <Typography variant="h5">Notes</Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
