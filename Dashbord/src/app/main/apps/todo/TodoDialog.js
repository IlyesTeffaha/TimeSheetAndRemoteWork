import { yupResolver } from '@hookform/resolvers/yup';
import { DateTimePicker } from '@material-ui/pickers';
import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import AppBar from '@material-ui/core/AppBar';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { amber, red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { selectLabels } from './store/labelsSlice';
import {
  removeTodo,
  addTodo,
  closeNewTodoDialog,
  closeEditTodoDialog,
  updateTodo,
} from './store/todosSlice';
import { motion } from 'framer-motion';
import MembersMenu from './MembersMenu';
import axios from 'axios';
import { useLocation } from 'react-router';

const emailvalue = localStorage.getItem("emailvalue");

const path=window.location.pathname;
export const phaseId=path.slice(15,51);
console.log('here',phaseId);
// const routeParams = useParams();


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
});

function TodoDialog(props) {
  const defaultValues = {
    id: '',
    title: '',
    notes: '',
    startDate: new Date(),
    dueDate: new Date(),
    completed: false,
    starred: false,
    important: false,
    deleted: false,
    labels: [],
    emailvalue:emailvalue,
    members:[],
    phaseId:path.slice(15,51),
   
    
  };







  const dispatch = useDispatch();
  const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);
  const labels = useSelector(selectLabels);
  const [contacts, setContacts] = useState(null);

  const [labelMenuEl, setLabelMenuEl] = useState(null);
  const { watch, handleSubmit, formState, reset, control, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors, isValid, dirtyFields } = formState;
  const formId = watch('id');
  const formLabels = watch('labels');
  const dueDate = watch('dueDate');
  const startDate = watch('startDate');
  const members=watch('members');

  
  const [accounts, setAccounts] = useState([]);

  function handleAccountChange(ev) {
    // setSelectedCount(ev.target.value);
    setValue("members",ev.target.value)
    
  }

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (todoDialog.type === 'edit' && todoDialog.data) {
      reset({ ...todoDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (todoDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...todoDialog.data,
      });
    }
  }, [todoDialog.data, todoDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (todoDialog.props.open) {
      initDialog();
    }
  }, [todoDialog.props.open, initDialog]);

  useEffect(() => {
    
   const res =  axios.post('https://backendtimeline.herokuapp.com/api/member/find').then((response) => {
    setAccounts(response.data)
    // console.log(response.data);
    // console.log('hhh',selectedAccount);
   })
    
},setAccounts);
  
// useEffect(() => {
    
//  console.log("here",defaultValues);
   
// },);
  

  /**
   * Close Dialog
   */
  function closeTodoDialog() {
    return todoDialog.type === 'edit'
      ? dispatch(closeEditTodoDialog())
      : dispatch(closeNewTodoDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    console.log('here',data);
    if (todoDialog.type === 'new') {
      dispatch(addTodo({ id: FuseUtils.generateGUID(), ...data }));

    } else {
      dispatch(updateTodo({ ...todoDialog.data, ...data }));
    }
    closeTodoDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeTodo(formId)).then(() => {
      closeTodoDialog();
    });
  }

//   useEffect(() => {
//     // GET request using axios inside useEffect React hook
//     axios.get('https://backendtimeline.herokuapp.com/api/team/find')
//         .then(response => setContacts(response.data.contacts));

