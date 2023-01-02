import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import React,{useState}from "react";
import axios from "axios";

import {useHistory} from 'react-router-dom';
import AboutTab from '../../profile/tabs/AboutTab';



//import AboutTab from "./LoginPageConfig";



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

function LoginPageFace() {
  const [data,setData]=useState({});
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [repositories,setRepositories]=useState([]);
/*const onChangeHandler =e=>{
  setEmail(e.target.value);
  //setPassword(e.target.value);
}*/

const history = useHistory();
  


const submitHandler =async e =>{
 
  e.preventDefault();
  const profile =await fetch(`https://backendtimeline.herokuapp.com/userprofile/loginface/${input.email}`);
  const profileJson= await profile.json();
  console.log(profileJson);
  //const repositories=await fetch(profileJson.repos_url);
  //const repoJson=repositories.json();
 // console.log(repoJson);
 const email = document.getElementById("email").value;
 localStorage.setItem("emailvalue",email);
 history.push('/pages/profile')
 return false;



   
 
};


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
   const [input,setInput] = useState({
    
    email: ''
    
   
  })
  function onChange(event){
    const {name,value}=event.target;
    setInput(prevInput=>{
      return{
        ...prevInput,
        [name]:value
      }
    })

  }
  function handleClick(event){
   // let history=useHistory();
    //history.push('/pages/profile');
    event.preventDefault();
    console.log(input);
   const newUser={
     
     email:input.email,
     
     
     

   };
   
 
  
   axios.post('https://backendtimeline.herokuapp.com/user/loginface',newUser) 
   console.log("logged in") 
 
  
  
  
   
   
  
   
              
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
                Login to your account
              </Typography>

              <form action="AboutTab.js,EditTab.js,ProfilePage.js" 
                name="loginForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Email"
                      autoFocus
                      type="email"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                      onChange={onChange}
                      value={input.email}
                      id="email"
                    />
                  )}
                />

               

              

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="LOG IN"
                 // disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                  onClick={submitHandler}
                  
               
                  
                >
                  Login
                </Button>
                
               
              </form>

              

            

            
              

             
            </CardContent>
          </Card>
        </motion.div>
       
      </div>
     
                    
    </div>
    
    );

}

export default LoginPageFace;