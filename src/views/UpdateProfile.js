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
  specialOutline: {
    borderColor: 'rgb(0, 0, 0, 0.6) !important',
    borderWidth: 2,
  },
}));

export default function UpdateProfile() {
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const classes = useStyles();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userNameRef.current.value, emailRef.current.value);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(`Passwords do not match`);
    }

    const promises = [];
    setLoading(true);
    setError(``);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.goBack();
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const goBack = () => {
    history.goBack();
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
            Update Profile
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
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                  defaultValue={currentUser.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  variant="outlined"
                  fullWidth
                  label="Password"
                  type="password"
                  inputRef={passwordRef}
                  id="password"
                  placeholder="Leave blank to keep the same"
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
                  placeholder="Leave blank to keep the same"
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
              Update
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Typography
                  onClick={goBack}
                  className={classes.textColor}
                  variant="h5"
                >
                  Cancel
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
