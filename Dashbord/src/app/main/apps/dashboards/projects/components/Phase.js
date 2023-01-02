import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Phases from './Phase/Phases/Phases';
import Form from './Phase/Form/Form';

import { getPhases } from '../actions/phases';
import useStyles from '../styles';
import phases from '../images/phase.jpg';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '../reducers/index';
const Phase = () => {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  
  useEffect(() => {
    dispatch(getPhases());
  }, [currentId, dispatch]);

  return (
    <Provider store={store}>
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Phases</Typography>
        <img className={classes.image} src={phases} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={8}>
              <Phases setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid> 
          </Grid>
        </Container>
      </Grow>

    </Container>
    </Provider>
  
  );
};

export default Phase;