// // empty dependency array means this effect will only run once (like componentDidMount in classes)
// }, []);


  return (
    <Dialog {...todoDialog.props} onClose={closeTodoDialog} fullWidth maxWidth="sm">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {todoDialog.type === 'new' ? 'New Todo' : 'Edit Todo'}
          </Typography>
          {/* //   <select value={control.members} onChange={(e) => setValue( "members", e.target.value )}> 
                //   <option > ⬇️ Assign to Team Member ⬇️ </option>
                  
                //   {accounts.map((member) => <option value={member._id}>{member.name}</option>)}
                // </select> */}
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: 'p-0' }}>
          <div className="mb-16">
            <div className="flex items-center justify-between p-12">
              <div className="flex">
                <Controller
                  name="completed"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <IconButton tabIndex={-1} disableRipple onClick={(ev) => onChange(!value)}>
                      {value ? (
                        <Icon color="secondary">check_circle</Icon>
                      ) : (
                        <Icon color="action">radio_button_unchecked</Icon>
                      )}
                    </IconButton>
                  )}
                />
                <Controller
                name="idMembers"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <TextField
                      id="account-selection"
                      select
                      value={control.members}
                      onChange={(e) => setValue( "members", e.target.value )}
                      placeholder="Select Account"
                      margin="normal"
                      variant="filled"
                    >
                      {accounts.map((member) => <MenuItem value={member._id}>{member.name}</MenuItem>)}
                      
                      
                    </TextField>
                  // <MembersMenu
                  //   // onToggleMember={(id) => onChange(_.xor(value, [id]))}
                  //   // members={contacts.id}
                  //   // idMembers={value}
                  // />
                )}
              />
              </div>

              <div className="flex items-center justify-start">
                <Controller
                  name="important"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <IconButton onClick={() => onChange(!value)}>
                      {value ? (
                        <Icon style={{ color: red[500] }}>error</Icon>
                      ) : (
                        <Icon>error_outline</Icon>
                      )}
                    </IconButton>
                  )}
                />

                <Controller
                  name="starred"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <IconButton onClick={() => onChange(!value)}>
                      {value ? (
                        <Icon style={{ color: amber[500] }}>star</Icon>
                      ) : (
                        <Icon>star_outline</Icon>
                      )}
                    </IconButton>
                  )}
                />

                <div>
                  <IconButton
                    aria-owns={labelMenuEl ? 'label-menu' : null}
                    aria-haspopup="true"
                    onClick={(ev) => setLabelMenuEl(ev.currentTarget)}
                  >
                    <Icon>label</Icon>
                  </IconButton>
                  <Controller
                    name="labels"
                    control={control}
                    render={({ field: { onChange, value: formLabelsVal } }) => (
                      <Menu
                        id="label-menu"
                        anchorEl={labelMenuEl}
                        open={Boolean(labelMenuEl)}
                        onClose={() => setLabelMenuEl(null)}
                      >
                        {labels.length > 0 &&
                          labels.map((label) => (
                            <MenuItem
                              onClick={(ev) => onChange(_.xor(formLabelsVal, [label.id]))}
                              key={label.id}
                            >
                              <ListItemIcon className="min-w-24">
                                <Icon color="action">
                                  {formLabelsVal.includes(label.id)
                                    ? 'check_box'
                                    : 'check_box_outline_blank'}
                                </Icon>
                              </ListItemIcon>
                              <ListItemText
                                className="mx-8"
                                primary={label.title}
                                disableTypography
                              />
                              <ListItemIcon className="min-w-24">
                                <Icon style={{ color: label.color }} color="action">
                                  label
                                </Icon>
                              </ListItemIcon>
                            </MenuItem>
                          ))}
                      </Menu>
                    )}
                  />
                </div>
              </div>
            </div>
            <Divider className="mx-24" />
          </div>

          {formLabels.length > 0 && (
            <div className="flex flex-wrap w-full px-12 sm:px-20 mb-16">
              {formLabels.map((labelId) => {
                const label = _.find(labels, { id: labelId });
                return (
                  <Chip
                    avatar={
                      <Avatar classes={{ colorDefault: 'bg-transparent' }}>
                        <Icon className="text-20" style={{ color: label.color }}>
                          label
                        </Icon>
                      </Avatar>
                    }
                    label={label.title}
                    onDelete={(ev) =>
                      setValue(
                        'labels',
                        formLabels.filter((_id) => labelId !== _id)
                      )
                    }
                    className="mx-4 my-4"
                    classes={{ label: 'px-8' }}
                    key={labelId}
                  />
                );
              })}
            </div>
          )}

          <div className="px-16 sm:px-24">
            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    autoFocus
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    required
                    variant="outlined"
                  />
                )}
              />
            </FormControl>

            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Notes" multiline rows="6" variant="outlined" />
                )}
              />
            </FormControl>

            <div className="flex -mx-4">
              <Controller
                name="startDate"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    label="Start Date"
                    inputVariant="outlined"
                    value={value}
                    onChange={onChange}
                    className="mt-8 mb-16 mx-4"
                    maxDate={dueDate}
                  />
                )}
              />

              <Controller
                name="dueDate"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    label="Due Date"
                    inputVariant="outlined"
                    value={value}
                    onChange={onChange}
                    className="mt-8 mb-16 mx-4"
                    minDate={startDate}
                  />
                )}
              />
              {/* <Controller
                name="idMembers"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <MembersMenu
                    onToggleMember={(memberId) => onChange(_.xor(value, [memberId]))}
                    members={board.members}
                    idMembers={value}
                  />
                )}
              /> */}

{/* <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="members"
                control={control}
                defaultValue="hhhh"
                render={({ field: { handleAccountChange,value } }) => (
                  // <TextField {...field} label="members" multiline rows="6" variant="outlined" />
                  //  <Select
                   
                  //       select
                  //       label="members"
                  //       value={value}
                  //       onChange={onChange}
                  //       placeholder="Select Member"
                  //       margin="normal"
                  //       variant="filled"
                  //     >
                  //       {selectedAccount.map((post) => (
                  //                 <Option value={value} key={post._id} >
                  //                 {post._id}
                  //               </Option>  
                  //               // <p key={post._id}>{post._id}</p>
                  //                ))}
                  //    </Select> 
                  <select selected={value} value={value}  onChange={handleAccountChange()}> 
                  {selectedAccount.map((post) => (
                                   <option value={value} Key={post._id} selected >
                                      {post._id}
                                     </option>  
                               
                                  ))}           
                        
                </select>

                )}
              />
            </FormControl> */}

{/* <motion.div
        initial={{ y: 20, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
      >
        <TextField
          id="account-selection"
          select
          label={selectedAccount}
          value={selectedAccount}
          onChange={handleAccountChange}
          placeholder="Select Account"
          margin="normal"
          variant="filled"
        >
          {Object.keys(accounts).map((key, value) => (
            <MenuItem key={key} value={key}>
              {accounts[key]}
            </MenuItem>
          ))}
        </TextField>
      </motion.div> */}
            </div>
          </div>
          <motion.div
        initial={{ y: 20, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
      >
        {/* <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={control}
                    label="selectedAccount"
                    onChange={handleAccountChange}
                  > 
                  {selectedAccount.map((post) => (
                    <MenuItem key={post._id} >
                    {post.name}
                  </MenuItem>   ))}
              
            
            
          </Select> */}
        {/* <TextField
          id="account-selection"
          select
          label={selectedAccount}
          value={selectedAccount}
          onChange={handleAccountChange}
          placeholder="Select Account"
          margin="normal"
          variant="filled"
        >
           {selectedAccount.map((post) => (
                    <MenuItem key={post._id} >
                    {post.name}
                  </MenuItem>   ))}
        </TextField> */}
            
      </motion.div>
      
        </DialogContent>

        {todoDialog.type === 'new' ? (
          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Save
              </Button>
            </div>
            <IconButton className="min-w-auto" onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default TodoDialog;
