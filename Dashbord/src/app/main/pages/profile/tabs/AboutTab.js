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
import { useEffect, useState } from 'react';





function AboutTab() {

 
  const valeur =localStorage.getItem("emailvalue");
  /////
  
  //////
  const [data, setData] = useState(null);
  const test = (x) => x + 1;

  useEffect(() => {
    axios.get(`https://backendtimeline.herokuapp.com/userprofile/get/${valeur}`).then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) {
    return null;
  }

  const { general, work, contact, groups, friends } = data;

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
  localStorage.setItem("namevalue",data.name);
  localStorage.setItem("gendervalue",data.gender);
  localStorage.setItem("birthdayvalue",data.birthday);
  localStorage.setItem("aboutmevalue",data.aboutme);
  localStorage.setItem("occupationvalue",data.occupation);
  localStorage.setItem("skillvalue",data.skill);
  localStorage.setItem("jobvalue",data.job);
  localStorage.setItem("adressvalue",data.adress);
  localStorage.setItem("telvalue",data.tel);
  localStorage.setItem("statusvalue",data.status);
   
  return (
    <motion.div variants={container} initial="hidden" animate="show" action="ProfilePage.js">
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
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Gender</Typography>
                <Typography>{data.gender}</Typography>
                
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Birthday</Typography>
                <Typography>{data.birthday.split("T")[0]}</Typography>
              </div>

              <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">About Me</Typography>
                <Typography>{data.aboutme}</Typography>
               
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15" id ="name">name</Typography>
                <Typography>{data.name}</Typography>
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
                <Typography>{data.occupation}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Skills</Typography>
                <Typography>{data.skill}</Typography>
              </div>

              <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">Job</Typography>
                <Typography>{data.job}</Typography>
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
                <Typography>{data.adress}</Typography>
              </div>

              <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">Tel</Typography>
                <Typography>{data.tel}</Typography>
              </div>

              <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">Email</Typography>
                <Typography>{data.email}</Typography>
                
              </div>
              

              <div className="mb-24">
              <Typography className="font-semibold mb-4 text-15">Status</Typography>
                <Typography>{data.status}</Typography>
              </div>
              
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:w-320">
          

          
        </div>
      </div>
      
    </motion.div>
    
    
    );
}

export default AboutTab;
