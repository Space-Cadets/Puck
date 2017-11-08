import React, { Component } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import './Meta.css';

//The schedule component will display a student's schedule by day (m-f),
//It will also show the times that are on a student's schedule with metadata.
@observer
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

    let credits = 0;
    this.props.store.userClasses.forEach(c => {
      credits += parseInt(c.credits);
    });

		return (
      <div id="meta" className="column container">
        <span id="meta-head">
          <span className="subtitle is-3">Schedule</span>
          <span id="meta-credits" className="subtitle is-5" >Credits: {credits}</span>
        </span>
        <div id="meta-classes">
          {this.getClassEls(this.props.store.userClasses)}
        </div>
      </div>
    );
  }
}
