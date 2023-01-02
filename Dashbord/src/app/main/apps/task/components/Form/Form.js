import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
// import FileBase from 'react-file-base64';
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

import useStyles from './styles';
import { createTask, updateTask } from '../../actions/tasks';

const Form = ({ currentId, setCurrentId }) => {
  const [taskData, settaskData] = useState({ name: '', description: '', userId: '', groupId: '', deadline: '',estTime:''});
  const task = useSelector((state) => (currentId ? state.tasks.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
 
  const [show, setShow] = useState(false);


  useEffect(() => {
    if (task) settaskData(task);
  }, [task]);

  const clear = () => {
    setCurrentId(0);
    settaskData({ name: '', description: '', userId: '', groupId: '', deadline: '',estTime:''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createTask(taskData));
      clear();
    } else {
      dispatch(updateTask(currentId, taskData));
      clear();
    }
  };
  


  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${taskData.name}"` : 'Creating a task'}</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={taskData.name} onChange={(e) => settaskData({ ...taskData, name: e.target.value })} />
        <TextField name="userId" variant="outlined" label="userId" fullWidth value={taskData.userId} onChange={(e) => settaskData({ ...taskData, userId: e.target.value })} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={taskData.description} onChange={(e) => settaskData({ ...taskData, description: e.target.value })} />
        <TextField name="estimated time" variant="outlined" label="estimated time" fullWidth value={taskData.estTime} onChange={(e) => settaskData({ ...taskData, estTime: e.target.value })} />
       
       
        <label>Deadline</label>
            <input label="start at"value={taskData.deadline}
            onChange={(e) => settaskData({ ...taskData, deadline: e.target.value })}
            type="datetime-local"/>  
        {/* <label>estimated time</label>
            <input value={taskData.estTime}
            onChange={(e) => settaskData({ ...taskData, estTime: e.target.value })}
            type="datetime-local"/> */}

        {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => settaskData({ ...taskData, selectedFile: base64 })} /></div> */}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="light" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
     
    </Paper>
  );
};

export default Form;
