import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import { useNavigate,useHistory } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likeTask, deleteTask,getTasks } from '../../../actions/tasks';
import useStyles from './styles';
import Popups from '../../Time/popup';

const Post = ({ task, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const navigate = useNavigate();
  const history = useHistory();
  
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={task.selectedFile || 'https://blog.doist.com/wp-content/uploads/2017/08/Ways-to-add-tasks-to-Todoist--1088x544.png'} title={task.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{task.name}</Typography>
        {/* <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> */}
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(task._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div>
      <div className={classes.details}>
        {/* <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography> */}
        <Typography variant="h6">{task.completed}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{task.name}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{task.description}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{task.deadline}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{task.estTime}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {/* <Popups/> */}
        <Button size="small" color="primary" onClick={() => history.push('/timesheet')}><ThumbUpAltIcon fontSize="small" /> show </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deleteTask(task._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
