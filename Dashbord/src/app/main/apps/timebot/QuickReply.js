import React from 'react';


import { Button,Grid, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
// import 'materialize-css/dist/css/materialize.min.css';

// const QuickReply = (props) => {
//     if (props.reply.structValue.fields.payload) {
//         return (
//             <a style={{ margin: 3}} href="/" className="btn-floating btn-large waves-effect waves-light red"
//                onClick={(event) =>
//                    props.click(
//                        event,
//                        props.reply.structValue.fields.payload.stringValue,
//                        props.reply.structValue.fields.text.stringValue
//                    )
//                }>
//                 {props.reply.structValue.fields.text.stringValue}
//             </a>
//         );
//     } else {
//         return (
//             <a style={{ margin: 3}} href={props.reply.structValue.fields.link.stringValue}
//                className="btn-floating btn-large waves-effect waves-light red">
//                 {props.reply.structValue.fields.text.stringValue}
//             </a>
//         );
//     }

// };

// const QuickReply = (props) => {
//     if (props.reply.payload) {
//         return (
//             <a style={{ margin: 3}} href="/" className="btn-floating btn-large waves-effect waves-light red"
//                onClick={(event) =>
//                    props.click(
//                        event,
//                        props.reply.payload,
//                        props.reply.text
//                    )
//                }>
//                 {props.reply.text}
//             </a>
//         );
//     } else {
//         return (
//             <a style={{ margin: 3}} href={props.reply.link}
//                className="btn-floating btn-large waves-effect waves-light red">
//                 {props.reply.text}
//             </a>
//         );
//     }

// };
const QuickReply = (props) => {
    if (props.reply.structValue.fields.payload) {
        return (
            <Button style={{ margin: 3}} href="/" className="btn-floating btn-large waves-effect waves-light red"
               onClick={(event) =>
                   props.click(
                    event,
                    props.reply.structValue.fields.payload.stringValue,
                    props.reply.structValue.fields.text.stringValue
                   )
               }>
                {props.reply.structValue.fields.text.stringValue}
            </Button>
        );
    } else {
        return (
            <Button style={{ margin: 3}} href={props.reply.structValue.fields.link.stringValue}
               className="btn-floating btn-large waves-effect waves-light red">
                {props.reply.structValue.fields.text.stringValue}
            </Button>
        );
    }

};

export default QuickReply;