import React, { Component } from 'react';

import axios from "axios/index";
import Message from './Message';
import CardModel from './Card';
import QuickReplies from './QuickReplies';
import Card from '@material-ui/core/Card';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
// import 'materialize-css/dist/css/materialize.min.css';
// import './chatbot.css';

const useStyles = makeStyles((theme) => ({
    messageRow: {
      '&.contact': {
        '& .bubble': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.getContrastText(theme.palette.background.paper),
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          '& .time': {
            marginLeft: 12,
          },
        },
        '&.first-of-group': {
          '& .bubble': {
            borderTopLeftRadius: 20,
          },
        },
        '&.last-of-group': {
          '& .bubble': {
            borderBottomLeftRadius: 20,
          },
        },
      },
      '&.me': {
        paddingLeft: 40,
  
        '& .avatar': {
          order: 2,
          margin: '0 0 0 16px',
        },
        '& .bubble': {
          marginLeft: 'auto',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          '& .time': {
            justifyContent: 'flex-end',
            right: 0,
            marginRight: 12,
          },
        },
        '&.first-of-group': {
          '& .bubble': {
            borderTopRightRadius: 20,
          },
        },
  
        '&.last-of-group': {
          '& .bubble': {
            borderBottomRightRadius: 20,
          },
        },
      },
      '&.contact + .me, &.me + .contact': {
        paddingTop: 20,
        marginTop: 20,
      },
      '&.first-of-group': {
        '& .bubble': {
          borderTopLeftRadius: 20,
          paddingTop: 13,
        },
      },
      '&.last-of-group': {
        '& .bubble': {
          borderBottomLeftRadius: 20,
          paddingBottom: 13,
          '& .time': {
            display: 'flex',
          },
        },
      },
    },
  }));
class Chatbot extends Component {
    messagesEnd;
    talkInput;
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            showBot: false,
        };
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        
      }
      

      componentDidUpdate() {
        
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        if ( this.talkInput ) {
            this.talkInput.focus();
        }
    }

    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: true});
    }

    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: false});
    }

      async df_text_query (queryText) {
        let says = {
            speaks: 'user',
            msg: {
                text : {
                    text: queryText
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says]});
        const res = await axios.post('https://backendtimeline.herokuapp.com/chatbot/api/df_text_query',  {text: queryText});
        console.log(res);
        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says]});
        }
    };
    
    
    async df_event_query(eventName) {
    
        const res = await axios.post('https://backendtimeline.herokuapp.com/chatbot/api/df_event_query',  {event: eventName});
    
        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }
    
            this.setState({ messages: [...this.state.messages, says]});
        }
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////
    resolveAfterXSeconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, x * 1000);
        })
    }
    async componentDidMount() {
        this.df_event_query('Welcome');
        await this.resolveAfterXSeconds(1);
    }
/////////////////////////////////////////////////////////////////////////////////
_handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();
    // switch (payload) {
    //     case 'training_masterclass':
    //         this.df_event_query('logging out');
    //     default:
    //         this.df_text_query(text);
    //         break;
    // }
    this.df_text_query(text);

}

renderCards(cards) {
  return cards.map((card, i) => <CardModel key={i} payload={card.structValue}/>);
}



// renderOneMessage(message, i) {

//     if (message.msg && message.msg.text && message.msg.text.text) {
//         return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
//     } else if (message.msg && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values

//         return <div key={i}>
//             <div className="card-panel grey lighten-5 z-depth-1">
//                 <div style={{overflow: 'hidden'}}>
//                     <div className="col s2">
//                         <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
//                     </div>
//                     <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
//                         <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
//                             {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     }
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// renderOneMessage(message, i) {
//     if (message.msg && message.msg.text && message.msg.text.text) {
//         return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
//     } else if (message.msg && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values
//         return <div key={i}>
//             <div className="card-panel grey lighten-5 z-depth-1">
//                 <div style={{overflow: 'hidden'}}>
//                     <div className="col s2">
//                         <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
//                     </div>
//                     <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
//                         <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
//                             {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     } else if (message.msg &&
//         message.msg.payload &&
//         message.msg.payload.fields &&
//         message.msg.payload.fields.quick_replies
//     ) {
//         return <QuickReplies
//             text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
//             key={i}
//             replyClick={this._handleQuickReplyPayload}
//             speaks={message.speaks}
//             payload={message.msg.payload.fields.quick_replies.listValue.values}/>;
//     }
// }

