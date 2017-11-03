import React, { Component } from "react";
import './Schedule.css';
import Day from './Day.jsx';

//The schedule component will display a student's schedule by day (m-f),
//Split the data horizontally into day columns, then vertically flexible by time
//Start of day will only ever be 8:30 at earliest
export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.classes = [
      {
        crn: 12314,
        start: 10.5,
        end: 11,
        color: "orange",
        section: "001",
        class: "1052",
        department: "CSC",
        name: "Algorithms and Data Structures II",
        instructors: ["Dr. Joyce"],
      },
      {
        crn: 13314,
        start: 12.5,
        end: 14,
        color: "lightblue",
        section: "001",
        class: "2053",
        department: "CSC",
        name: "Algorithms and Data Structures III",
        instructors: ["Dr. Kim"],
      }]
  }
	render() {
		return (
      <div id="schedule-container" className="container">
        <div>
          <strong>credits: 0</strong>
        </div>
        <div id="schedule" className="columns">
          <div className="column">
            <p className="notification is-info">Monday</p>
            <div className="day-container">
              <Day start={9} end={14} classes={this.classes}/>
            </div>
          </div>
          <div className="column">
            <p className="notification is-primary">Tuesday</p>
            <div className="day-container">
              <Day start={9} end={14} classes={this.classes}/>
            </div>
          </div>
          <div className="column">
            <p className="notification is-info">Wednesday</p>
            <div className="day-container">
              <Day start={9} end={14}/>
            </div>
          </div>
          <div className="column">
            <p className="notification is-primary">Thursday</p>
            <div className="day-container">
              <Day start={9} end={14} classes={this.classes}/>
            </div>
          </div>
          <div className="column">
            <p className="notification is-info">Friday</p>
            <div className="day-container">
              <Day start={9} end={14} classes={this.classes}/>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
