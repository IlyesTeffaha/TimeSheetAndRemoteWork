import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { useSnackbar } from 'notistack';
import { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import {
  
  dismissAll,
  dismissItem,
  
} from './store/dataSlice';
import reducer from './store';
import { closeChatbotPanel, toggleChatbotPanel } from './store/stateSlice';

import Chatbot from 'app/main/apps/timebot/Chatbot';
import ChatBotApp from 'app/main/apps/timebot/ChatBotApp';

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

function ChatbotPanel(props) {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector(({ chatbotPanel }) => chatbotPanel.state);
  

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  

 
  useEffect(() => {
    if (state) {
      dispatch(closeChatbotPanel());
    }
    // eslint-disable-next-line
	}, [location, dispatch]);

  function handleClose() {
    dispatch(closeChatbotPanel());
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
      onClose={(ev) => dispatch(toggleChatbotPanel())}
      disableSwipeToOpen
    >
      <IconButton className="m-4 absolute top-0 right-0 z-999" onClick={handleClose}>
        <Icon color="action">close</Icon>
      </IconButton>
      <Chatbot/>
      
      
    </SwipeableDrawer>
  );
}

export default withReducer('chatbotPanel', reducer)(memo(ChatbotPanel));
