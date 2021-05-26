import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { grey, red } from '@material-ui/core/colors';
import { useAuth } from '../context/AuthContext';
import { auth, database, users, favChannels } from '../firebase';

const Favorite = ({ channel }) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const [added, setAdded] = useState(false);
  const [heartColor, setHeartColor] = useState('grey');
  const favChanId = channel.id + currentUser.uid;

  useEffect(async () => {
    // I want to show red heart if there is a channel that has the id of the channel id + userid in database
    const docRef = database.favChannels.doc(favChanId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setHeartColor('red');
          setAdded(true);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

  const toggleFavorite = () => {
    if (!added) {
      database.favChannels.doc(favChanId).set({
        userId: currentUser.uid,
        channelId: channel.id,
        channelName: channel.snippet.title,
        description: channel.snippet.description,
        avatar: channel.snippet.thumbnails.high.url,
        totalVideos: channel.statistics.videoCount,
      });
      setAdded(true);
      setHeartColor('red');
    } else {
      database.favChannels
        .doc(favChanId)
        .delete()
        .then(() => console.log('successfully deleted it'));
      setAdded(false);
      setHeartColor('grey');
    }
  };
  return (
    <React.Fragment>
      <IconButton onClick={toggleFavorite} aria-label="add to favorites">
        <FavoriteIcon fontSize="large" style={{ color: heartColor }} />
      </IconButton>
    </React.Fragment>
  );
};

export default Favorite;
