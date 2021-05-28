import React, { useContext, useEffect } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { auth, database, users, favChannels } from '../firebase';
import { FavChansContext } from '../context/favChansContext';
import { BrowserRouter as useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  marginTop: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  iconSize: {
    fontSize: '30px',
  },
}));

const DeleteChannel = ({ channel }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const favChanId = channel.channelId + currentUser.uid;
  const { favChansArr, setFavChansArr } = useContext(FavChansContext);

  const handleDelete = () => {
    database.favChannels
      .doc(favChanId)
      .delete()
      .then(() => {
        setFavChansArr(
          favChansArr.filter((ch) => ch.channelId !== channel.channelId)
        );
        console.log('successfully deleted it');
        console.log(favChansArr);
      });
  };
  return (
    <React.Fragment>
      <div className={classes.marginTop}>
        <DeleteForeverIcon
          className={classes.iconSize}
          onClick={handleDelete}
          color="disabled"
        />
      </div>
    </React.Fragment>
  );
};

export default DeleteChannel;
