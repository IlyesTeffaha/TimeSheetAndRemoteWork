import React from 'react';
import {BrowserRouter,Routes  ,Route,Switch} from 'react-router-dom';



import Task from './components/Task';
import Timesheet from './components/Time/timesheet';
const Rou = () => {


  return (

    <BrowserRouter>
    <Switch>
     
      
      <Route path="/tasks" element={<Task/>}/>
      <Route path="/timesheet" element={<Timesheet/>}/>
      
        
        </Switch>
   
        </BrowserRouter>
  );
};

export default Rou;