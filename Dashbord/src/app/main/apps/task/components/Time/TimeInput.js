import React from "react";
import ReactDOM from "react-dom";

// import { minsToTimeStr, timeStrToMins } from "./time-util";

class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.currVal = "";
    this.state = {
      keyVal: "",
      formattedVal: this.props.default,
      minutes: 0
    };
    this.unformattedVal = "";
    this.inputRef = React.createRef();

    this.props.changeNotify(this.timeStrToMins(this.props.default));
  }


  timeStrToMins = (strTime) => {
    console.log(strTime);
    if (!strTime) return 1;
  
    let [h, m] = strTime.split(":");
  
    return Number(h) * 60 + Number(m);
  }
  
 minsToTimeStr=(val) =>{
    let sign = val > 0 ? "" : "-";
    val = val > 0 ? val : -val;
    let m = val % 60;
    let h = (val - m) / 60;
  
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
  
    return `${sign}${h}:${m}`;
  }

  onInputHandle = ev => {
    let val = ev.target.value;
    val = val.replace(/\D/g, "");

    if (val.length > 4) val = val.slice(0, 4);

    if (val) {
      if (val.length == 1) {
        if (Number(val) > 2) val = "0" + val;
      }
      if (val.length < 4) {
        this.currVal = val;
      } else if (val.length == 4) {
        let h = Number(val.slice(0, 2));
        let m = Number(val.slice(2));
        h = Math.min(h, 23);
        m = Math.min(m, 59);

        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;

        this.currVal = `${h}:${m}`;
      }
    } else {
      this.currVal = "";
    }

    let formattedVal = this.currVal;
    this.setState({ formattedVal: formattedVal });
    this.setState({ minutes: this.timeStrToMins(formattedVal) });
    this.props.changeNotify(this.timeStrToMins(formattedVal));
  };

  validateTimeInput(inputVal) {
    let val = inputVal.replace(/[^0-9]+/g, ""); //Remove all non-numeric characters

    if (!val) return "";

    if (val[0] > 2) return "0" + val;
  }

  render() {
    return (
      <div>
        <input
          className="time-input"
          type="text"
          onChange={this.onInputHandle}
          ref={this.inputRef}
          onClick={e => e.target.select()}
          onInput={this.onInputHandle}
          value={this.state.formattedVal}
        />
      </div>
    );
  }
}

export default TimeInput;