import React, { useState, useEffect } from 'react';
import teal from '@material-ui/core/colors/teal';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase';
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  marginPositionRight: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    color: '#fff',
    backgroundColor: ' #008B8B',
    marginRight: theme.spacing(2),
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  white: {
    color: '#fff',
  },
  teal: {
    color: teal[600],
  },
}));

const ProfileMenu = () => {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const [userName, setUserName] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <div className={classes.marginPositionRight}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar className={classes.avatar}>{userName[0]}</Avatar>
        {location.pathname === '/search' ? (
          <Typography variant="body2" className={classes.white}>
            {' '}
            Hi, {userName}
          </Typography>
        ) : (
          <Typography className={classes.teal}> Hi, {userName}</Typography>
        )}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <Link
          to="/update-profile"
          style={{ textDecoration: 'none' }}
          color="#000"
        >
          <MenuItem>Update Account</MenuItem>
        </Link> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
