import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store';

import { selectNotifications } from './store/dataSlice';
import { toggleChatbotPanel } from './store/stateSlice';

function ChatbotPanelToggleButton(props) {
 

  const dispatch = useDispatch();

  return (
    <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleChatbotPanel())}>
      <Badge color="secondary" variant="dot" >
        {props.children}
      </Badge>
    </IconButton>
  );
}

ChatbotPanelToggleButton.defaultProps = {
  children: <Icon>chat</Icon>,
};

export default withReducer('chatbotPanel', reducer)(ChatbotPanelToggleButton);