renderOneMessage(message, i) {

    if (message.msg && message.msg.text && message.msg.text.text) {
        return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;

    } else if (message.msg && message.msg.payload.fields && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values

            return <div key={i}>
                <Paper sx={{ maxWidth: 345 }}>
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                        <ListItem align="left" class="material-icons" >directions_subway_filled</ListItem>
                            {/* <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a> */}
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
  
    // } else if (message.msg &&
    //     message.msg.payload &&
    //     message.msg.payload.fields.Quick_Replies
    // ) {
    //     return <QuickReplies
    //         text={message.msg.payload.text ? message.msg.payload.text : null}
    //         key={i}
    //         replyClick={this._handleQuickReplyPayload}
    //         speaks={message.speaks}
    //         payload={message.msg.payload.fields.Quick_Replies}/>;
    // }
  } else if (message.msg &&
    message.msg.payload &&
    message.msg.payload.fields &&
    message.msg.payload.fields.Quick_Replies
) {
    return <QuickReplies
        text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
        key={i}
        replyClick={this._handleQuickReplyPayload}
        speaks={message.speaks}
        payload={message.msg.payload.fields.Quick_Replies.listValue.values}/>;
}
}

    renderMessages(returnedMessages) {
      if (returnedMessages) {
          return returnedMessages.map((message, i) => {
            return this.renderOneMessage(message, i);
              }
          )
      } else {
          return null;
      }
    }
    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }
    render() {
        // if (this.state.showBot) {
            return (
        

                <div className='container' style={{ minHeight: 0, maxHeight: 900, width:320, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray',color:'blue'}}>
                     <Grid item xs={12 } style={{ color: 'white', backgroundColor: '#221266' }} align="center">
                        <Typography variant="h4"  className="header-message">ChatBot</Typography>
                    </Grid>
                    <nav>
                        <div className="nav-wrapper #6a1b9a ">
                            {/* <a href="/" className="brand-logo">ChatBot</a> */}
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                {/* <li><a href="/" onClick={this.hide}>Close</a></li> */}
                            </ul>
                        </div>
                    </nav>

                    <div id="chatbot"  style={{ minHeight: 388, maxHeight: 388, width:'100%', overflow: 'auto',backgroundColor:'#6a1b9a purple darken-3'}}>

                        {this.renderMessages(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }}
                             style={{ float:"left", clear: "both" }}>
                        </div>
                    </div>
                    <div className=" col s12" >
                    <Paper className="flex items-center relative rounded-24 shadow">
                        <TextField
                        autoFocus={false}
                        id="user_says"
                        className="flex-1"
                        InputProps={{
                            disableUnderline: true,
                            classes: {
                            root: 'flex flex-grow flex-shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8',
                            input: '',
                            },
                            placeholder: 'Type your message',
                        }}
                        ref={(input) => { this.talkInput = input; }} 
                        onKeyPress={this._handleInputKeyPress} 
                        />
                        <IconButton className="absolute ltr:right-0 rtl:left-0 top-0" type="submit">
                        <Icon className="text-24" color="action">
                            send
                        </Icon>
            </IconButton>
          </Paper>
                        {/* <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} ref={(input) => { this.talkInput = input; }} placeholder="type a message:"  onKeyPress={this._handleInputKeyPress} id="user_says" type="text" /> */}
                    </div>

                </div>
                
            );
        // } else {
        //     return (
                
        //         <div  style={{  position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray',color:'purple'}} >
        //             <nav>
        //                 <div className="nav-wrapper #6a1b9a purple darken-3">
                        
        //                     <ul id="nav-mobile" className="right hide-on-med-and-down">
        //                         <li><a href="/" onClick={this.show}>Show</a></li>
        //                     </ul>
        //                 </div>
        //             </nav>
        //             <div ref={(el) => { this.messagesEnd = el; }}
        //                  style={{ float:"left", clear: "both" }}>
        //             </div>
                    
        //         </div>
                
        //         // <div className='container relative' style={{ minHeight: 40, maxHeight: 500, width:400,position: 'absolute', bottom: 0.25, right: 0.25, color:'purple'}}>
        //         //     <i class="bi bi-robot lg w-100 fa-lg fa-10x " href="/" onClick={this.show}></i>
                    
        //         //     <div ref={(el) => { this.messagesEnd = el; }}
        //         //           style={{ float:"left", clear: "both" }}>
        //         //     </div>
        //         //     </div>
        //     );
        // }
    }
}

export default Chatbot;