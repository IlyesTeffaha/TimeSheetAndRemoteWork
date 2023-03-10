import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import ToolbarMenu from './ToolbarMenu';
import { useEffect, useRef } from 'react';

import axios from 'axios';
function MembersMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [contacts, setContacts] = useState(null);
  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('https://backendtimeline.herokuapp.com/api/team/find')
        .then(response => setContacts(response.data.contacts));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

  return (
    <div>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Icon>account_circle</Icon>
      </IconButton>
<ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
        <div className="">
                {props.contacts.map((member) => {
            return (
              <MenuItem
                className="px-8"
                key={member.id}
                onClick={(ev) => {
                  props.onToggleMember(member.id);
                }}
              >
                {/* <Checkbox checked={props.idMembers.includes(member.id)} /> */}
                {/* <Avatar className="w-32 h-32" src={member.avatar} /> */}
                <ListItemText className="mx-8">{member.name}</ListItemText>
              </MenuItem>
            );
          })}
        </div>
      </ToolbarMenu>
    </div>
  );
}

export default MembersMenu;
