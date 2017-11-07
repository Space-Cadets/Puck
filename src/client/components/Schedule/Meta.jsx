import React, { Component } from 'react';
import './Meta.css';

//The schedule component will display a student's schedule by day (m-f),
//It will also show the times that are on a student's schedule with metadata.
export default class Meta extends React.Component {
  constructor(props) {
    super(props);
  }

  getClassEls(classes) {
    return classes.map(c => {
      return (
        <div style={{backgroundColor: c.color}} className="meta-class">
          <div className="meta-class-cn">{c.name}</div>
          <div>{c.department}:{c.class} - {c.section} {c.instructors.join(" ")}</div>
          <div>CRN: {c.crn}</div>
        </div>
      )
    });
  }

	render() {

    const credits = this.props.classes.reduce((sum, c) => {
        return parseInt(c.credits) + sum;
    }, 0)

		return (
      <div id="meta" className="column container">
        <span id="meta-head">
          <span className="subtitle is-3">Schedule</span>
          <span id="meta-credits" className="subtitle is-5" >Credits: {credits}</span>
        </span>
        <div id="meta-classes">
          {this.getClassEls(this.props.classes)}
        </div>
      </div>
    );
  }
}
