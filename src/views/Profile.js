import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../context/AuthContext';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';

function Profile() {
  const [error, setError] = useState('');
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
  return (
    <div>
      Dashboard
      {error && <Alert severity="error">{error}</Alert>}
      <Typography>{currentUser.email}</Typography>
      <Link to="/update-profile">
        <Button variant="contained"> Update Profile</Button>
      </Link>
      <Button variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
      <Link to="/favoritechannels">
        <Button variant="contained"> Favorite Channels</Button>
      </Link>
    </div>
  );
}

export default Profile;
