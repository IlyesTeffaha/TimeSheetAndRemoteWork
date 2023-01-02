import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { likeTask, deleteTask,getTasks } from '../../actions/tasks';
import { Typography } from '@material-ui/core';
const Tasks = ({setCurrentId }) => {
  const tasks = useSelector((state) => (state.tasks));
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getTasks());
  //   dispatch(getFolders());
  //   dispatch(getLabels());
   });
  return (
    
    // !posts.length ? <CircularProgress /> : (
      !tasks.length ? <Typography className={classes.heading} variant="h4" align="center">no Tasks</Typography> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {tasks.map((task) => (
          <Grid key={task._id} item xs={12} sm={6} md={6}>
            <Post task={task} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
      
    )

    
    
  );
};

export default Tasks;
