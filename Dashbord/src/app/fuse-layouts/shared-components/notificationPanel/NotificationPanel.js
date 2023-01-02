import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { useSnackbar } from 'notistack';
import { useEffect, memo,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import NotificationModel from './model/NotificationModel';
import NotificationCard from './NotificationCard';
import NotificationTemplate from './NotificationTemplate';
import {
  getNotifications,
  addNotification,
  dismissAll,
  dismissItem,
  selectNotifications,
} from './store/dataSlice';
import reducer from './store';
import { closeNotificationPanel, toggleNotificationPanel } from './store/stateSlice';
import getTodos from '../../../main/apps/todo/store/todosSlice';
import axios from 'axios';
const path=window.location.pathname;
export const tasknotif=path.slice(0,15);
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: 320,
  },
}));

let displayed = [];

const storeDisplayed = (id) => {
  displayed = [...displayed, id];
};


const removeDisplayed = (id) => {
  displayed = [...displayed.filter((key) => id !== key)];
};

function NotificationPanel(props) {
  const classes = useStyles();
  const [tasks,setTasks]=useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector(({ notificationPanel }) => notificationPanel.state);
  const notifications = useSelector(selectNotifications);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const todo = localStorage.getItem("todo");
  // useEffect(() => {
   
  //   console.log("todo notiff",todo)
    
    
     
  //    function createNotification(obj) {
  //     dispatch(addNotification(NotificationModel(obj)));
  //   }
  //   if(tasknotif=="/apps/todo/all" ){
  //     if(todo.completed!==false){
  //       setTimeout(
  //         () =>
         
          
  //           createNotification({
  //             message: `You have finished a ${todo.title} task.`,
  //             options: { variant: 'info' },
  //           }),
  //         400
  //       );
  //     }
      
  //   }
  //   // console.log('hhh',selectedAccount);
   
  // },)

  useEffect(() => {
    console.log("tasknotif",tasknotif)
    const res =  axios.get('https://backendtimeline.herokuapp.com/tasks/due-tasks/no-deadline').then((response) => {
    setTasks(response.data);
    
     console.log("ayooo",response.data);
     console.log("ayooo tasks",tasks);
     function createNotification(obj) {
      dispatch(addNotification(NotificationModel(obj)));
    }
    if(tasknotif=="/apps/todo/all"){
      setTimeout(
        () =>
       
        
          createNotification({
            message: `You have ${response.data} overdue tasks.`,
            options: { variant: 'warning' },
          }),
        400
      );
    }
    // console.log('hhh',selectedAccount);
   })
  },tasks)
  useEffect(() => {
    /*
		Get Notifications from db
		 */
    dispatch(getNotifications());

    /*
		Add Notifications for demonstration
		 */
    function createNotification(obj) {
      dispatch(addNotification(NotificationModel(obj)));
    }
    // if(tasknotif=="/apps/todo/all"){
    //   setTimeout(
    //     () =>
       
        
    //       createNotification({
    //         message: `You have ${tasks} overdue tasks.`,
    //         options: { variant: 'warning' },
    //       }),
    //     400
    //   );
    // }
   

    // setTimeout(
    //   () =>
    //     createNotification({ message: 'Hey there is a problem!', options: { variant: 'error' } }),
    //   500
    // );

    // setTimeout(
    //   () =>
    //     createNotification({
    //       message: 'There might be a problem here!',
    //       options: { variant: 'warning' },
    //     }),
    //   500
    // );

    // setTimeout(
    //   () =>
    //     createNotification({
    //       message: 'This is some general information.',
    //       options: { variant: 'info' },
    //     }),
    //   500
    // );
  }, [dispatch]);

  useEffect(() => {
    notifications.forEach((item) => {
      const { id: key, message, options = {}, dismissed = false } = item;

      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }
      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) {
        return;
      }

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        // autoHideDuration: 3000,
        content: () => (
          <NotificationTemplate
            item={item}
            onClose={() => {
              closeSnackbar(key);
              dispatch(dismissItem(key));
            }}
          />
        ),
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {},
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  useEffect(() => {
    if (state) {
      dispatch(closeNotificationPanel());
    }
    // eslint-disable-next-line
	}, [location, dispatch]);

  function handleClose() {
    dispatch(closeNotificationPanel());
  }

  function handleDismiss(id) {
    dispatch(dismissItem(id));
  }
  function handleDismissAll() {
    dispatch(dismissAll());
  }

  return (
    <SwipeableDrawer
      classes={{ paper: clsx(classes.root) }}
      open={state}
      anchor="right"
      onOpen={(ev) => {}}
      onClose={(ev) => dispatch(toggleNotificationPanel())}
      disableSwipeToOpen
    >
      <IconButton className="m-4 absolute top-0 right-0 z-999" onClick={handleClose}>
        <Icon color="action">close</Icon>
      </IconButton>
      {notifications.length > 0 ? (
        <FuseScrollbars className="p-16">
          <div className="flex flex-col">
            <div className="flex justify-between items-end pt-136 mb-36">
              <Typography className="text-28 font-semibold leading-none">Notifications</Typography>
              <Typography
                className="text-12 underline cursor-pointer"
                color="secondary"
                onClick={handleDismissAll}
              >
                dismiss all
              </Typography>
            </div>
            {notifications.map((item) => (
              <NotificationCard
                key={item.id}
                className="mb-16"
                item={item}
                onClose={handleDismiss}
              />
            ))}
          </div>
        </FuseScrollbars>
      ) : (
        <div className="flex flex-1 items-center justify-center p-16">
          <Typography className="text-24 text-center" color="textSecondary">
            There are no notifications for now.
          </Typography>
        </div>
      )}
      
    </SwipeableDrawer>
  );
}

export default withReducer('notificationPanel', reducer)(memo(NotificationPanel));
