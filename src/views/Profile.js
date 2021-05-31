import React, { useState, useEffect } from 'react';
import AppBarComponent from '../components/AppBarComponent';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../context/AuthContext';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link, useHistory } from 'react-router-dom';
import { database } from '../firebase';

function Profile() {
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [notes, setNotes] = useState([]);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  };

  useEffect(() => {
    database.users
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setUserName(doc.data().userName);
        console.log(doc.data().userName);
      });
  }, []);

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Box>
        <Typography variant="h1">Hi, {userName}! </Typography>
      </Box>
      <Typography>{currentUser.email}</Typography>
      <Link to="/update-profile">
        <Button variant="contained"> Update Profile</Button>
      </Link>
      <Button variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
      {/* <Link to="/favoritechannels">
        <Button variant="contained"> Favorite Channels</Button>
      </Link> */}
      <AppBarComponent />
    </div>
  );
}

export default Profile;
