import React, { useContext } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase';
import { FavChansContext } from '../context/favChansContext';

const useStyles = makeStyles(() => ({
  marginTop: {
    marginRight: '25px',
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
