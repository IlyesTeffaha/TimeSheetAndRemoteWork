import React, { useState, useEffect } from 'react';
import { TextField,Container, AppBar, Typography, Grow, Grid,Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import Posts from './Posts/Posts';
import Form from './Form/Form';

import { getTasks } from '../actions/tasks';
import useStyles from '../styles';
import memories from '../images/task.gif';
import Popups from './Time/popup';

// import 'materialize-css/dist/css/materialize.min.css';
////////////////////////////////////////////////////////////////////////
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from '../reducers';

const Task = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const store = createStore(reducers, compose(applyMiddleware(thunk)));


  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  useEffect(() => {
    dispatch(getTasks());
  }, [currentId, dispatch]);

  return (
    <div className='container'>
      <Provider store={store}>
    <Container maxWidth="s">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h4" align="center">Current Tasks</Typography>
        <img className={classes.image} src={memories} alt="icon" height="20" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
              {/* <Popups/> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              
            <div className="search">
        <TextField
          id="outlined-basic"
          // onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search "
        />
        
      </div>
            <>
      <Button color="dark" onClick={() => setShow(prev => !prev)}>New Task</Button>
      {show && <Form currentId={currentId} setCurrentId={setCurrentId} />}
    </>
    
      
              
            </Grid>
            
          </Grid>

          
        </Container>
       
      </Grow>
     
    </Container>
    {/* <Container>
    
    </Container> */}
      </Provider>
    </div>
    
  );
};

export default Task;
