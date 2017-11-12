import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import './Schedule.css';
import Day from './Day.jsx';
import { parseClassData,
         timeToNum,
         format,
         getNormalTime,
         getIntervals,
       } from '../../stores/store.js';


//The timetable component will actulaly show the schedule
//NOTE: we get the lines across in a really hacky way
@observer
export default class Timetable extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.store.courseRenderData;
  }

  //NOTE: should fix this clunky function, it fits oddly with UI
  //draw the times for the times that haven't been written yet
  generateTimes(state, classes) {
    const height = state.end - state.start;
    const start = state.start;
    let getTop = (el, start, height) => ({ top: `${((timeToNum(el) - start) * 100 / height)}%` });
    let timeEls = [];
    let times = new Set();
    const get15B4 = (time) => {
      let s = time.split(':');
      let right = parseInt(s[1]);
      if (right < 15) {
        return `${parseInt(s[0]) - 1}:${60 + right - 15}`
      } else {
        let mins = right - 15;
        return `${s[0]}:${mins >= 10 ? mins : `0${mins}`}`;
      }
    }

    const get15After = (time) => {
      let s = time.split(':');
      let right = parseInt(s[1]);
      if (right >= 45) {
        let mins = right + 15 - 60;
        return `${parseInt(s[0]) + 1}:${mins >= 10 ? mins : `0${mins}`}`
      } else {
        let mins = right + 15;
        return `${s[0]}:${mins}`;
      }
    }

    //add intervals to set of times because we're just insane
    const getWithin = (time, times, interval = 5) => {
      return getIntervals(get15B4(time), get15After(time), interval);
    }

    classes.forEach(c => {

      if (c.schedule[0].days === "TBA") {
        return;
      }

      //since we prioritize starts of classes, we put them first
      c.schedule.forEach(s => {
        if (!times.has(s.startTime)) {
          timeEls.push(
            <div key={s.startTime}
                 className="schedule-time"
                 style={getTop(s.startTime, start, height)}>
              {getNormalTime(s.startTime)}
            </div>
          );
          times.add(s.startTime);
          getWithin(s.startTime, times).forEach(t => times.add(t));
        }
      });
    });

    classes.forEach(c => {

      if (c.schedule[0].days === "TBA") {
        return;
      }

      c.schedule.forEach(s => {
        if (!times.has(s.endTime)) {
          timeEls.push(
            <div key={s.endTime}
                 className="schedule-time"
                 style={getTop(s.endTime, start, height)}>
              {getNormalTime(s.endTime)}
            </div>
          );
          times.add(s.endTime);

          //this way we don't have collisions for night classes
          getWithin(s.endTime, times).forEach(t => times.add(t));
        }
      });
    });

    return timeEls;
  }

	render() {
    const state = this.props.store.courseRenderData;
    const times = this.generateTimes(state, Object.values(state.sections));

		return (
      <div id="schedule-container" className="container column columns is-mobile">
        <div id="schedule-lines" className="is-hidden-mobile">
            {times}
        </div>
        <div id="schedule" className="columns is-mobile">
          <div id="schedule-time" className="column is-hidden-mobile">
            {times}
          </div>
          <div className="column">
            <p className="day-label notification is-info">Monday</p>
            <div className="day-container">
              <Day store={this.props.store}
                   day="M"
                   courseData={state}
                   classes={state.sched.m}/>
            </div>
          </div>
          <div className="column">
            <p className="day-label notification is-primary">Tuesday</p>
            <div className="day-container">
              <Day store={this.props.store}
                   day="T"
                   courseData={state}
                   classes={state.sched.t}/>
            </div>
          </div>
          <div className="column">
            <p className="day-label notification is-info">Wednesday</p>
            <div className="day-container">
              <Day store={this.props.store}
                   day="W"
                   courseData={state}
                   classes={state.sched.w}/>
            </div>
          </div>
          <div className="column">
            <p className="day-label notification is-primary">Thursday</p>
            <div className="day-container">
              <Day store={this.props.store}
                   day="R"
                   courseData={state}
                   classes={state.sched.r}/>
            </div>
          </div>
          <div className="column">
            <p className="day-label notification is-info">Friday</p>
            <div className="day-container">
              <Day store={this.props.store}
                   day="F" courseData={state}
                   classes={state.sched.f}/>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
