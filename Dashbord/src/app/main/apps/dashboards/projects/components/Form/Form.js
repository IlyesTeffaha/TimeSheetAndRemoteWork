import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';



import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';


import axios from "axios";




const Form = ({ currentId, setCurrentId }) => {
  const emailvalue =localStorage.getItem('emailvalue');
  const [postData, setPostData] = useState({ creator: '', name: '', description: '', tags: '', selectedFile: '' ,endDate:'',startDate:'',emailvalue:emailvalue,teamid:''});
  const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', name: '', description: '', tags: '', selectedFile: '', startDate: '', endDate: '' ,teamid:'',emailvalue:emailvalue});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };
  const url3 = 'https://backendtimeline.herokuapp.com/api/team';
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const getTeams = async () => {
      const res = await axios.get(`${url3}/find`)
      setTeams(res.data);
    };
    getTeams();
  }, setTeams); 
  


  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.name}"` : 'Creating a Project'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
       
       
        
            <input label="start at"value={postData.startDate}
            onChange={(e) => setPostData({ ...postData, startDate: e.target.value })}
            type="datetime-local"/>  
        <label>start at</label>
            <input value={postData.endDate}
            onChange={(e) => setPostData({ ...postData, endDate: e.target.value })}
            type="datetime-local"/><label>end at</label>
<select value={postData.teamid} onChange={(e) => setPostData({ ...postData, teamid: e.target.value })}> 
      <option > ⬇️ Assign to Team ⬇️ </option>
      
      {teams.map((team) => <option value={team.id}>{team.name}</option>)}
    </select>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
