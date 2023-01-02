import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import axios from "axios";



import useStyles from './styles';
import { createPhase, updatePhase ,getPhases} from '../../../actions/phases';
import { useLocation } from 'react-router';
const teamid=window.location.pathname;
export const teamidd=teamid.slice(49,);
console.log(teamidd);
const projectid=window.location.pathname;
export const projectidd=projectid.slice(24,48);
console.log(projectidd);

const Form = ({ currentId, setCurrentId }) => {
  const [phaseData, setPhaseData] = useState({ creator: '', title: '', description: '', tags: '', selectedFile: '', startDate:'',endDate:'',priority:'',projectId:projectidd,memberid:'',progress:'',doneat:''});
  const phase = useSelector((state) => (currentId ? state.phases.find((description) => description._id === currentId) : null));

  const dispatch = useDispatch();
  const classes = useStyles();
  /* useEffect(() => {
    dispatch(getPhases());
  //   dispatch(getFolders());
  //   dispatch(getLabels());
   },dispatch); */
   const phases=dispatch(getPhases());

  useEffect(() => {
    if (phase) setPhaseData(phase);
  }, [phase]);


 
  
  const clear = () => {
    setCurrentId(0);
    setPhaseData({ creator: '', name: '', description: '', tags: '', selectedFile: '', startDate: '', endDate: '' ,priority:'',projectId:projectidd,memberid:'',progress:'',doneat:''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPhase(phaseData));
      clear();
    } else {
      dispatch(updatePhase(currentId, phaseData));
      clear();
    }
  };
    const url3 = 'https://backendtimeline.herokuapp.com/api/team';
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
      const uri=`${url3}/find/member/${teamidd}`;
      const res = await axios.post(uri);
      console.log(uri);
      setMembers(res.data);
    };
    getMembers();
  }, setMembers); 
 const today = new Date();
console.log(today);

  return (
    <Paper className={classes.paper}>
     
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing ""` : 'Creating a Phase'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={phaseData.creator} onChange={(e) => setPhaseData({ ...phaseData, creator: e.target.value })} />
        <div  onChange={(e) => setPhaseData({ ...phaseData, priority: e.target.value })}>
          <label>Priority   :</label>
        <input type="radio" name="priority" value="high"/> High
        <input type="radio" name="priority" value="medium" /> Medium
        <input type="radio" name="priority" value="low" /> Low
      </div>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={phaseData.name} onChange={(e) => setPhaseData({ ...phaseData, name: e.target.value })} />
        <div ><select value={phaseData.memberid} onChange={(e) => setPhaseData({ ...phaseData, memberid: e.target.value })}> 
     <option > ⬇️ Assign to Team Member ⬇️ </option>
      
      {members.map((member) => <option value={member._id}>{member.name}</option>)}
    </select></div>
   {/*  {currentId ? */}<div onChange={(e) => setPhaseData({ ...phaseData, progress : e.target.value,doneat: today })}>
          <label>Progress   :</label>
        
        <input type="radio" name="priority" value="false" /> In Progress
        <input type="radio" name="priority" value="true" /> Done
      </div>{/* :<div></div>} */}
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={phaseData.description} onChange={(e) => setPhaseData({ ...phaseData, description: e.target.value })} />
    
       {/*  <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={phaseData.tags} onChange={(e) => setPhaseData({ ...phaseData, tags: e.target.value.split(',') })} /> */}
       
       
        
            <input label="start at"value={phaseData.startDate}
            onChange={(e) => setPhaseData({ ...phaseData, startDate: e.target.value })}
            type="datetime-local"/>  <label>start at</label>
        
            <input value={phaseData.endDate}
            onChange={(e) => setPhaseData({ ...phaseData, endDate: e.target.value })}
            type="datetime-local"/><label>end at</label>

        {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPhaseData({ ...phaseData, selectedFile: base64 })} /></div> */}
        
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
