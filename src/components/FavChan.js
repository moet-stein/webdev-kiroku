import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import DeleteChannel from './DeleteChannel';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  inline: {
    display: 'inline',
  },
}));

const FavChan = ({ channel }) => {
  const classes = useStyles();
  const description =
    channel.description.length > 200
      ? channel.description.slice(0, 200) + '...'
      : channel.description;
  return (
    <React.Fragment>
      <Divider variant="inset" component="li" />
      <Link
        to={`/channel/${channel.channelId}`}
        style={{ textDecoration: 'none' }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={channel.channelName} src={channel.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={channel.channelName}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Total Videos: {channel.totalVideos}
                </Typography>
                <br />
                {description}
                <br />
              </React.Fragment>
            }
          />
        </ListItem>
      </Link>
      <DeleteChannel channel={channel} />
    </React.Fragment>
  );
};

export default FavChan;
