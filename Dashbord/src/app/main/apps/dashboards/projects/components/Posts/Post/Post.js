import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography ,CardActionArea} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch } from 'react-redux';
import {deletePost } from '../../../actions/posts';
import useStyles from './styles';

 
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  //const teams = useSelector((state) => state.teams);
 
  return (
    <Card className={classes.card}>
      <CardActionArea href={`https://timesheetleague.herokuapp.com/apps/dashboards/reports/`+post._id+`/`+post.teamid+`/`+post.name}>
      <CardMedia  className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} /></CardActionArea>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.name}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.description}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{post.startDate}</Typography>
        
        <Typography variant="body2" color="textSecondary" component="p"> {post.endDate}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" href={`https://timesheetleague.herokuapp.com/apps/dashboards/phases/`+post._id+`/`+post.teamid}>Phases</Button>    
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
      
    </Card>
  );
};

export default Post;
