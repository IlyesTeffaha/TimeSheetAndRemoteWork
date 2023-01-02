
// import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export const Header = (props) => {
  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.data ? props.data.title : 'Loading'}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.data ? props.data.paragraph : 'Loading'}
          </Typography>
          <Button color="inherit">Learn More</Button> */}
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Learn More
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    // </Toolbar>
    // </AppBar>
    // </Box>
  )
}
