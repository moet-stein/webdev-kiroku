import React, { useRef, useState } from 'react';
import Image from '../img/home_pic.png';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../context/AuthContext';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  background: {
    background: ` linear-gradient(
      rgba(255, 255, 255, 0.7), 
      rgba(255, 255, 255, 0.7)
    ),url(${Image})`,
    backgroundSize: 'cover',
    height: '100vh',
    // color: '#f5f5f5',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(10),
    backgroundColor: '#008B8B',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#008B8B',
    color: 'white',
    fontSize: '20px',
  },
  textColor: {
    color: '#008B8B',
    marginBottom: '10px',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  specialOutline: {
    borderColor: 'rgb(0, 0, 0, 0.6) !important',
    borderWidth: 2,
  },
}));

export default function Signup() {
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const classes = useStyles();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userNameRef.current.value, emailRef.current.value);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(`Passwords do not match`);
    }

    try {
      setError(``);
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        userNameRef.current.value
      );
      history.push('/notes');
    } catch (e) {
      console.log(e);
      setError(`${e}, Failed to create an account`);
    }
    setLoading(false);
  };

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  autoComplete="uname"
                  name="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  inputRef={userNameRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  inputRef={passwordRef}
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password-confirm"
                  label="Password Confirmation"
                  type="password"
                  inputRef={passwordConfirmRef}
                  id="passwordConfirm"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={loading}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  variant="body2"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography className={classes.textColor} variant="h6">
                    {' '}
                    Already have an account? Log in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
          <Link
            to="/search"
            className={classes.flex}
            style={{ textDecoration: 'none' }}
          >
            <Avatar className={classes.avatar}>
              <EmojiPeopleIcon />
            </Avatar>
            <Box mt={10} ml={1}>
              <Typography className={classes.textColor} variant="h6">
                See as a visitor
              </Typography>
            </Box>
          </Link>
        </div>
      </Container>
    </div>
  );
}
