import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';
// import 'materialize-css/dist/css/materialize.min.css';
const CardModel = (props) => {
    return (
        // <div  style={{ height: 270, paddingRight:30, float: 'left',backgroundColor:'purple'}}>
        //     <div className="card #6a1b9a purple darken-3">
        //         <div className="card-image" style={{ width: 240}}>
                     
        //             <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} />
        //             <span className="card-title">{props.payload.fields.header.stringValue}</span>
        //         </div>
        //         <div className="card-content">
        //             {/* {props.payload.fields.description.stringValue} */}
        //             {/* <p> <a  href="/">{props.payload.fields.price.stringValue}</a></p> */}
        //         </div>
        //         <div className="card-action">
        //             {/* <a target="_blank" rel="noopener noreferrer" href={props.payload.fields.link.stringValue}>GET NOW</a> */}
        //         </div>
        //     </div>
        // </div>
        <Card sx={{ maxWidth: 345 }}>
            
        <CardActionArea>
          <CardMedia
            component="img"
            height="20"
            width="20"
            src={props.payload.fields.image.stringValue}
            
            alt={props.payload.fields.header.stringValue}
          />
         
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {props.payload.fields.header.stringValue}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
            {props.payload.fields.description.stringValue}
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" href='https://timesheetleague.herokuapp.com/apps/blog/blog-home'>
            LearnMore
          </Button>
        </CardActions>
      </Card>
        // <div  style={{ height: 270, paddingRight:30, float: 'left'}}>
        //     <div className="card">
        //         <div className="card-image" style={{ width: 240}}>
        //             <img alt={props.payload.header} src={props.payload.image} />
        //             <span className="card-title">{props.payload.header}</span>
        //         </div>
        //         <div className="card-content">
        //             {props.payload.description}
        //             {/* <p> <a href="/">{props.payload.price}</a></p> */}
        //         </div>
        //         <div className="card-action">
        //             <a target="_blank" rel="noopener noreferrer" href={props.payload.link}>GET NOW</a>
        //         </div>
        //     </div>
        // </div>
    );
};

export default CardModel;