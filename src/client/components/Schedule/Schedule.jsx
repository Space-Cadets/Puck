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
      start: 10,
      end: 14,
    };

    this.classes = [
      {
        crn: 12314,
        start: 10,
        end: 11,
        startStr: "10:00AM",
        endStr: "11:00AM",
        color: "orange",
        section: "001",
        class: "1052",
        department: "CSC",
        name: "Algorithms and Data Structures II",
        instructors: ["Dr. Joyce"],
      },
      {
        crn: 13314,
        start: 12,
        end: 14,
        startStr: "12:00PM",
        endStr: "2:00PM",
        color: "lightblue",
        section: "001",
        class: "2053",
        department: "CSC",
        name: "Algorithms and Data Structures III",
        instructors: ["Dr. Kim"],
      }]
  }

  //NOTE: should fix this clunky function, it fits oddly with UI
  //draw the times for the times that haven't been written yet
  generateTimes(classes) {
      const height = this.state.end - this.state.start;
      const start = this.state.start;
      let getTop = (el, start, height) => ({ top: `${((el - start) * 100 / height)}%` });
      let timeEls = [];
      classes.forEach(c => {
        timeEls.push(
          <div key={c.start}
               className="schedule-time"
               style={getTop(c.start, start, height)}>
            {c.startStr}
          </div>
        );
        timeEls.push(
          <div key={c.end}
               className="schedule-time"
               style={getTop(c.end, start, height)}>
            {c.endStr}
          </div>
        );
      });
      return timeEls;
  }

	render() {
		return (
      <div id="schedule-container" className="container columns">
        <div id="schedule" className="columns">
          <div id="schedule-time" className="column">
            {this.generateTimes(this.classes)}
          </div>
          <div className="column">
            <p className="notification is-info">Monday</p>
            <div className="day-container">
              <Day start={10} end={14} classes={this.classes}/>
            </div>
          </div>
          <div className="column">
            <p className="notification is-primary">Tuesday</p>
            <div className="day-container">
              <Day start={10} end={14} classes={this.classes}/>
            </div>
          </div>
          <div className="column">
            <p className="notification is-info">Wednesday</p>
            <div className="day-container">
              <Day start={10} end={14}/>
            </div>
          </div>
          <div className="column">
            <p className="notification is-primary">Thursday</p>
            <div className="day-container">
              <Day start={10} end={14} classes={this.classes}/>
            </div>
          </div>
          <div className="column">
            <p className="notification is-info">Friday</p>
            <div className="day-container">
              <Day start={10} end={14} classes={this.classes}/>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
