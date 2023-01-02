import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from '../components/Posts/Posts';
import Form from '../components/Form/Form';

import { getPosts } from '../actions/posts';
import useStyles from '../styles';
import memories from '../images/task.gif';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '../reducers/index';
import { useLocation } from 'react-router';

const pathy = window.location.pathname;

const Project = () => {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (<Provider store={store}>
    <Container maxWidth="lg">
      
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">My Projects</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
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

export default Project;
