import React, { Component } from "react";
import './Schedule.css';
import Day from './Day.jsx';

//The schedule component will display a student's schedule by day (m-f),
//Split the data horizontally into day columns, then vertically flexible by time
//Start of day will only ever be 8:30 at earliest
export default class Schedule extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.classes.length) {
      this.state = parseClassData(this.props.classes);
    } else {
      this.state = {
        sched: {
          m: [],
          t: [],
          w: [],
          r: [],
          f: [],
        },
        sections: {},
        start: 8.5,
        end: 21,
      }
    }
    /* rendering data looks like this
    [
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
      }
    ]
    */
  }

  //NOTE: should fix this clunky function, it fits oddly with UI
  //draw the times for the times that haven't been written yet
  generateTimes(classes) {
    const height = this.state.end - this.state.start;
    const start = this.state.start;
    let getTop = (el, start, height) => ({ top: `${((timeToNum(el) - start) * 100 / height)}%` });
    let timeEls = [];
    let times = new Set();
    classes.forEach(c => {
      c.schedule.forEach(s => {
        if (!times.has(s.startTime)) {
          timeEls.push(
            <div key={s.startTime}
                 className="schedule-time"
                 style={getTop(s.startTime, start, height)}>
              {getNormalTime(s.startTime)}
            </div>
          );
          times.add(s.startTime)
        }
        if (!times.has(s.endTime)) {
          timeEls.push(
            <div key={s.endTime}
                 className="schedule-time"
                 style={getTop(s.endTime, start, height)}>
              {getNormalTime(s.endTime)}
            </div>
          );
          times.add(s.endTime)
        }
      });
    });
    return timeEls;
  }

	render() {
		return (
      <div id="schedule-container" className="container columns">
        <div id="schedule" className="columns">
          <div id="schedule-time" className="column is-hidden-mobile">
            {this.generateTimes(Object.values(this.state.sections))}
          </div>
          <div className="column">
            <p className="day-label notification is-info">Monday</p>
            <div className="day-container">
              <Day courseData={this.state} classes={this.state.sched.m}/>
            </div>
          </div>
          <div className="column">
            <p className="day-label notification is-primary">Tuesday</p>
            <div className="day-container">
              <Day courseData={this.state} classes={this.state.sched.t}/>
            </div>
          </div>
          <div className="column">
            <p className="day-label notification is-info">Wednesday</p>
            <div className="day-container">
              <Day courseData={this.state} classes={this.state.sched.w}/>
            </div>
          </div>
          <div className="column">
            <p className="day-label notification is-primary">Thursday</p>
            <div className="day-container">
              <Day courseData={this.state} classes={this.state.sched.r}/>
            </div>
          </div>
          <div className="column">
            <p className="day-label notification is-info">Friday</p>
            <div className="day-container">
              <Day courseData={this.state} classes={this.state.sched.f}/>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

//Take time like 15:30 and get 15.5
function timeToNum(t) {
  let s = t.split(":");
  let num = parseInt(s[0]) + (parseInt(s[1]) / 60)
  console.log(t, num);
  return num;
}

//Take 15.5 and get out "15:30"
function numToTime(num) {
  let hour = Math.floor(num);
  let mins = num - Math.floor(num);
  mins = mins * 60;
  return `${hour}:${num}`;
}

//military to ampm
function getNormalTime(d) {
  let s = d.split(":");
  let hour = parseInt(s[0]);
  let mins = parseInt(s[1]);
  let ampm = hour >= 12 ? "PM" : "AM";
  if (hour > 12) {
    hour = hour - 12;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return `${hour}:${mins}${ampm}`;
}

//format section to display data
function format(section, index) {
  return {
    crn: section.crn,
    start: timeToNum(section.schedule[index].startTime),
    end: timeToNum(section.schedule[index].endTime),
    startStr: getNormalTime(section.schedule[index].startTime),
    endStr: getNormalTime(section.schedule[index].endTime),
    section: section.section,
    class: section.class,
    department: section.department,
    name: section.name,
    instructors: section.instructors,
    color: "lightblue"
  }
}

//break up classes into days, renderable
function parseClassData(classes) {
  let sched = {
    m: [],
    t: [],
    w: [],
    r: [],
    f: [],
  };
  let sections = {};
  let start = 10000;
  let end = 0;

  classes.forEach(c => {

    //write section to lookup table
    sections[c.crn] = c;

    //break schedule up into days
    c.schedule.forEach((s, i) => {
      if (timeToNum(s.startTime) < start)
        start = timeToNum(s.startTime);
      if (timeToNum(s.endTime) > end)
        end = timeToNum(s.endTime);
      switch (s.days) {
        case "M":
          sched.m.push(format(c, i));
          break;
        case "T":
          sched.t.push(format(c, i));
          break;
        case "W":
          sched.w.push(format(c, i));
          break;
        case "R":
          sched.r.push(format(c, i));
          break;
        case "F":
          sched.f.push(format(c, i));
          break;
        case "MWF":
          [sched.m, sched.w, sched.f].forEach(d => d.push(format(c, i)));
          break;
        case "TR":
          [sched.t, sched.r].forEach(d => d.push(format(c, i)));
          break;
        case "MW":
          [sched.m, sched.w].forEach(d => d.push(format(c, i)));
          break;
        default:

          //exit out if TBA, we don't render those
          return;
      }
    });
  });
  return {
    sched,
    sections,
    start,
    end,
  };
}
