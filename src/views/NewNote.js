import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AppBarComponent from '../components/AppBarComponent';
import GoBackPage from '../components/GoBackPage';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Box, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router';
import { green } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { VideoForNewNoteContext } from '../context/videoForNewNoteContext';
import ProfileMenu from '../components/ProfileMenu';
import { database, notes } from '../firebase';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
  image: {
    width: '350px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  marginWidth70: {
    width: '70%',
    marginTop: 20,
    marginBottom: 20,
  },
  flexSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  categoryMargin: {
    marginRight: '10px',
  },
}));

const NewNote = () => {
  useEffect(() => {
    console.log('hello');
    database.notes
      .doc()
      .get()
      .then((doc) => {
        const formattedDoc = {
          id: doc.id,
          ...doc.data(),
        };
        console.log(formattedDoc);
      });
  }, []);

  const { id } = useParams();
  const imageUrl = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [categoryInput, setCategoryInput] = useState(0);
  const [category, setCategory] = useState('');
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { currentUser } = useAuth();

  const {
    videoForNewNote,
    setVideoForNewNote,
    clearVideoForNewNote,
  } = useContext(VideoForNewNoteContext);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addCategoryInput = () => {
    setCategoryInput(categoryInput + 1);
    setCategoriesArr([...categoriesArr, category]);
  };

  const handleInputChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    // Check if the title and details are not empty
    if (title == '') {
      setTitleError(true);
    }
    if (details == '') {
      setDetailsError(true);
    }

    // Create a note in the database

    if (title && details) {
      console.log(title, details, categoriesArr, selectedDate);
      database.notes.add({
        title: title,
        details: details,
        categories: categoriesArr,
        date: selectedDate,
        userId: currentUser.uid,
        createdAt: database.getCurrentTimestamp(),
        // parentId
        // path
      });
      //   history.push('/search');
    }
  };

  const htmlEntities = (str) => {
    return String(str)
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, `'`);
  };

  return (
    <React.Fragment>
      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <GoBackPage />
        </Box>
        <Box p={1}>
          <ProfileMenu />
        </Box>
      </Box>
      <Typography variant="h5" color="textSecondary">
        Create a New Note
      </Typography>
      <Container>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <img
            className={classes.image}
            src={videoForNewNote.snippet.thumbnails.high.url}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Typography>
            {' '}
            Video Title: {htmlEntities(videoForNewNote.snippet.title)}{' '}
          </Typography>
          <Typography>
            Source: {`https://www.youtube.com/watch?v=${id}`}
          </Typography>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            className={classes.field}
            label="Note Title"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={titleError}
          />
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            className={classes.field}
            label="Details"
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
            fullWidth
            required
            error={detailsError}
          />

          <div className={classes.field}>
            <div className={classes.flexSpaceAround}>
              <TextField
                onChange={handleInputChange}
                className={classes.marginWidth70}
                label="category"
                variant="outlined"
                color="secondary"
                fullWidth

                // error={titleError}
              />

              <AddCircleOutlineIcon
                style={{ color: green[500] }}
                onClick={addCategoryInput}
              />
            </div>
          </div>

          <div className={classes.flexColumn}>
            {categoriesArr.length > 0 && (
              <Typography variant="h5" gutterBottom>
                Categories
              </Typography>
            )}

            <div className={classes.demo}>
              <List>
                {categoriesArr.map((category) => (
                  <ListItem key={category}>
                    <ListItemText
                      className={classes.categoryMargin}
                      primary={
                        category.length > 13
                          ? `${category.slice(0, 13)}...`
                          : category
                      }
                    />
                    <ListItemIcon>
                      <HighlightOffIcon />
                    </ListItemIcon>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>

          <Button
            className={classes.marginWidth70}
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
      <AppBarComponent />
    </React.Fragment>
  );
};

export default NewNote;
