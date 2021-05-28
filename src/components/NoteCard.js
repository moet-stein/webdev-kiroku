import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { yellow, green, pink, blue } from '@material-ui/core/colors';
import { NotesContext } from '../context/notesContext';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === 'work') {
        return yellow[700];
      }
      if (note.category === 'money') {
        return green[500];
      }
      if (note.category === 'todos') {
        return pink[700];
      }
      return blue[500];
    },
  },
});

export default function NoteCard() {
  const classes = useStyles();
  const { notesArr, setNotesArr } = useContext(NotesContext);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {/* {notesArr.categories[0].toUpperCase()} */}
            </Avatar>
          }
          action={
            <IconButton>
              <DeleteOutlined />
            </IconButton>
          }
          title={notesArr.title}
          // subheader={notesArr.categories}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {notesArr.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
