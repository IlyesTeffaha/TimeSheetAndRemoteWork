import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState,useRef } from 'react';
import {useHistory} from 'react-router-dom'

////////////////////////////////////////////////////////////////
import Radio from '@material-ui/core/Radio';
import Formsy from 'formsy-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
    CheckboxFormsy,
    FuseChipSelectFormsy,
    RadioGroupFormsy,
    SelectFormsy,
    TextFieldFormsy
} from '@fuse/core/formsy';
////////////////////////////////////////////////////////////////
import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
///////////////////////


import RadioGroup from '@material-ui/core/RadioGroup';



import FormControl from '@material-ui/core/FormControl';


import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';







////////////////////////////////////////////////////////////////




function EditTab() {
  //localStorage.setItem("namevalue",data.name);
  ///////////
  const valeur =localStorage.getItem("emailvalue");
  const valeurgender =localStorage.getItem("gendervalue");
  const valeurbirthday =localStorage.getItem("birthdayvalue");
  const valeuraboutme =localStorage.getItem("aboutmevalue");
  const valeurname =localStorage.getItem("namevalue");
  const valeuroccupation =localStorage.getItem("occupationvalue");
  const valeurskill =localStorage.getItem("skillvalue");
  const valeurjob =localStorage.getItem("jobvalue");
  const valeuradress =localStorage.getItem("adressvalue");
  const valeurtel =localStorage.getItem("telvalue");
  const valeurstatus =localStorage.getItem("statusvalue");

  
  //////////
  //const [data, setData] = useState(null);
  const test = (x) => x + 1;

 /* useEffect(() => {
    axios.get('/api/profile/about').then((res) => {
      setData(res.data);
    });
  }, []);*/

 // if (!data) {
   // return null;
  //}

  //const { general, work, contact, groups, friends } = data;

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };
  const [input,setInput] = useState({
    valgender: '',
    birthday: '',
    aboutme: '',
    category: '',
    
    tel:'',
    adress:'',
    occupation:'',
    skill:'',
    job:'',
    status:''
  })
  const[gender,setGender] = useState(valeurgender);
  const[birthday,setBirthday] = useState(valeurbirthday);
  const[aboutme,setAboutMe] = useState(valeuraboutme);
  const[name,setName] = useState(valeurname);
  const[tel,setTel] = useState(valeurtel);
  const[adress,setAdress] = useState(valeuradress);
  const[occupation,setOccupation] = useState(valeuroccupation);
  const[skill,setSkill] = useState(valeurskill);
  const[job,setJob] = useState(valeurjob);
  const[status,setStatus] =useState(valeurstatus)
 

  /*function onChange(event){
    const {name,value}=event.target;
    setInput(prevInput=>{
      return{
        ...prevInput,
        [name]:value
      }
    })

  }*/
  
  
  function handleClick(event){
    event.preventDefault();
    //console.log(input);
   /*const newUser={
    gender: input.gender,
    birthday: input.birthday,
    aboutme: input.aboutme,
    category: input.category,
    email:input.email,
    tel:input.tel,
    adress:input.adress,
    occupation:input.occupation,
    skill:input.skill,
    job:input.job,
    status:input.status
     

   };*/
 
   const utilisateur={gender,birthday,aboutme,name,tel,adress,occupation,skill,job,status}
   console.log(utilisateur);
   axios.put(`https://backendtimeline.herokuapp.com/userprofile/put/${valeur}`,utilisateur) 
   
 
   
              
}
const history = useHistory();
function redirect(){
history.push('/pages/auth/login')
}
////////////////////
const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

const handleDateChange = (date) => {
  setBirthday(date);
};
////////////////////


//////////////
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="md:flex max-w-2xl">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  General Information
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-20">
                <Typography className="font-semibold mb-6 text-15">Gender</Typography>
                {/* <Formsy>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="name"
                    label="Gender"
                    onChange={(e)=>setGender(e.target.value)}
                    value={valeurgender}
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4',
                    }}
                    required
                />
                </Formsy> */}
                <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1"   onChange={(e)=>setGender(e.target.value)} >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" /></RadioGroup></FormControl>


              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Birthady</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-between">
                <KeyboardDatePicker
          disableToolbar
          //variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={birthday}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
                </Grid>
                </MuiPickersUtilsProvider>
                </div>


                
              
              
              

              

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">About Me</Typography>
                <Formsy>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="name"
                    label="About me"
                    onChange={(e)=>setAboutMe(e.target.value)}
                    value={valeuraboutme}
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4',
                    }}
                    required
                />
                </Formsy>
              </div>
              <div className="mb-20">
                <Typography className="font-semibold mb-6 text-15">name</Typography>
                <Formsy>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="name"
                    label="Name"
                    onChange={(e)=>setName(e.target.value)}
                    value={valeurname}
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4',
                    }}
                    //required
                />
                </Formsy>
               
                
               
              </div>
            </CardContent>
          </Card>

          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Work
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Occupation</Typography>
                <Formsy>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="name"
                    label="Profession"
                   onChange={(e)=>setOccupation(e.target.value)}
                    value={valeuroccupation}
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4',
                    }}
                    //required
                />
                </Formsy>
                
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Skills</Typography>
                <Formsy>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="name"
                    label="Skills"
                    onChange={(e)=>setSkill(e.target.value)}
                    value={valeurskill}
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4',
                    }}
                    required
                />
                </Formsy>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Jobs</Typography>
                <Formsy>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="name"
                    label="previous jobs"
                    onChange={(e)=>setJob(e.target.value)}
                    value={valeurjob}
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4',
                    }}
                   // required
                />
                </Formsy>
              </div>
            </CardContent>
          </Card>

          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Contact
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Address</Typography>
                <Formsy>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="name"
                    label="CurrentAdress"
                    onChange={(e)=>setAdress(e.target.value)}
                    value={valeuradress}
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4',
                    }}
                    required
                />
                </Formsy>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Tel.</Typography>
                <Formsy>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="name"
                    label="Tel"
                    onChange={(e)=>setTel(e.target.value)}
                    value={valeurtel}
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4',
                    }}
                    required
                />
                </Formsy>

               
              </div>

              

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Status</Typography>

                 <Formsy>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="name"
                    label="Status"
                    onChange={(e)=>setStatus(e.target.value)}
                    value={valeurstatus}
                    validations={{
                        minLength: 4,
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4',
                    }}
                    required
                />
                </Formsy> 
                {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={status.onligne} onChange={(e)=>setStatus( e.target.value)} name="onligne" />}
          label="on ligne"
        /></FormGroup> */}
              </div>
            </CardContent>
          </Card>
         
<div className="flex my-48 items-center">

<Button className="mx-8" variant="contained" color="secondary" type="submit"  onClick={handleClick}>Save Changes</Button>
<Button className="mx-8"type="button" onClick={redirect}> GoBack </Button>



</div>

                        
          
        </div>
        

       
      </div>
      
      
    </motion.div>
  );
}

export default EditTab;




