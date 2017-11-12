import React, { Component } from 'react';
import { autorun, action } from 'mobx';
import { observer } from 'mobx-react';
import './Meta.css';

//The schedule component will display a student's schedule by day (m-f),
//It will also show the times that are on a student's schedule with metadata.
@observer
export default class Meta extends React.Component {
  constructor(props) {
    super(props);

    this.removeClass = this.removeClass.bind(this);
  }

  getClassEls(classes) {
    return classes.map(c => {
      return (
        <div key={c.crn} style={{backgroundColor: c.color}} className="meta-class">
          <div className="meta-class-cn">{c.name}</div>
          <div>{c.department}:{c.class} - {c.section} {c.instructors.join(" ")}</div>
          <div>CRN: {c.crn}</div>
          <div data-crn={c.crn} onClick={this.removeClass} className="meta-class-rm">
            <i className="fa fa-remove meta-class-rm-icon"></i>
          </div>
        </div>
      );
    });
  }

  @action
  removeClass(e) {
    console.log(e.target.dataset.crn);
    if (!e.target.dataset.crn)
      e.target = e.target.parentNode;
    this.props.store.removeClass(e.target.dataset.crn);
  }

	render() {
    let credits = 0;
    this.props.store.userClasses.forEach(c => {
      if (c.credits)
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
