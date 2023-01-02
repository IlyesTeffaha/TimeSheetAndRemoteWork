import React, { Component } from 'react';
import QuickReply from './QuickReply';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import 'materialize-css/dist/css/materialize.min.css';
class QuickReplies extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(event, payload, text) {
        this.props.replyClick(event, payload, text);
    }

    renderQuickReply(reply, i) {
        return <QuickReply key={i} click={this._handleClick} reply={reply} />;
    }

    renderQuickReplies(quickReplies) {
        if (quickReplies) {
            return quickReplies.map((reply, i) => {
                    return this.renderQuickReply(reply, i);
                }
            )
        } else {
            return null;
        }
    }

//     render() {
//         return (
//             
//                 <div className="card-panel grey lighten-5 z-depth-1">
//                     <div className="row valign-wrapper">
//                         <div className="col s2">
//                             <a href="/" className="">{this.props.speaks}</a>
//                         </div>
//                         <div id="quick-replies" className="col s10">
//                             {this.props.text && <p>
//                                 {/* {this.props.text} */}
//                                 {this.props.text.stringValue}
//                             </p>
//                             }
//                             {this.renderQuickReplies(this.props.payload)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

render() {
    return (
        <div className="col s12 m8 offset-m2 l6 offset-l3">
        <Card sx={{ maxWidth: 345 }}>
                 
                        <div className="row valign-wrapper">
                             <CardHeader>
                                <a href="/" className="">{this.props.speaks}</a>
                            </CardHeader>
                            <CardContent id="quick-replies" className="col s10">
                                {this.props.text && <p>
                                    {this.props.text.stringValue}
                                </p>
                                }
                                {this.renderQuickReplies(this.props.payload)}
                            </CardContent>
                        </div>
                    
        
        </Card>
        </div>
    );
}
}

export default QuickReplies;