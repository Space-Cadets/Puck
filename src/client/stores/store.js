import { extendObservable, computed } from 'mobx';
import resolve from '../ajax/resolve.js';

class State {
  constructor(courseData, courses) {
    this.colors = ['#7FDBFF', '#e6e74c',  '#01FF70', '#FF7373', '#00d1b2', '#b19cd9'];
    this.colorIndex = 0;

    //assign colors to starting index
    courses.forEach((c, i) => {
      c.color = this.colors[i];
      this.colorIndex = i;
      return c;
    });

    //this data will be rendered.
    extendObservable(this, {
      classes: courseData,
      userClasses: courses,
      fake: null,
    });
  }

  @computed get courseRenderData() {
    return parseClassData(this.userClasses);
  }

  addClass(course) {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    course.color = this.colors[this.colorIndex];
    this.userClasses.push(course);
    if (localStorage) {
      localStorage.crns = this.userClasses.map(c => c.crn);
    }
  }

  removeClass(crn) {
    this.colorIndex--;
    if (this.colorIndex < 0) {
      this.colorIndex = this.colors.length - 1;
    }
    this.userClasses = this.userClasses.filter(c => c.crn != crn);
    if (localStorage)
      localStorage.crns = this.userClasses.map(c => c.crn);
  }
}

//break up classes into days, renderable
export function parseClassData(classes) {
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

//Take time like 15:30 and get 15.5
export function timeToNum(t) {
  let s = t.split(":");
  let num = parseInt(s[0]) + (parseInt(s[1]) / 60)
  return num;
}

//Take 15.5 and get out "15:30"
export function numToTime(num) {
  let hour = Math.floor(num);
  let mins = num - Math.floor(num);
  mins = Math.round(mins * 60);
  if (mins == 60) {
    hour++;
    mins = 0;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return `${hour}:${mins}`;
}

//military to ampm
export function getNormalTime(d) {
  let s = d.split(':');
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
export function format(section, index) {
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
    color: section.color,
  }
}

//because we're crazy, let's get the intervals between leftTime and rightTime - intervals in mins
export function getIntervals(startTime, endTime, interval) {
  const times = [];
  const start = timeToNum(startTime);
  const end = timeToNum(endTime);
  const int = interval / 60;

  //start 5 after
  let curr = timeToNum(startTime) + 0.0833;
  while (curr < end) {
    times.push(numToTime(curr));
    curr += int;
  }
  times.unshift(startTime);
  times.push(endTime);

  //startTime
  return times;
}


export default State;
