import React, { Component } from "react";
import ReactTooltip from 'react-tooltip';
import { getNormalTime } from '../../stores/store.js';
import { observer } from 'mobx-react';
import { computed, action } from 'mobx';

import './Day.css'

//The day component manages classes passed in [one class day]. Columns in Sched.
@observer
export default class Day extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showData: "",
    };

    //bind all these events so we can call them with 'this'
    this.showCourse = this.showCourse.bind(this);
    this.hideCourse = this.hideCourse.bind(this);
    this.toggleCourse = this.toggleCourse.bind(this);
    this.removeClass = this.removeClass.bind(this);

  }

  @computed get courseData() {
    console.log(this.props.courseData.start, this.props.courseData.end);
    return this.props.courseData;
  }

  //get height of entire schedule -- used to calculate position %
  @computed get height() {
    return this.props.courseData.end - this.props.courseData.start;
  }

  //gets dom el's for schedule any given day -- render sections
  getClasses(classes = []) {
    return classes.map((c,i) => {
      let styles = this.getPercentage(c, this.courseData.start, this.height);
      styles.backgroundColor = c.color;
      return (
        <div onClick={this.showCourse}
             onMouseEnter={this.showCourse}
             data-for={`courseData-${c.crn}${this.props.day}`}
             data-tip="course"
             data-crn={c.crn}
             className="day-class"
             key={i}
             style={styles}>
          <div className="class-section">
            {c.department}:{c.class}-{c.section}
          </div>
          <div className="class-instructor">{c.instructors.join(" ")}</div>
          { this.state.showData === c.crn ? this.getSection(c.crn, c.start, c.end) : "" }
        </div>
      );
    });
  }

  //render a fake class
  getFake(c) {
    let styles = this.getPercentage(c, this.courseData.start, this.height);
    return (
      <div className="day-class fake" style={styles}>
      </div>
    )
  }

  // NOTE: these use computed properties
  showCourse(e) {

    //traverse the dom upwards until we see the crn
    while (!e.target.dataset.crn && e.target != document.body) {
      e.target = e.target.parentNode;
    }

    this.setState({
      showData: e.target.dataset.crn
    });
  }

  hideCourse() {
    this.setState({
      showData: ''
    });
  }

  toggleCourse(e) {
    this.setState({
      showData: e.target.dataset.crn
    });
  }

  //gets a class's percentage from the top and height percentage
  getPercentage(c, start, height) {
    return {
      height: `${((c.end - c.start) * 100 / height)}%`,
      top: `${((c.start - start) * 100 / height)}%`,
    }
  }

  getSection(crn, start, end) {
    let courseInfo = this.props.courseData.sections[crn];
    return (
      <ReactTooltip className="extraClass"
                    id={`courseData-${crn}${this.props.day}`}
                    delayHide={200}
                    place="right"
                    type="info"
                    effect="solid">
        <div className="section">
          <div className="section-name">
            <a href={`/courses/${courseInfo.department}${courseInfo.class}`}>
              {courseInfo.department}: {courseInfo.class} - {courseInfo.name}
            </a>
          </div>
          <div className="section-title">
            Section: {courseInfo.section}
          </div>
          <div className="section-day">
            Days: {courseInfo.schedule.map(s => `${s.days}
              from ${getNormalTime(s.startTime)} to ${getNormalTime(s.endTime)}`).join(" ")}
          </div>
          <div className="section-instructor">Instructor:
            {courseInfo.instructors.map(t => t ? t : "TBA").join(" ")}</div>
          <div className="section-crn">CRN: {courseInfo.crn}</div>
          <div className="section-enrollment">
            Enrollment: {courseInfo.enrolled} of {courseInfo.size} enrolled.
          </div>
          <div>
            Credits: {courseInfo.credits.substring(0, 3)}
          </div>
          <div className="section-comment">{courseInfo.comment}</div>
          <div className="section-prereqs">
            {courseInfo.prereqs.length ? `Prerequisites: ${courseInfo.prereqs.join(" ")}` : ""}
          </div>
          <div className="section-description">
            {courseInfo.description}
          </div>
          <a data-crn={crn} onClick={this.removeClass} className="button is-white">drop</a>
        </div>
      </ReactTooltip>
    );
  }

  @action
  removeClass(e) {
    let crn = e.target.dataset.crn;
    this.props.store.removeClass(crn);
  }

	render() {
    return (
      <div className="day">
        {this.getClasses(this.props.classes)}
      </div>
    );
	}
}
