import _ from '@lodash';
import * as React from 'react';
import { amber, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectLabelsEntities } from './store/labelsSlice';
import { getTodos,updateTodo, openEditTodoDialog } from './store/todosSlice';
import NoteReminderLabel from './NoteReminderLabel';
import TodoChip from './TodoChip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from '@material-ui/core/Select';

import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
// import SpeedDial from '@material-ui/core/SpeedDial';
// import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
// import SpeedDialAction from '@material-ui/core/SpeedDialAction';
import SpeedDial from '@material-ui/lab/SpeedDial';
// import  { SpeedDialProps } from '@material-ui/core/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles({
  todoItem: {
    '&.completed': {
      background: 'rgba(0,0,0,0.03)',
      '& .todo-title, & .todo-notes': {
        textDecoration: 'line-through',
      },
    },
  },
});

function TodoListItem(props) {
  const dispatch = useDispatch();
  const labels = useSelector(selectLabelsEntities);
  const [team, setTeams] = useState([]);
  const classes = useStyles(props);
  const [postData, setPostData] = useState({members:[] });
  const [success,setSuccess]=useState(false);

  localStorage.setItem("todo",JSON.stringify(props.todo));
  // const [direction, setDirection] =React.useState<SpeedDialProps['direction']>('up');

  /////////////////////speedDial//////////////////////
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /////////////////////////////////////////////////


  const TeamHandler=(e)=>{
    // setPostData(e.target.value );
    setPostData({ ...postData, members: e.target.value })
    const res =  axios.post(`https://backendtimeline.herokuapp.com/tasks/addMember/${props.todo.id}`,{members:e.target.value}).then((response) => {
    // setTeams(response.data)
    console.log(response.data);
    setSuccess(true);
    
    // console.log('hhh',selectedAccount);
   })
  }


  useEffect(()=>{
    
   const res =  axios.post('https://backendtimeline.herokuapp.com/api/member/find').then((response) => {
    setTeams(response.data)
    
    // console.log(response.data);
    // console.log('hhh',selectedAccount);
   })
  },setTeams)
  useEffect(()=>{
    dispatch(getTodos());
    // console.log("legend",props.todo.members[0].name)
   },postData)

  return (
    <ListItem
      className={clsx(classes.todoItem, { completed: props.todo.completed }, 'py-20 px-0 sm:px-8')}
      onClick={(ev) => {
        ev.preventDefault();
        dispatch(openEditTodoDialog(props.todo));
      }}
      dense
      button
    >
      <IconButton
        tabIndex={-1}
        disableRipple
        onClick={(ev) => {
          ev.stopPropagation();
          dispatch(
            updateTodo({
              ...props.todo,
              completed: !props.todo.completed,
            })
          );
        }}
      >
        {props.todo.completed ? (
          <Icon color="secondary">check_circle</Icon>
        ) : (
          <Icon color="action">radio_button_unchecked</Icon>
        )}
      </IconButton>

      <div className="flex flex-1 flex-col relative overflow-hidden px-8">
        <Typography
          className="todo-title truncate text-14 font-medium"
          color={props.todo.completed ? 'textSecondary' : 'inherit'}
        >
          {props.todo.title}
        </Typography>

        <Typography
          className="todo-title truncate text-8 font-medium nowrap   flex
          flex-direction-row justify-content-space-between" numberOfLines={1}
          color={props.todo.completed ? 'textSecondary' : 'inherit'}
        >
          {props.todo.members.map((member) => <MenuItem value={member._id}>
          <Avatar sx={{ width: 12, height: 12 }} alt={member.name} src="/static/images/avatar/2.jpg" />{member.name}</MenuItem>
           
         )}
          {/* {success ? (
            <Icon style={{ color: red[500] }}>added a member</Icon>
          ) : (
            <Icon>error_outline</Icon>
          )} */}
          {/* {props.todo.members[0].name} */}
        </Typography>
        {/* <select value={postData.members} onChange={(e) => setPostData({ ...postData, members: e.target.value })}> 
      
      
      {team.map((member) => <option value={member._id}>{member.name}</option>)}
    </select> */}

    

        {/* <TextField
                      id="account-selection"
                      select
                      value={postData.members[0]}
                      onChange={TeamHandler}
                      placeholder="Select Account"
                      margin="normal"
                      variant="filled"
                    >
                      {team.map((member) => <MenuItem value={member._id} >{member.name}</MenuItem>)}

                      
                      
                    </TextField> */}
        {/* <Typography
          className="todo-title truncate text-14 font-medium"
          color={props.todo.completed ? 'textSecondary' : 'inherit'}
        >
          {props.todo.members}
        </Typography>
         */}
        
        {/* <div >
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className="flex flex-1 flex-col relative overflow-hidden px-8"
        onClick={TeamHandler}
        value={postData.members}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        
      >
        {team.map((member) => (
          <SpeedDialAction
            key={member.name}
            value={member._id}
            tooltipTitle={member.name}
            tooltipOpen
            onClick={handleClose}/>
          // >{member.name}</SpeedDialAction>
        ))}
      </SpeedDial>
    </div> */}

        <Typography color="textSecondary" className="todo-notes truncate">
          {_.truncate(props.todo.notes.replace(/<(?:.|\n)*?>/gm, ''), { length: 180 })}
        </Typography>

        <div className={clsx(classes.labels, 'flex -mx-2 mt-8')}>
          {props.todo.labels.map((label) => (
            <TodoChip
              className="mx-2 mt-4"
              title={labels[label].title}
              color={labels[label].color}
              key={label}
            />
            
          ))}
        </div>
        
      </div>

      <div className="px-8">
        <IconButton
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            dispatch(
              updateTodo({
                ...props.todo,
                important: !props.todo.important,
              })
            );
          }}
        >
          {props.todo.important ? (
            <Icon style={{ color: red[500] }}>error</Icon>
          ) : (
            <Icon>error_outline</Icon>
          )}
        </IconButton>
        <IconButton
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            dispatch(
              updateTodo({
                ...props.todo,
                starred: !props.todo.starred,
              })
            );
          }}
        >
          
          {props.todo.starred ? (
            <Icon style={{ color: amber[500] }}>star</Icon>
          ) : (
            <Icon>star_outline</Icon>
          )}
        </IconButton>
        <NoteReminderLabel className="mt-4 mx-2 max-w-full"  date={props.todo.dueDate}/>
        <FormControl fullWidth sx={{m: 1, maxWidth: 8 }} size="small">
  
  <Select 
  
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    sx={{width:7}}
    value={postData.members}
    label="Age"
    onChange={TeamHandler}
    placeholder="assign "
    
  >
    
    {team.map((member) => <MenuItem value={member._id}>{member.name}</MenuItem>
                          )}
                          
   
  </Select>
</FormControl>
{/* <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
        <SpeedDial
          ariaLabel="SpeedDial playground example"
         
          icon={<SpeedDialIcon />}
          direction={direction}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          
        >
          
          {team.map((member) => (
            <SpeedDialAction
              key={member.name}
              value={member._id}
              tooltipTitle={member.name}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
        </Box> */}
        {/* {success ? (
            <Icon style={{ color: red[500] }}>added a member</Icon>
          ) : (
            <Icon>error_outline</Icon>
          )} */}
        
      </div>
    </ListItem>
  );
}

export default TodoListItem;
