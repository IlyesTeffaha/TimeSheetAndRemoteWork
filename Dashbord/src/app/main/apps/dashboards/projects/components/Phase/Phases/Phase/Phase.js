import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { likePhase, deletePhase } from '../../../../actions/phases';

import useStyles from './styles';
import { useLocation } from 'react-router';
const teamidd=window.location.pathname;
export const teamid=teamidd.slice(49,);
console.log(teamid); 
const Phase = ({ phase, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  
 

  return ( 
    <Card style={phase.priority==='high' ? {backgroundColor:'#F71A28'} :phase.priority==='low' ? {backgroundColor:'#32F71A'} :{backgroundColor:'#FA8101'}}   className={classes.card}>
     {  <CardMedia className={classes.media} image={phase.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={phase.title} /> }
      <div className={classes.overlay}>
        <Typography variant="h6">{phase.creator}</Typography>
        <Typography variant="body2">{moment(phase.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(phase._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{phase.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{phase.name}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{phase.description}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{phase.startDate}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{phase.endDate}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{phase.priority} </Typography>
        <Typography variant="body2" color="textSecondary" component="p">Assigned to : {phase.memberid} </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
      <Button size="small" color="primary" href={`https://timesheetleague.herokuapp.com/apps/todo/all/`+phase._id}>Tasks</Button>
      <Button size="small" color="dark" onClick={() => dispatch(deletePhase(phase._id))}><DeleteIcon fontSize="medium" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Phase;
