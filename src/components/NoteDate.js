import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';
import moduleClasses from './NoteDate.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: theme.palette.background.paper,
  },
  marginSide: {
    width: '100%',
    maxWidth: '330px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const NoteDate = ({ date }) => {
  const notes = [
    {
      title: "Yoshi's birthday bash",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      category: 'reminders',
      id: 1,
      date: 'May 19, 2021',
    },
    {
      title: 'Complete my ninja training',
      details: 'Lorem Ipsum is simply dummy ',
      category: 'work',
      id: 2,
      date: 'May 17, 2021',
    },
    {
      title: 'Order a pizza!',
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      category: 'todos',
      id: 3,
      date: 'May 17, 2021',
    },
    {
      title: "Mario's Birthday",
      details: 'Buy Presents for Mario',
      category: 'todos',
      id: 4,
      date: 'May 16, 2021',
    },
    {
      title: "Yoshi's birthday bash",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      category: 'reminders',
      id: 1,
      date: 'May 19, 2021',
    },
    {
      title: 'Complete my ninja training',
      details: 'Lorem Ipsum is simply dummy ',
      category: 'work',
      id: 2,
      date: 'May 17, 2021',
    },
    {
      title: 'Order a pizza!',
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      category: 'todos',
      id: 3,
      date: 'May 17, 2021',
    },
    {
      title: "Mario's Birthday",
      details: 'Buy Presents for Mario',
      category: 'todos',
      id: 4,
      date: 'May 16, 2021',
    },
  ];

  // console.log(notes.map((note) => note.date === date));
  const classes = useStyles();

  const breakpoints = {
    default: 3,
    1100: 2,
    // 700: 1,
  };

  return (
    <div className={classes.root}>
      {/* DATES FROM FIREBASE, LOOPING MAPPING FOR DIVIDER */}
      <List>
        <ListItem>
          <ListItemText primary={date} />
        </ListItem>
        <Divider component="li" variant="inset" />
      </List>
      <div className={classes.marginSide}>
        <Masonry
          breakpointCols={breakpoints}
          className={moduleClasses.myMasonryGrid}
          columnClassName={moduleClasses.myMasonryGridColumn}
        >
          {notes.map((note) => {
            if (note.date === date) {
              return (
                <div item key={note.id}>
                  <NoteCard note={note} />
                </div>
              );
            }
          })}
        </Masonry>
      </div>
      {/* Ater DATES, THHERE WILL BE NOTES WITH THE SAME DATE. LOOPING THE NOTES */}
      {/* GIVING THE DATA AS PROPS  */}
    </div>
  );
};

export default NoteDate;
