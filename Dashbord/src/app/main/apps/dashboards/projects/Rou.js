import React from 'react';
import {BrowserRouter,Routes ,Switch ,Route} from 'react-router-dom';
import Phase from './components/Phase';
import Project from './components/Project';
const Rou = () => {


  return (

    <BrowserRouter>
    <Switch> 
      <Route path="/phase" element={<Phase/>}></Route>
      <Route path="/project" element={<Project/>}>
        </Route></Switch>
   
        </BrowserRouter>
  );
};

export default Rou;