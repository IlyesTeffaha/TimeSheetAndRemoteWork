import React from "react";
import ReactDOM from "react-dom";

import DaySummary from "./DaySummary";
// import { minsToTimeStr, timeStrToMins } from "./time-utils";

import "./style.css";

class Timesheet extends React.Component {
  constructor() {
    super();
    this.dailyValues = [0, 0, 0, 0, 0];
    this.weeklyRequired = 35 * 60; //35 hrs required per week (testing)
    this.state = {
      weeklySummary: 0,
      overTime: 0
    };
  
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

  dailySummary = (d, v) => {
    this.dailyValues[d] = v;
    let sum = this.dailyValues.reduce((a, b) => {
      return a + b;
    });
    let ot = sum - this.weeklyRequired;

    this.setState({ weeklySummary: this.minsToTimeStr(sum) });
    this.setState({ overTime: this.minsToTimeStr(ot) });
  };

  render() {
    return (
      <div className="container border">
        
        <table className="days-container">
          <DaySummary
            dayName="Monday"
            changeNotify={v => this.dailySummary(0, v)}
          />
          <DaySummary
            dayName="Tuesday"
            changeNotify={v => this.dailySummary(1, v)}
          />
          <DaySummary
            dayName="Wednesday"
            changeNotify={v => this.dailySummary(2, v)}
          />
          <DaySummary
            dayName="Thursday"
            changeNotify={v => this.dailySummary(3, v)}
          />
          <DaySummary
            dayName="Friday"
            changeNotify={v => this.dailySummary(4, v)}
          />
        </table>
        <h3 className="primary-col">Weekly Total {this.state.weeklySummary}</h3>
        <h3 className="primary-col">
          Weekly Quota {this.minsToTimeStr(this.weeklyRequired)}
        </h3>
        <h3
          className={
            this.timeStrToMins(this.state.overTime) > 0 ? "primary-col" : ""
          }
        >
          Overtime {this.state.overTime}
        </h3>
      </div>
    );
  }
}

export default Timesheet;