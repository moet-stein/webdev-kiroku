import { React, useState, useEffect, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router';
import { green } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { VideoForNewNoteContext } from '../context/videoForNewNoteContext';

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
  const { id } = useParams();
  const imageUrl = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const classes = useStyles();
  const history = useHistory();
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [categoryInput, setCategoryInput] = useState(0);
  const [category, setCategory] = useState('');
  const [categoriesArr, setCategoriesArr] = useState([]);

  const { videoForNewNote } = useContext(VideoForNewNoteContext);
  console.log(videoForNewNote);

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

    if (title == '') {
      setTitleError(true);
    }
    if (details == '') {
      setDetailsError(true);
    }

    if (title && details) {
      console.log(title, details, categoriesArr);
      //   history.push('/search');
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <img
          className={classes.image}
          src={videoForNewNote.snippet.thumbnails.high.url}
        />
        <Typography> Video Title: {videoForNewNote.snippet.title} </Typography>
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
  );
};

export default NewNote;
