import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import AboutTab from './tabs/AboutTab';
import {useHistory} from 'react-router-dom'
//import PhotosVideosTab from './tabs/PhotosVideosTab';
//import TimelineTab from './tabs/TimelineTab';
import EditTab from './tabs/EditTab';

const useStyles = makeStyles((theme) => ({
  avatar: {
    border: `4px solid ${theme.palette.background.default}`,
  },
  topBg: {
    background: 'url("https://free4kwallpapers.com/uploads/originals/2015/07/22/natural-mirror.jpg")!important',
    backgroundSize: 'cover!important',
    backgroundPosition: 'center center!important',
  },
  layoutHeader: {
    background: 'none',
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('md')]: {
      height: 240,
      minHeight: 240,
    },
  },
}));

function ProfilePage() {
  const classes = useStyles();
  const [profileimg, setProfileImg] = useState('https://cdn4.iconfinder.com/data/icons/man-6/48/man-03-512.png');
  const [selectedTab, setSelectedTab] = useState(0);


  const valeur =localStorage.getItem("namevalue");
  
  localStorage.setItem("profileimg",profileimg);
  const history = useHistory();
  function logout(){
    localStorage.clear();
    history.push('/pages/auth/login')
  }
  function handleTabChange(event, value) {
    setSelectedTab(value);
  }
  function imageHandler(e){
    const reader = new FileReader();
    reader.onload = ()=>{
      if(reader.readyState===2){
        setProfileImg(reader.result)
       
       
      }
    }
    reader.readAsDataURL(e.target.files[0])
    console.log("hi")
  }

  return (
    <FusePageSimple
      classes={{
        topBg: classes.topBg,
        header: classes.layoutHeader,
        wrapper: 'bg-transparent',
        content: 'w-full max-w-2xl mx-auto',
        toolbar: 'w-full max-w-2xl mx-auto relative flex flex-col min-h-auto h-auto items-start',
      }}
      header={<></>}
      contentToolbar={
        <>
          <div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
              <Avatar
                className={clsx(classes.avatar, '-mt-64  w-128 h-128')}
                src={profileimg}
                id="img"
              />
              <input type="file"name="image-upload" id = "input" accept ="image*/"onChange={imageHandler} ></input>
              <div className="label">
                <label htmlFor="input" className="img-upload">
                <i className="material-icons">addphoto</i>Choose Your Picture
                </label>
                

              </div>
            </motion.div>
            <div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              >
                <Typography
                  className="md:px-16 text-24 md:text-32 font-semibold tracking-tight"
                  variant="h4"
                  color="inherit"
                  
                >
                 {valeur}
                </Typography>
              </motion.div>

              <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
                
              </div>
            </div>
          </div>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons="off"
            className="w-full px-24 -mx-4 min-h-40"
            classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
            TabIndicatorProps={{
              children: <Divider className="w-full h-full rounded-full opacity-50" />,
            }}
          >
            {/* <Tab */}
              {/* className="text-14 font-semibold min-h-40 min-w-64 mx-4" */}
              {/* disableRipple */}
              {/* label="timeline" */}
            {/* /> */}
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4"
              disableRipple
              label="About Me"
            />
            
            {/* <Tab */}
              {/* className="text-14 font-semibold min-h-40 min-w-64 mx-4" */}
              {/* disableRipple */}
              {/* label="photos and videos" */}
            {/* /> */}
             <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4"
              disableRipple
              label="Edit"
            />
            <Button className="mx-8"type="button" onClick={logout}>logout </Button>
          </Tabs>
        </>
      }
      content={
        <div className="p-16 sm:p-24">
          
          {selectedTab === 0 && <AboutTab />}
          
          {selectedTab === 1 && <EditTab />}
        </div>
      }
    />
  );
}

export default ProfilePage;
