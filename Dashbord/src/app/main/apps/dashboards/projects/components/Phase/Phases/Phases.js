import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import { likePost, deletePost,getPosts, getPhases } from '../../../actions/phases';
import { useState, useEffect } from 'react';
import Phase from './Phase/Phase';
import useStyles from './styles';

const Phases = ({ setCurrentId }) => {
  const phases = useSelector((state) => state.phases);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPhases());
  //   dispatch(getFolders());
  //   dispatch(getLabels());
   },dispatch);
  return (
    !phases.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {phases.map((phase) => (
          <Grid key={phase._id} item xs={12} sm={4} md={4}>
            <Phase phase={phase} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Phases;
