import React, { useContext } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
// import { FetchedVideosContext } from '../context/fetchedVideosContext';
const useStyles = makeStyles((theme) => ({
  marginFlex: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));

const GoBackPage = () => {
  const classes = useStyles();

  const history = useHistory();
  // const { fetchAgain, setFetchAgain, setLoading } = useContext(
  //   FetchedVideosContext
  // );

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.marginFlex}>
      <ArrowBackIcon fontSize="large" onClick={goBack} />
    </div>
  );
};

export default GoBackPage;
