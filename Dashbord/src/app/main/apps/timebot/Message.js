import { Grid, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import 'materialize-css/dist/css/materialize.min.css';
const useStyles = makeStyles({
    table: {
      minWidth: 100,
    },
    chatSection: {
      width: '100%',
      height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '20vh',
      overflowY: 'auto'
    },
    cont: {
      height: '70vh',
      overflowY: 'auto',
      position: 'absolute', bottom: 0, right: 0
    }
  });

const Message = (props) => {
    
    const classes = useStyles();

      
    return (
        <Paper>
           
        {/* <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel grey lighten-5 z-depth-1"> */}
                {/* <div className="row valign-wrapper"> */}
                <List >
                    {/* {props.speaks==='bot' &&
                    <div className="col s2">
                        <a href="/" className="btn waves-effect waves-light">{props.speaks}</a>
                    </div>
                    } */}
                     {props.speaks==='bot' &&
                    <ListItem sx={{ m: 2 }}  >
                    <Grid container mb={5}>
                    <Grid item xs={4}>
                       
                       <ListItem align="left" class="material-icons" >directions_subway_filled</ListItem>
                       </Grid>
                        {/* <Grid item xs={4}>
                            <ListItemText align="left" >{props.speaks}</ListItemText>
                        </Grid> */}
                        <Grid item xs={8} style={{borderRadius: '5px', overflow: 'hidden', color: 'white', backgroundColor: 'black',margin:2,border: '1px solid lightgray' }}>
                            <ListItemText align="left" > {props.text}</ListItemText>
                        </Grid>
                    </Grid>
                    </ListItem>
                    }
                    
                    {/* <div className="col s10">
                      <span className="black-text">
                        {props.text}
                      </span>
                    </div> */}
                    {props.speaks==='user' &&
                    // <div className="col s2">
                    //     <a href="/" className="btn waves-effect waves-light">{props.speaks}</a>
                    // </div>
                    <ListItem  >
                    <Grid container>
                    
                        <Grid item xs={12} align="right">
                       
                        <ListItem align="right" class="material-icons" >account_circle</ListItem>
                        </Grid>
                        {/* <Grid item xs={4}>
                            <ListItemText align="right" >{props.speaks}</ListItemText>
                            
                        </Grid> */}
                        <Grid item xs={12} style={{borderRadius: '5px', overflow: 'hidden', color: 'white', backgroundColor: '#337066',margin:2,borderraduis: '1px solid lightgray'}}>
                            
                            <ListItemText align="right" >{props.text}</ListItemText>
                        </Grid>
                        
                    </Grid>
                    </ListItem>
                    }
                </List>
                {/* </div> */}
            {/* </div>
        </div> */}
        </Paper>

    );
};

export default Message;
