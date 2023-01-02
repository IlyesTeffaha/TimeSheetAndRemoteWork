import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import * as yup from 'yup';
import _ from '@lodash';
import React,{useState}from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import { useEffect} from 'react';
import GoogleLogin from "react-google-login";









const useStyles = makeStyles((theme) => ({
  root: {},
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function LoginPageGoogle() {

  const [userData, setUserData] = useState({});

  


 



  const classes = useStyles();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    //reset(defaultValues);
  }
  const history = useHistory();
  const responseSuccessGoogle =(response)=>{
   console.log(response);
   axios({
    method: "POST",
    url:"https://backendtimeline.herokuapp.com/userprofile/googlelogin" ,
    data:{tokenId:response.tokenId}
   }).then(response=>{
      console.log("Google Login Success",response.data.user.email);
      localStorage.setItem("emailvalue",response.data.user.email);
   })
   history.push('/pages/profile')
   return false;  
  }
  const responseErrorGoogle =(response)=>{

  }

  

  

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto items-center justify-center p-16 sm:p-32'
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <img className="w-128 m-32" src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg" alt="logo" />

              <Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
                Login  Google
              </Typography>
              <form action="AboutTab.js,EditTab.js,ProfilePage.js" 
                name="loginForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
              <GoogleLogin
    clientId="858670823663-h4tt0ejbnnevqmo298ki42uqa252lho3.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />,
              
              </form>
           
            </CardContent>
          </Card>
        </motion.div>
       
      </div>
     
                    
    </div>
    
    );
}

export default LoginPageGoogle;