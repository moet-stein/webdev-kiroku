import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AppBar from '../components/AppBar';
import GoBackPage from '../components/GoBackPage';
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
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

const NewNoteWithoutVideo = () => {
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

    if (title == '') {
      setTitleError(true);
    }
    if (details == '') {
      setDetailsError(true);
    }

    if (title && details) {
      console.log(title, details, categoriesArr, selectedDate);
      localStorage.removeItem('newNoteVideo');
      //   history.push('/search');
    }
  };

  return (
    <React.Fragment>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

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
            className={classes.field}
            label="Any Link?"
            variant="outlined"
            color="secondary"
            fullWidth
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
      <AppBar />
    </React.Fragment>
  );
};

export default NewNoteWithoutVideo;
