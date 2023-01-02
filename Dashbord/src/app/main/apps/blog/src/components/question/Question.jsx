import "./question.css";
import { Link } from "react-router-dom";
import Parser from 'html-react-parser';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';





export default function Question({ question }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '400%',
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  const classes = useStyles();


  
  return (<div className="question">  
    <List className={classes.root} >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <Link  to={`/pages/blog/singlequestion/${question._id}`} > <ListItemText primary={question.title} secondary= {new Date(question.createdAt).toDateString()} ></ListItemText>
</Link>

<ListItem><font >{Parser(question.desc)}</font></ListItem>

        </ListItem>
        <Divider variant="inset" component="li" />
      
      </List>
  

    </div>
    
  );
}
