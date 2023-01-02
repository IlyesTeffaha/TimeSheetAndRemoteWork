import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Phases from './Phase/Phases/Phases';
import Form from './Phase/Form/Form';

import { getTasks } from '../actions/tasks';
import useStyles from '../styles';
import phases from '../images/phase.jpg';


const Phase = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getTasks());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Phases</Typography>
        <img className={classes.image} src={phases} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12}>
              <Phases setCurrentId={setCurrentId} />
            </Grid>
           {/*  <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid> */}
          </Grid>
        </Container>
      </Grow>

    </Container>
  
  );
};

export default Phase;
