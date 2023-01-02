import React from "react";
import Timesheet from "./timesheet";

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }
  class Popups extends React.Component {
    constructor() {
      super();
      this.state = {
        showPopup: false
      };
    }
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    render() {
      return (
        <div className='app'>
          
          <button onClick={this.togglePopup.bind(this)}>timesheet</button>
         
          
          {this.state.showPopup ? 
            // <Popup
            //   text='Close Me'
            //   closePopup={this.togglePopup.bind(this)}
            // />
            <Timesheet/>
            : null
          }
        </div>
      );
    }
  };

  export default Popups;