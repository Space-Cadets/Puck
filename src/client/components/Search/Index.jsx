import React, { Component } from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { getNormalTime } from '../../stores/store.js';
import departments from './mapping.js';
import './Index.css';

@observer
export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      department: '',
      course: '',
      section: this.props.match.params.crn || '',
    };

    this.setDepartment = this.setDepartment.bind(this);
    this.setCourse = this.setCourse.bind(this);
    this.setSection = this.setSection.bind(this);
    this.addClass = this.addClass.bind(this);

  }

  setDepartment(e) {
    if (!e.target.dataset.dept)
      e.target = e.target.parentNode;
    this.setState({
      department: e.target.dataset.dept,
      course: '',
    });
  }

  setCourse(e) {
    if (!e.target.dataset.course)
      e.target = e.target.parentNode;
    this.setState({
      course: e.target.dataset.course,
    }, () => {

      //if there's only one option, select it
      if (this.props.store.index[this.state.department][this.state.course].length == 1)
        this.setState({
          section: this.props.store.index[this.state.department][this.state.course][0],
        });
    });

  }

  setSection(e) {
    if (!e.target.dataset.crn)
      e.target = e.target.parentNode;
    this.setState({
      section: e.target.dataset.crn,
    });
  }

  getDepartments() {
    return Object.keys(this.props.store.index).sort().map((d, i) => {
      const cl = d == this.state.department ? "targetted" : "";
      const department = departments[d];
      return (
        <div key={i} data-dept={d} onClick={this.setDepartment} className={`index-data ${cl}`}>
          <span className="bold">{d}</span>{department ? `- ${department.name}`: ''}
        </div>
      );
    });
  }

  //NOTE: really ugly way to index into courses, to be revisited
  getCourses() {
    if (this.state.department && this.props.store.index[this.state.department]) {
      return Object.keys(this.props.store.index[this.state.department]).map((c, i) => {
        const cl = c == this.state.course ? "targetted" : "";
        return (
          <div key={i} data-course={c} onClick={this.setCourse} className={`index-data ${cl}`}>
            <span className="bold">
              {this.state.department}:
            </span>
            {c} &nbsp;
            <span>
              {this.props.store.classes[this.props.store.index[this.state.department][c][0]].name}
            </span>
          </div>
        );
      });
    }
  }

  getSections(){
    if (this.state.course) {
      return this.props.store.index[this.state.department][this.state.course].map((s,i) => {
        const cl = s == this.state.section ? "targetted" : "";
        const section = this.props.store.classes[s];
        return (
          <div key={i} data-crn={s} onClick={this.setSection} className={`index-data ${cl}`}>
            <span className="bold">{this.state.department}:{this.state.course}-</span>
            <span>{section.section}</span>
            <span>&nbsp;{section.instructors.join(", ")}</span>
          </div>
        );
      });
    }
  }

  getSection() {
    const Days = (courseInfo) => {
      if (courseInfo.schedule[0].days == "TBA")
        return;
      else
        return (
          <div className="section-day">
            <strong>Days:</strong> {courseInfo.schedule.map(s => `${s.days}
              from ${getNormalTime(s.startTime)} to ${getNormalTime(s.endTime)}`).join(" ")}
          </div>
        );
    }
    if (this.state.section) {
      const courseInfo = this.props.store.classes[this.state.section];
      const collision = this.props.store.hasCollision(courseInfo);
      return (
        <div className="index-section">
          <div className="title is-5">
            <a>
              {courseInfo.department}: {courseInfo.class} - {courseInfo.name}
            </a>
          </div>
          <div className="collision">
            {collision ? `Conflicts with ${this.props.store.classes[collision].name}` : ""}
          </div>
          <div className="section-title">
            <strong>Section:</strong> {courseInfo.section}
          </div>
          { Days(courseInfo) }
          <div className="section-instructor"><strong>Instructor:</strong>&nbsp;
            {courseInfo.instructors.map(t => t ? t : "TBA").join(" ")}</div>
          <div className="section-crn"><strong>CRN:</strong> {courseInfo.crn}</div>
          <div className="section-enrollment">
            <strong>Enrollment:</strong> {courseInfo.enrolled} of {courseInfo.size} enrolled.
          </div>
          <div>
            <strong>Credits:</strong> {courseInfo.credits.substring(0, 3)}
          </div>
          <div className="section-comment">{courseInfo.comment}</div>
          <div className="section-prereqs">
            {courseInfo.prereqs.length ? (<span className="bold">{`Prerequisites: ${courseInfo.prereqs.join(" ")}`}</span>) : ""}
          </div>
          <div className="section-description">
            <strong>Description:</strong> {courseInfo.description}
          </div>
          <br/>
          <a data-crn={courseInfo.crn} onClick={this.addClass} className="button is-info">add</a>
        </div>
      );
    }
  }

  @action
  addClass(e) {
    this.props.store.addClass(this.props.store.classes[e.target.dataset.crn]);
    this.props.history.push("/");
  }

  render() {
    return (
      <div id="index-container">
    
        <div id="index" className="columns">
          <div className="column index-column">
            <div className="notification is-info column-head">Departments</div>
            {this.getDepartments()}
          </div>
          <div className="column index-column">
            <div className="notification is-primary column-head">Courses</div>
            {this.getCourses()}
          </div>
          <div className="column index-column">
            <div className="notification is-info column-head">Sections</div>
            {this.getSections()}
          </div>
          <div className="column index-column index-column-section">
            <div className="notification is-info column-head">Section</div>
            {this.getSection()}
          </div>
        </div>
      </div>
    )
  }
}
