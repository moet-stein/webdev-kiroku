import React, { useRef, useState } from 'react';
import Image from '../img/home_pic.png';
import Avatar from '@material-ui/core/Avatar';
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
import { Link } from 'react-router-dom';

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
  specialOutline: {
    borderColor: 'rgb(0, 0, 0, 0.6) !important',
    borderWidth: 2,
  },
}));

export default function ForgotPassword() {
  const emailRef = useRef();
  const classes = useStyles();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setError(``);
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch (e) {
      console.log(e);
      setError(`Failed to reset password`);
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
            Password Reset
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={loading}
            >
              Reset Password
            </Button>
            <Grid container direction="column" alignItems="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  variant="body2"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography className={classes.textColor} variant="h6">
                    {' '}
                    Log in
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="/signup"
                  variant="body2"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography className={classes.textColor} variant="h6">
                    {' '}
                    Need an account? Sign up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
