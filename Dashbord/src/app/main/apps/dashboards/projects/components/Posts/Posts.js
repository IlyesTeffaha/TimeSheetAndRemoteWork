import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector ,useDispatch} from 'react-redux';
import { likePost, deletePost,getPosts } from '../../actions/posts';
import { useState, useEffect } from 'react';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  //   dispatch(getFolders());
  //   dispatch(getLabels());
   },dispatch);
console.log(posts);
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )  
 
  );
};

export default Posts;
