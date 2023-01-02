import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';

const accounts = {
  p1: 'Phase1',
  p2: 'Phase2',
};

function TodoSidebarHeader() {
  const [selectedAccount, setSelectedCount] = useState('Phases');

  function handleAccountChange(ev) {
    setSelectedCount(ev.target.value);
  }
  // useEffect(()=>{
  //   const res =  axios.get('https://backendtimeline.herokuapp.com/tasks/due-tasks/no-deadline').then((response) => {
  //   setTasks(response.data);
  // })

  return (
    <div className="flex flex-col justify-center h-full p-24">
      <div className="flex items-center flex-1">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          check_box
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-16 md:text-24 mx-12 font-semibold"
        >
          Task
        </Typography>

        <motion.div
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
      </motion.div>
      </div>

      
    </div>
  );
}

export default TodoSidebarHeader;
