import React, { useRef, useState } from 'react';
import Image from '../img/home_pic.png';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Button from '@material-ui/core/Button';
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
    // marginTop: theme.spacing(8),
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
  flex: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  textColor: {
    color: '#008B8B',
    marginBottom: '10px',
  },
  // white: { color: '#f5f5f5 !important', borderColor: '#f5f5f5 !important' },
  specialOutline: {
    borderColor: 'rgb(0, 0, 0, 0.6) !important',
    borderWidth: 2,
  },
}));

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const classes = useStyles();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(``);
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/notes');
    } catch (e) {
      console.log(e);
      setError(`Failed to log in`);
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
            Log In
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  // InputLabelProps={{ className: classes.white }}
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={loading}
            >
              Log In
            </Button>
            <Grid container direction="column" alignItems="flex-end">
              <Grid item>
                <Link
                  to="/signup"
                  style={{ textDecoration: 'none' }}
                  variant="body1"
                >
                  <Typography className={classes.textColor} variant="h6">
                    {' '}
                    Need an account? Sign up
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="/forgot-password"
                  style={{ textDecoration: 'none' }}
                  variant="body2"
                >
                  <Typography className={classes.textColor} variant="h6">
                    {' '}
                    Forgot password?
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
